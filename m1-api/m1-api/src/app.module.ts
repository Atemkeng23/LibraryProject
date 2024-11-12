import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/books/book.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [DatabaseModule, BookModule, AuthorModule, ReviewModule], //, BookModule
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}