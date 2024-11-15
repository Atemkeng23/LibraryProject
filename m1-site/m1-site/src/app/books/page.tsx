'use client';
import { useEffect, useState } from 'react';
import { BookListItem } from '../../components/BookListItem';
import { CreateBookForm } from '../../components/CreateBookForm';
import { useListBookProviders } from '../../providers/useBookProviders';
import { GlobalLayout } from '../GlobalLayout';

const BooksPage = () => {
    const { loadBooks, books, onCreate, onUpdate, onDelete } = useListBookProviders();
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        loadBooks();
    }, []);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <GlobalLayout>
            <div className="max-w-7xl mx-auto py-10 px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Library Management
                    </h1>
                    <p className="text-lg text-gray-600">Create, edit, and manage your book collection</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search books by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                </div>

                {/* Create Book Form */}
                <div className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
                    <CreateBookForm onCreate={onCreate} />
                </div>

                {/* Book List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-[0_10px_50px_rgba(0,0,0,0.25)] transition-shadow duration-300 ease-in-out transform hover:scale-105 min-w-[350px]"
                            >
                                <BookListItem book={book} onDelete={onDelete} onUpdate={onUpdate} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-xl text-gray-500 font-light">
                            No books match your search.
                        </p>
                    )}
                </div>
            </div>
        </GlobalLayout>
    );
};

export default BooksPage;
