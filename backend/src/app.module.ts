import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CountriesService} from "./Countries/countries.service";
import {CountriesController} from "./Countries/countries.controller";

@Module({
  imports: [],
  controllers: [AppController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
