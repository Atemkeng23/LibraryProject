import { FC } from 'react';
import { ReviewModel } from '../models/ReviewModel';
import { Button } from './Button';

type Props = {
    reviews: ReviewModel[];
    onDelete: (id: string) => void;
    renderStars: (rating: number) => JSX.Element; // Ajout de la prop pour afficher les étoiles
};

export const ReviewList: FC<Props> = ({ reviews, onDelete, renderStars }) => {
    return (
        <div className="space-y-6"> {/* Ajout de l'espacement entre les avis */}
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews available.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold">Rating:</span>
                                <div className="flex">{renderStars(review.rating)}</div>
                            </div>
                            <Button onClick={() => onDelete(review.id)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                                Delete
                            </Button>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment || 'No comment'}</p> {/* Commentaire sous le rating */}
                    </div>
                ))
            )}
        </div>
    );
};
