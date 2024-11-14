// book.controller.ts
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    Query,
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { BookDto, CreateBookDto, UpdateBookDto } from './book.dto';
  import { BookPresenter } from './book.presenter';
  import { AuthorService } from '../authors/author.service';
  import { BookModel } from './book.model';
  import { AuthorRepository } from '../authors/author.repository';
  import { BookRepository } from './book.repository';
  
  @Controller('/books')
  export class BookController {
    constructor(
      private readonly bookService: BookService,
      private readonly authorService: AuthorService,
      private readonly authorRepository: AuthorRepository,
      private readonly bookRepository: BookRepository,
    ) {}
  
    @Get()
    public async listBooks(): Promise<BookPresenter[]> {
      const books = await this.bookService.listBooks();
      return books.map(BookPresenter.from);
    }
  
    @Get(':id')
    public async getBook(@Param('id') id: string): Promise<BookPresenter> {
      const book = await this.bookService.getBook(id);
      return BookPresenter.from(book);
    }
  
    @Get('/authors') // Nouvelle route pour obtenir les auteurs
    public async listAuthors() {
      return this.authorService.listAuthors(); // Supposons que `authorService.listAuthors()` renvoie tous les auteurs
    }
  
    @Post()
    public async createBook(
      @Body() input: CreateBookDto,
    ): Promise<BookPresenter> {
      const book = await this.bookService.createBook({
        ...input,
        publicationDate: new Date(input.publicationDate),
      });
      return BookPresenter.from(book);
    }
  
    @Put(':id')
    public async updateBook(
      @Param('id') id: string,
      @Body() input: UpdateBookDto,
    ): Promise<BookPresenter> {
      const book = await this.bookService.updateBook(id, {
        ...input,
        publicationDate: input.publicationDate
          ? new Date(input.publicationDate)
          : undefined,
      });
      return BookPresenter.from(book);
    }
  
    @Delete(':id')
    public async deleteBook(@Param('id') id: string): Promise<void> {
      await this.bookService.deleteBook(id);
    }
  
    @Get()
    async getBooksByAuthor(
      @Query('authorId') authorId: string,
    ): Promise<BookDto[]> {
      const books = await this.bookService.getBooksByAuthor(authorId); // Utilisation de BookService
      return books.map((book) => ({
        ...book,
        averageRating: book.averageRating || 0, // Si pas de note, on retourne 0
      }));
    }
  }
