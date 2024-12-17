import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    CountriesModule, // Import the Countries Module
  ],
})
export class AppModule {}