export type ReviewModel = {
    id: string;
    rating: number;
    comment?: string;
    bookId: string;
};

export type CreateReviewModel = {
    rating: number;
    comment?: string;
    bookId: string;
};

export type UpdateReviewModel = {
    rating?: number;
    comment?: string;
};
