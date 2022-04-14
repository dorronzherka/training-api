import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UserService {
  private salt;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.salt = process.env.SALT;
  }

  // Find all users
  findAll(): Promise<User[]> {
    try {
      return this.userRepository.find({
        relations: ['clientSessions', 'coachSessions', 'coachAvailabilities'],
      });
    } catch (error) {
      throw error;
    }
  }

  // Find user by id
  findById(id: string): Promise<User> {
    try {
      return this.userRepository.findOne(id, {
        relations: ['clientSessions', 'coachSessions', 'coachAvailabilities'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string): Promise<any> {
    try {
      return await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Remove user by id
  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Create a user
  async create(user: User): Promise<void> {
    try {
      const password = bcrypt.hashSync(user.password, this.salt);
      await this.userRepository.save({
        fullname: user.fullname,
        username: user.username,
        password: password,
        type: user.type,
      });
    } catch (error) {
      throw error;
    }
  }

  // Update a user
  async update(id: string, user: User) {
    try {
      const password = bcrypt.hashSync(user.password, this.salt);
      user.password = password;
      await this.userRepository.update(id, user);
    } catch (error) {
      throw error;
    }
  }
}
