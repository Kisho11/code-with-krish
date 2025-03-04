import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationDispatch } from './entity/location-dispatch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationDispatch])],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}
