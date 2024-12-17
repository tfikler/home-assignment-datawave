import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as mysql from 'mysql2/promise';

export const sequelizeConfig: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'tomerfikler123',
    database: process.env.DB_NAME || 'countries_db',
    autoLoadModels: true,
    synchronize: true, // Automatically sync models to database
};

// Function to initialize the database
export async function ensureDatabaseExists() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'tomerfikler123',
    });
    console.log('Connected to MySQL server.');

    const dbName = process.env.DB_NAME || 'countries_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database "${dbName}" ensured to exist.`);
    await connection.end();
}


