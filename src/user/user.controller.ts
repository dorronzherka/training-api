import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Param,
  Put,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() user: User): Promise<
    | {
        message: string;
        status: number;
      }
    | BadRequestException
  > {
    try {
      await this.userService.create(user);
      return {
        message: 'New user has been added',
        status: 200,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['admin', 'coach', 'client'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(
    @Body() user: User,
    @Param('id') id: string,
  ): Promise<
    | {
        message: string;
        status: number;
      }
    | BadRequestException
  > {
    try {
      await this.userService.update(id, user);
      return {
        message: `User with id ${id} has been updated`,
        status: 200,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['admin', 'coach', 'client'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<
    | {
        message: string;
        status: number;
      }
    | BadRequestException
  > {
    try {
      await this.userService.remove(id);
      return {
        message: `User with id ${id} has been deleted`,
        status: 200,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.userService.findById(id);
      return {
        user: user,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async findAll() {
    try {
      const user = await this.userService.findAll();
      return {
        users: user,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }
}
