// review.presenter.ts
import { ReviewModel } from './review.model';

export class ReviewPresenter {
    id: string;
    rating: number;
    comment?: string;
    bookId: string;

    private constructor(review: ReviewPresenter) {
        Object.assign(this, review);
    }

    public static from(review: ReviewModel) {
        return new ReviewPresenter({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            bookId: review.bookId,
        });
    }
}
