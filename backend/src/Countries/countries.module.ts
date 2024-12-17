import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { Country } from './countries.model';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
    imports: [
        SequelizeModule.forFeature([Country]), // Register the Country model
        HttpModule, // Register the HTTP module
    ],
    controllers: [CountriesController],
    providers: [CountriesService],
})
export class CountriesModule {}