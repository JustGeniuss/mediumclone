import { DataSource, DataSourceOptions } from "typeorm"
import {config} from 'dotenv';
config()
export const SeedOptions: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/seed/*.js"]
};


const seedSource = new DataSource(SeedOptions);
export default seedSource;











