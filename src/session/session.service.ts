import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  // Get all sessions
  findAll(): Promise<Session[]> {
    try {
      return this.sessionRepository.find({
        relations: ['coach', 'session', 'availability', 'client'],
      });
    } catch (error) {
      throw error;
    }
  }

  // Find sessions by id
  findById(id: string): Promise<Session> {
    try {
      return this.sessionRepository.findOne(id, {
        relations: ['coach', 'session', 'availability', 'client'],
      });
    } catch (error) {
      throw error;
    }
  }

  // Find sessions of specific
  findForSpecificCoach(coach: string): Promise<Session[]> {
    try {
      return this.sessionRepository.find({
        where: {
          coach: coach,
          relations: ['coach', 'session', 'availability', 'client'],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Create a new session
  async create(session: Session): Promise<void> {
    try {
      await this.sessionRepository.save(session);
    } catch (error) {
      throw error;
    }
  }

  // Update a session
  async update(id: string, session: Session): Promise<void> {
    try {
      await this.sessionRepository.update(id, session);
    } catch (error) {
      throw error;
    }
  }

  // Delete a remove
  async delete(id: string): Promise<void> {
    try {
      await this.sessionRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Update a session of status
  async updateStatus(id: string, approved: boolean): Promise<void> {
    try {
      await this.sessionRepository.update(id, {
        approved: approved,
      });
    } catch (error) {
      throw error;
    }
  }
}
