import { DataSource } from "typeorm"
import { User } from "./user/user.entity.js"
import 'dotenv/config'

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User],
    synchronize: true,

})

export const initializeDataSource = async () => {
    await PostgresDataSource.initialize();
    console.log(`DataBase initialize and connected`)
}
initializeDataSource().catch((error) => console.log(`DataBase connection error: ${error}`))
