// created first module
// >> bash: nest g module tasks

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    MikroOrmModule.forRoot({
      type: 'postgresql',
      host: 'localhost',
      port: 5432,
      user: 'simeon',
      password: 'L1+wX45;',
      dbName: 'taskmanagement',
      entitiesTs: ['**/*.entity.ts'],
      entities: ['**/*.entity.js'],
    }),
  ],
})
export class AppModule {}
