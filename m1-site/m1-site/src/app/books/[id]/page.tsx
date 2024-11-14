'use client';
import { FC, useEffect, useState } from 'react';
import { GlobalLayout } from '../../GlobalLayout';
import { useGetBookProvider } from '../../../providers/useBookProviders';
import { useParams } from 'next/navigation';
import { ReviewList } from '../../../components/ReviewList';
import { CreateReviewForm } from '../../../components/CreateReviewForm';
import Link from 'next/link';
import axios from 'axios';

const BookDetailsPage: FC = () => {
    const { id } = useParams();
    const { book, reviews, loading, loadBook, loadReviews, onCreateReview, onDeleteReview } = useGetBookProvider(id as string);
    const [authorName, setAuthorName] = useState<string>('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (id) {
            loadBook();
            loadReviews(order);
        }
    }, [id, order]);

    useEffect(() => {
        if (book) {
            axios
                .get(`http://localhost:3001/authors/${book.authorId}`)
                .then((response) => {
                    const { firstName, lastName } = response.data;
                    setAuthorName(`${firstName} ${lastName}`);
                })
                .catch((error) => {
                    console.error('Erreur lors du chargement de l\'auteur:', error);
                });
        }
    }, [book]);

    if (loading) {
        return <div>Loading book details...</div>;
    }

    if (!book) {
        return <div>Failed to load book details. Please try again later.</div>;
    }

    // Fonction pour afficher les étoiles
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return (
            <>
                {Array(fullStars).fill('★').map((_, index) => (
                    <span key={`full-${index}`} className="text-yellow-500 text-xl">
                        ★
                    </span>
                ))}
                {Array(emptyStars).fill('★').map((_, index) => (
                    <span key={`empty-${index}`} className="text-gray-300 text-xl">
                        ★
                    </span>
                ))}
            </>
        );
    };

    return (
        <GlobalLayout>
            <div className="max-w-6xl mx-auto py-10 px-6">
                <>
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">{book.title}</h1>
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-gray-600">
                                <p className="text-lg mb-2">
                                    <strong>Author:</strong>{' '}
                                    {authorName ? (
                                        <Link href={`/authors/${book.authorId}`} className="text-blue-600 hover:underline">
                                            {authorName}
                                        </Link>
                                    ) : (
                                        'Loading author...'
                                    )}
                                </p>
                                <p className="text-lg">
                                    <strong>Price:</strong> ${book.price}
                                </p>
                            </div>
                            <div className="text-gray-600">
                                <p className="text-lg mb-2">
                                    <strong>Year Published:</strong>
                                    {new Date(book.publicationDate).getFullYear()}
                                </p>
                                <p className="text-lg">
                                    <strong>Book ID:</strong> {book.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reviews</h2>
                        <div className="mb-4">
                            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                                Sort by rating:
                            </label>
                            <select
                                id="order"
                                name="order"
                                value={order}
                                onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <ReviewList reviews={reviews} onDelete={onDeleteReview} renderStars={renderStars} />
                        <CreateReviewForm bookId={book.id} onCreate={onCreateReview} />
                    </div>
                </>
            </div>
        </GlobalLayout>
    );
};

export default BookDetailsPage;
