import {  pgSchema } from "drizzle-orm/pg-core";
import { postgresConfig } from "../config";

export const dbSchema = pgSchema(postgresConfig.DATABASE_TABLE_SCHEMA ?? 'ca')

export const connection = {
    user: postgresConfig.DATABASE_USER,
    password: postgresConfig.DATABASE_PASSWORD,
    database: postgresConfig.DATABASE_NAME,
    port: parseInt(postgresConfig.DATABASE_PORT ?? '2345'),
    host: postgresConfig.DATABASE_HOST,
    ssl: {
        ca: postgresConfig.DATABASE_CA
    }
}