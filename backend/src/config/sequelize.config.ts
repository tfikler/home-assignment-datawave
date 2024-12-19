import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as mysql from 'mysql2/promise';

export const sequelizeConfig: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'tomerfikler123',
    database: 'countries_db',
    autoLoadModels: true,
    synchronize: true,
};


export async function ensureDatabaseExists() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'tomerfikler123',
        });

        const dbName = 'countries_db';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Database "${dbName}" ensured to exist.`);
        await connection.end();
    }
    catch (error) {
        console.error('Error ensuring database exists:', error);
    }
}


