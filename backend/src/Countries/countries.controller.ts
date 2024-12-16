import { Controller, Get} from "@nestjs/common";
import { CountriesService } from "./countries.service";

@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {}

    @Get()
    getCountries() {
        return this.countriesService.getCountries();
    }
}