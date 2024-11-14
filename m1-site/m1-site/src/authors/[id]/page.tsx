'use client';

import { FC, useEffect } from "react";
import { GlobalLayout } from "../../GlobalLayout";
import { useGetAuthorProvider } from "../../../providers/useAuthorProviders";
import { useParams } from "next/navigation";
import Link from "next/link";

const AuthorDetailsPage: FC = () => {
    const { id } = useParams();
    const { author, books, loadAuthor } = useGetAuthorProvider(id as string);

    useEffect(() => {
        loadAuthor();
    }, [id]);

    return (
        <GlobalLayout>
            <div className="max-w-4xl mx-auto py-10 px-6">
                {author ? (
                    <>
                        {/* Author Info Section */}
                        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
                            <div className="flex items-center mb-6">
                                {author.photoUrl && (
                                    <img
                                        src={author.photoUrl}
                                        alt={`${author.firstName} ${author.lastName}`}
                                        className="w-48 h-48 rounded-full mr-6 shadow-md"
                                    />
                                )}
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-800">
                                        {`${author.firstName} ${author.lastName}`}
                                    </h1>
                                    <p className="text-lg text-gray-600 mt-2">
                                        <strong>Biography:</strong> {author.biography}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Books Section */}
                        <div className="bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center border-b-2 border-gray-300 pb-2">Books by {author.firstName}</h2>
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <div key={book.id} className="mb-6 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                        <Link href={`/books/${book.id}`} className="text-blue-600 text-xl font-semibold hover:underline">
                                            {book.title}
                                        </Link>
                                        <p className="text-gray-600 mt-2">Publication Date: {book.publicationDate}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center">No books available.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-xl text-gray-600">Loading author details...</p>
                )}
            </div>
        </GlobalLayout>
    );
};

export default AuthorDetailsPage;
