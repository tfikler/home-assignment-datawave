import { Injectable } from '@nestjs/common';
import { countries } from '../../mocked-data/countries';

@Injectable()
export class CountriesService {
    getCountries(): any {
        return countries;
    }
}
