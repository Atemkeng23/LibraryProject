import { AuthorModel } from './author.model';

export class AuthorPresenter {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  biography?: string;
  bookCount?: number;
  averageRating?: number;

    // Constructeur privé
  private constructor(author: AuthorPresenter) {
    Object.assign(this, author);
  }

  // Méthode de création d'un auteur
  public static from(author: AuthorModel) {
    return new AuthorPresenter({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
      biography: author.biography,
      bookCount: author.bookCount,
      averageRating: author.averageRating,
    });
  }
}
