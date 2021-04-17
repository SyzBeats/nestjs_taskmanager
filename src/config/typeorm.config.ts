import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const {
  type,
  host,
  username,
  password,
  database,
  synchronize,
  port,
} = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: type,
  host: process.env.RDS_HOST || host,
  port: process.env.RDS_PORT || port,
  username: process.env.RDS_USERNAME || username,
  password: process.env.RDS_PASSWORD || password,
  database: process.env.RDS_DATABASE || database,
  // automatically takes care of all entities
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: synchronize,
  ssl: {
    rejectUnauthorized: false,
  },
};
