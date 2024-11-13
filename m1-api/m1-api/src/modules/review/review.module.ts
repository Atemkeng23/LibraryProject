import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewEntity } from '../database/entities/review.entity';
import { AuthorModule } from '../authors/author.module';  // Import du module Author
import { BookModule } from '../books/book.module';  // Importation de BookModule

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    AuthorModule,
    forwardRef(() => BookModule),  // Utilisation de forwardRef pour éviter une dépendance circulaire
  ],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService],
  exports: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
