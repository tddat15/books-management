import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { BookModule } from './module/book';

@Module({
  imports: [ConfigModule, BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
