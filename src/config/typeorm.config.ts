import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-54-155-226-153.eu-west-1.compute.amazonaws.com',
  port: 5432,
  username: 'rqfzjugqvfkrqe',
  password: '90b6331e8eea140ecb93d7bbfa3a34f0018416ee1dda78bf967bcc747b81d6cb',
  database: 'd151d84rci3o5u',
  // automatically takes care of all entities
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
