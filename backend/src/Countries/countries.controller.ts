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
        @Query('search') search?: string,
    ) {
        const pageNumber = Number(page) || 1;
        const pageSize = Number(limit) || 5;
        return this.countriesService.findAll(pageNumber, pageSize, search);
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
