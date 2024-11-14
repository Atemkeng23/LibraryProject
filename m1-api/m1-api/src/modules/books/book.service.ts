// book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookModel, UpdateBookModel, BookModel } from './book.model';
import { ReviewRepository } from '../review/review.repository';
import { AuthorRepository } from '../authors/author.repository';
import { BookEntity } from '../database/entities/book.entity'; // Assurez-vous d'importer le AuthorRepository

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  public async listBooks(): Promise<BookModel[]> {
    const books = await this.bookRepository.listBooks();
    return Promise.all(
      books.map(async (book) => {
        const averageRating =
          await this.reviewRepository.getAverageRatingForBook(book.id);
        return {
          ...book,
          averageRating,
        };
      }),
    );
  }

  public async getBook(id: string): Promise<BookModel> {
    const book = await this.bookRepository.getBook(id);
    const averageRating =
      await this.reviewRepository.getAverageRatingForBook(id);
    return {
      ...book,
      averageRating,
    };
  }

  public async createBook(input: CreateBookModel): Promise<BookModel> {
    // Vérifier si l'auteur existe
    const authorExists = await this.authorRepository.getAuthor(input.authorId);
    if (!authorExists) {
      throw new NotFoundException('Author not found');
    }

    const book = await this.bookRepository.createBook(input);
    return {
      id: book.id,
      title: book.title,
      publicationDate: book.publicationDate,
      authorId: book.authorId,
      price: book.price,
      averageRating: 0,
    };
  }

  public async updateBook(
    id: string,
    input: UpdateBookModel,
  ): Promise<BookModel> {
    const book = await this.bookRepository.updateBook(id, input);
    const averageRating =
      await this.reviewRepository.getAverageRatingForBook(id);
    return {
      ...book,
      averageRating,
    };
  }

  // book.service.ts
public async deleteBook(id: string): Promise<void> {
  const book = await this.bookRepository.getBook(id);

  // Vérifiez si le livre existe
  if (!book) {
    throw new NotFoundException('Book not found');
  }

  // Vérifiez si l'auteur du livre existe avant d'essayer d'accéder à `authorId`
  if (!book.authorId) {
    throw new Error('Author ID not found for the book');
  }

  // Supprimer tous les avis associés au livre
  await this.reviewRepository.deleteReviewsByBookId(id);

  // Supprimer le livre
  await this.bookRepository.deleteBook(id);

  // Décrémenter le nombre de livres de l'auteur
  await this.authorRepository.decrementBookCount(book.authorId);
}


  // book.service.ts (ou review.service.ts)
  async updateBookAverageRating(bookId: string): Promise<void> {
    const reviews = await this.reviewRepository.getReviewsByBookId(bookId); // Utilisation de la nouvelle méthode
    const totalReviews = reviews.length;

    if (totalReviews > 0) {
      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
      await this.bookRepository.update(bookId, { averageRating });
    } else {
      // Si pas de reviews, on met à jour avec une valeur null ou 0
      await this.bookRepository.update(bookId, { averageRating: 0 });
    }
  }

  public async getBooksByAuthor(authorId: string): Promise<BookModel[]> {
    // Récupération des livres en fonction de l'auteur
    const books = await this.bookRepository.find({ where: { authorId } });

    if (!books || books.length === 0) {
      throw new NotFoundException(`No books found for author with id ${authorId}`);
    }

    return books;
  }
  async getBookWithAverageRating(bookId: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['reviews'],  // Assurez-vous que les avis sont bien chargés
    });

    // Calcul de la note moyenne
    if (book.reviews.length === 0) {
      book.averageRating = null; // Pas d'avis encore
    } else {
      const totalRating = book.reviews.reduce((sum, review) => sum + review.rating, 0);
      book.averageRating = totalRating / book.reviews.length;
    }

    return book;
  }




}
