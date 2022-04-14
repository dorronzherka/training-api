import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
  Put,
  Param,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from './session.entity';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('sessions')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Roles(['coach', 'client', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<Session[] | BadRequestException> {
    try {
      return await this.findAll();
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['coach', 'client', 'admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findSpecific(id: string): Promise<
    | {
        session: Session;
        status: number;
      }
    | BadRequestException
  > {
    try {
      const session: Session = await this.sessionService.findById(id);
      return {
        session: session,
        status: 200,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['client'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Request() req: any, @Body() session: Session) {
    try {
      await this.sessionService.create({
        clientId: req.user.id,
        availabilityId: session.availabilityId,
        coachId: session.coachId,
      });

      return {
        message: 'Session was created',
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }

  @Roles(['coach'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('change-status/:id')
  async changeStatus(@Body() body: any, @Param('id') id: string) {
    try {
      await this.sessionService.updateStatus(id, body.approved);
      return {
        message: `Session was ${body.approved ? 'approved' : 'disapproved'}`,
      };
    } catch (error) {
      return new BadRequestException(null, error.message);
    }
  }
}
