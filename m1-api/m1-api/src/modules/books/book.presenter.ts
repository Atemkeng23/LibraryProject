import { BookModel } from './book.model';

export class BookPresenter {
  id: string;
  title: string;
  publicationDate: Date;
  authorId: string;
  price: number;

  // Constructeur privé pour empêcher l'instanciation directe
  private constructor(book: BookPresenter) {
    Object.assign(this, book);
  }
  // Méthode de création d'un livre
  public static from(book: BookModel) {
    return new BookPresenter({
      id: book.id,
      title: book.title,
      publicationDate: book.publicationDate,
      authorId: book.authorId,
      price: book.price,
    });
  }
}
