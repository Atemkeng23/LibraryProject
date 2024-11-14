import { FC, useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { CreateReviewModel } from '../models/ReviewModel';

type Props = {
    onCreate: (review: CreateReviewModel) => void;
    bookId: string;
};

export const CreateReviewForm: FC<Props> = ({ onCreate, bookId }) => {
    const [rating, setRating] = useState<number>(1);
    const [comment, setComment] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // For displaying error messages

    const onCancel = () => {
        setIsModalOpen(false);
        setRating(1);
        setComment('');
        setError(null); // Reset error when modal is closed
    };

    const onSubmit = () => {
        if (rating < 1 || rating > 5) {
            setError('Rating must be between 1 and 5.');
            return;
        }
        if (comment.trim() === '') {
            setError('Comment cannot be empty.');
            return;
        }

        const newReview: CreateReviewModel = { rating, comment, bookId };
        onCreate(newReview);
        onCancel();
    };

    return (
        <div className="flex justify-center">
            <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
                Add Review
            </Button>
            <Modal
                isOpen={isModalOpen}
                title="Add a New Review"
                onCancel={onCancel}
                onClose={onCancel}
                className="max-w-lg mx-auto bg-white rounded-lg shadow-2xl p-6 space-y-6"
            >
                <div className="space-y-6">
                    {/* Rating Section */}
                    <div>
                        <label className="block text-2xl font-semibold text-gray-800 mb-2">Rating</label>
                        <div className="flex items-center space-x-2 text-5xl cursor-pointer">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`transition duration-300 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400`}
                                    onClick={() => setRating(star)}
                                >
                  ★
                </span>
                            ))}
                        </div>
                        <div className="text-lg text-gray-500 mt-2">
                            {rating} {rating === 1 ? 'star' : 'stars'}
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div>
                        <label className="block text-2xl font-semibold text-gray-800 mb-2">Your Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={5}
                            className="w-full border border-gray-300 rounded-md p-4 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
                            placeholder="Write your review here..."
                        />
                    </div>

                    {/* Error Message */}
                    {error && <div className="text-red-600 text-lg font-semibold">{error}</div>}
                </div>

                {/* Action buttons */}
                <div className="flex justify-between mt-4 space-x-4">
                    <Button
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded-md shadow-md transition duration-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition duration-200"
                    >
                        Submit Review
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
