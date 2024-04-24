import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicsModule } from './comics/comics.module';
import { CharactersModule } from './characters/characters.module';
import { CreatorsModule } from './creators/creators.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ComicsModule,
    CharactersModule,
    CreatorsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
