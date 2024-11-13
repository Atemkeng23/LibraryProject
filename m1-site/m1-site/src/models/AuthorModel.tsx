// models/AuthorModel.tsx
export type AuthorModel = {
    id: string
    firstName: string
    lastName: string
    photoUrl?: string
    biography?: string
    bookCount?: number
    averageRating?: number
}

export type CreateAuthorModel = {
    firstName: string
    lastName: string
}
