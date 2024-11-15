// models/BookModel.tsx
export type BookModel = {
  id: string
  title: string
  publicationDate: Date
  authorId: string
  price: number
  averageRating?: number // Ajout de la propriété averageRating
}

export type CreateBookModel = {
  title: string
  publicationDate: string
  authorId: string
  price: number
}
