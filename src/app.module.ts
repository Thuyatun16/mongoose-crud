import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MeetModule } from './meet/meet.module';
import { FriendModule } from './friend/friend.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    UsersModule,
    AuthModule,
    MeetModule,
    FriendModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
