import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CoachAvailabilityModule } from './coach-availability/coach-availability.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
const configService = new ConfigService();
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(configService.getDatabaseConfig()),
    UserModule,
    CoachAvailabilityModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
