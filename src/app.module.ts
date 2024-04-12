import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComicsModule } from './comics/comics.module';
import { CharactersModule } from './characters/characters.module';
import { CreatorsModule } from './creators/creators.module';

@Module({
  imports: [ComicsModule, CharactersModule, CreatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
