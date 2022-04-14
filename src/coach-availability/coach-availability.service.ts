import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachAvailability } from './coach-availability.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CoachAvailabilityService {
  private salt;
  constructor(
    @InjectRepository(CoachAvailability)
    private coachAvailabilityRepository: Repository<CoachAvailability>,
  ) {}

  // Find all coach availabilities
  findAll(): Promise<CoachAvailability[]> {
    try {
      return this.coachAvailabilityRepository.find({
        relations: ['coach', 'session'],
      });
    } catch (error) {
      throw error;
    }
  }

  // Find coachAvailability by id
  findById(id: string): Promise<CoachAvailability> {
    try {
      return this.coachAvailabilityRepository.findOne(id, {
        relations: ['coach', 'session'],
      });
    } catch (error) {
      throw error;
    }
  }

  // Find coach Availabilities by id
  findAllById(id: string): Promise<CoachAvailability[]> {
    try {
      return this.coachAvailabilityRepository.find({
        where: {
          coachId: id,
        },
        relations: ['coach', 'session'],
      });
    } catch (error) {
      throw error;
    }
  }

  // Remove coachAvailability by id
  async remove(id: string): Promise<void> {
    try {
      await this.coachAvailabilityRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Create a coach Availability
  async create(coachAvailability: CoachAvailability): Promise<void> {
    try {
      await this.coachAvailabilityRepository.save(coachAvailability);
    } catch (error) {
      throw error;
    }
  }

  // Update a coachAvailability
  async update(id: string, coachAvailability: CoachAvailability) {
    try {
      await this.coachAvailabilityRepository.update(id, coachAvailability);
    } catch (error) {
      throw error;
    }
  }
}
