import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './location/location.module';
import { LocationDispatch } from './location/entity/location-dispatch.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'cosmos',
      entities: [LocationDispatch],
      synchronize: true, 
    }),
    LocationModule,
  ],
})
export class AppModule {}
