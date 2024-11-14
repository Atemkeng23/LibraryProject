import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookEntity } from '../database/entities/book.entity';
import { ReviewModule } from '../review/review.module';
import { AuthorModule } from '../authors/author.module';  // Importation du module Author

@Module({
    imports: [
        TypeOrmModule.forFeature([BookEntity]),
        forwardRef(() => ReviewModule),  // Pour résoudre les dépendances circulaires avec ReviewModule
        AuthorModule,  // Ajout du AuthorModule pour avoir accès au AuthorRepository
    ],
    controllers: [BookController],
    providers: [BookRepository, BookService],
    exports: [BookService],
})
export class BookModule {}
