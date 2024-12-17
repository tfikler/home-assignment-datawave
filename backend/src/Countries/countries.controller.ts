import {Controller, Get, Post, Put, Delete, Param, Body, Query} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './countries.model';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
    ) {
        const pageNumber = Number(page) || 1; // Default to page 1 if invalid
        const pageSize = Number(limit) || 5; // Default to 7 items per page
        return this.countriesService.findAll(pageNumber, pageSize);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.countriesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() country: Country) {
        console.log('Update country', id, country);
        return this.countriesService.update(id, country);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.countriesService.delete(id);
    }
}
