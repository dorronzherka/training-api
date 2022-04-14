import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts}', 'dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*', 'dist/src/migration/*'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: false,
  migrationsRun: true,
};
export = config;
