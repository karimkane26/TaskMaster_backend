/* eslint-disable prettier/prettier */

import { DataSource,DataSourceOptions } from "typeorm";
 import {config} from 'dotenv';
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
 
 export default dataSource;


