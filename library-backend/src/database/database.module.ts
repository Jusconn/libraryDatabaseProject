import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'library',
      synchronize: true,
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
  controllers: [DatabaseController], // Export for use in other modules
})
export class DatabaseModule {}
