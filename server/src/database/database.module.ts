import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.MYSQL_DB_HOST,
        port: +process.env.MYSQL_DB_PORT,
        database: process.env.MYSQL_DB_NAME,
        username: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        synchronize: true,
        autoLoadEntities:true,
    }),
  ],
})
export class DatabaseModule {}
