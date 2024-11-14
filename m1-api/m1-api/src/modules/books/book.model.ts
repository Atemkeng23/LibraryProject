// book.model.ts
export type BookModel = {
    id: string;
    title: string;
    publicationDate: Date;
    authorId: string;
    price: number;
    averageRating?: number; // Ajout de la propriété averageRating
  };
  
  export type CreateBookModel = {
    title: string;
    publicationDate: Date;
    authorId: string;
    price: number;
  };
  
  export type UpdateBookModel = {
    title?: string;
    publicationDate?: Date;
    authorId?: string;
    price?: number;
  };
  