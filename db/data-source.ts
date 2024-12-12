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
      synchronize:false
} 

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;



// import { DataSource } from 'typeorm';

// const dataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   ssl: {
//     rejectUnauthorized: false, // Utilisez `false` pour éviter les problèmes de certificat en local
//   },
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true, // À désactiver en production !
// });

// export default dataSource;
