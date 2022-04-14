import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { CoachAvailabilityService } from './coach-availability.service';
import { CoachAvailability } from './coach-availability.entity';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
@Controller('coach-availabilities')
export class CoachAvailabilityController {
  constructor(private coachAvailabilityService: CoachAvailabilityService) {}

  @Roles(['coach'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('my-avalibilities')
  async findAllAvalibilitiesforCoach(@Request() req: any) {
    const availabilities = await this.coachAvailabilityService.findAllById(
      req.user.id,
    );

    if (availabilities) {
      return {
        availabilities: availabilities,
      };
    } else {
      return new NotFoundException();
    }
  }

  @Roles(['coach', 'client'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async findAll() {
    const availabilities = await this.coachAvailabilityService.findAll();
    if (availabilities) {
      return {
        availabilities: availabilities,
      };
    } else {
      return new NotFoundException();
    }
  }

  @Roles(['coach'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCoachAvailability(
    @Body() coachAvailability: CoachAvailability,
    @Request() req: any,
  ): Promise<
    | {
        message: string;
        status: number;
      }
    | BadRequestException
  > {
    try {
      await this.coachAvailabilityService.create({
        ...coachAvailability,
        coachId: req.user.id,
      });
      return {
        message: 'New Coach availability has been added',
        status: 200,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['coach'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateCoachAvailability(
    @Body() coachAvailability: CoachAvailability,
    @Param('id') id: string,
  ): Promise<
    | {
        message: string;
        status: number;
      }
    | BadRequestException
  > {
    try {
      await this.coachAvailabilityService.update(id, { ...coachAvailability });
      return {
        message: `Coach availability with id ${id} has been updated`,
        status: 200,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['coach'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteCoachAvailability(@Param('id') id: string): Promise<
    | {
        message: string;
        status: number;
      }
    | BadRequestException
  > {
    try {
      await this.coachAvailabilityService.remove(id);
      return {
        message: `Coach availability with id ${id} has been deleted`,
        status: 200,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }
}
