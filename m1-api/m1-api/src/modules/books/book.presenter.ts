import { BookModel } from './book.model';

export class BookPresenter {
  id: string;
  title: string;
  publicationDate: Date;
  authorId: string;
  price: number;

  private constructor(book: BookPresenter) {
    Object.assign(this, book);
  }

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
