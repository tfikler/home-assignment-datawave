import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { Country } from './countries.model';
import { firstValueFrom } from 'rxjs';
import {Op} from "sequelize";

@Injectable()
export class CountriesService implements OnModuleInit {
    private readonly logger = new Logger(CountriesService.name);

    constructor(
        @InjectModel(Country)
        private countryModel: typeof Country,
        private readonly httpService: HttpService,
    ) {}

    async onModuleInit() {
        await this.initializeDatabase();
    }

    // This method fetches country data from the REST Countries API and initializes the database with it.
    async initializeDatabase() {
        const apiUrl = 'http://restcountries.com:8080/v3.1/all';
        try {
            this.logger.log('Fetching country data from REST Countries API...');
            const response = await firstValueFrom(
                this.httpService.get(apiUrl, { timeout: 30000 }),
            );

            const existingCountries = await this.countryModel.findAll();
            const existingCountryNames = new Set(existingCountries.map(country => country.name));

            const newCountries = response.data
                .filter((country: any) => !existingCountryNames.has(country.name.common))
                .map((country: any) => ({
                    name: country.name.common,
                    code: country.cca2,
                    flag: country.flags?.png || null,
                    lat: country.latlng?.[0] || null,
                    lng: country.latlng?.[1] || null,
                    description: null,
                }));

            if (newCountries.length > 0) {
                await this.countryModel.bulkCreate(newCountries);
                this.logger.log(`Added ${newCountries.length} new countries to database.`);
            } else {
                this.logger.log('No new countries to add. Database is up to date.');
            }

        } catch (error) {
            this.logger.error('Error initializing the database:', error.message);
            throw error;
        }
    }


    // Finding all countries with pagination, search, and filter options
    async findAll(page: number = 1, limit: number = 5, search? : string, filterBy? : string) {
        if (page === -1){
            return await this.countryModel.findAll();
        }
        const offset = (page - 1) * limit;

        const whereClause = search ? {
            [filterBy]: {
                [Op.like]: `%${search}%`,
            },
        } : {};
        const { rows: data, count: total } = await this.countryModel.findAndCountAll({
            where: whereClause,
            offset,
            limit,
            order: [['name', 'ASC']],
        });

        return {
            data,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
                limit,
            },
        };
    }

    // Finding a single country by ID
    async findOne(id: number): Promise<Country> {
        return this.countryModel.findByPk(id);
    }

    // Updating a country by ID
    async update(id: number, countryData: Partial<Country>): Promise<Country> {
        const country = await this.findOne(id);
        if (!country) {
            throw new Error('Country not found');
        }
        return country.update(countryData);
    }

    // Deleting a country by ID
    async delete(id: number): Promise<void> {
        const country = await this.findOne(id);
        if (country) {
            await country.destroy();
        }
    }
}