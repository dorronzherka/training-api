import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachAvailability } from './coach-availability.entity';
import { CoachAvailabilityController } from './coach-availability.controller';
import { CoachAvailabilityService } from './coach-availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoachAvailability])],
  controllers: [CoachAvailabilityController],
  providers: [CoachAvailabilityService],
  exports: [CoachAvailabilityModule],
})
export class CoachAvailabilityModule {}
