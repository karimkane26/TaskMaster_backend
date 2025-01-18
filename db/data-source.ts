/* eslint-disable prettier/prettier */

import { DataSource,DataSourceOptions } from "typeorm";
const logger = new Logger('DatabaseConnection');
 import {config} from 'dotenv';
import { Logger } from "@nestjs/common";
 config()
 export const dataSourceOptions:DataSourceOptions = {
    type: 'postgres',
       host:process.env.DB_HOST,
       port:Number(process.env.DB_PORT),
       username:process.env.DB_USERNAME,
       password:process.env.DB_PASSWORD,
       database:process.env.DB_DATABASE,
        ssl: {
     rejectUnauthorized: false, // Utilisez `false` pour éviter les problèmes de certificat en local
   },
       entities: ['dist/**/*.entity{.ts,.js}'],
       migrations:['dist/db/migrations/*{.ts,.js}'],
       logging:false,
      //  synchronize:true
      synchronize: true // Synchronisation en développement uniquement

} 
 const dataSource = new DataSource(dataSourceOptions);
 dataSource.initialize().catch((error) => {
   logger.error('Error during Data Source initialization', error);
 });
 export default dataSource;


