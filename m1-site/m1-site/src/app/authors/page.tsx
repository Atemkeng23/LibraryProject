'use client';
import { useEffect, useState } from 'react';
import { AuthorListItem } from '../../components/AuthorListItem';
import { CreateAuthorForm } from '../../components/CreateAuthorForm';
import { useListAuthorProviders } from '../../providers/useAuthorProviders';
import { GlobalLayout } from '../GlobalLayout';

const AuthorsPage = () => {
    const { loadAuthors, authors, onCreate, onUpdate, onDelete } = useListAuthorProviders();
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        loadAuthors();
    }, []);

    const filteredAuthors = authors.filter((author) =>
        `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <GlobalLayout>
            <div className="max-w-7xl mx-auto py-10 px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Authors Management
                    </h1>
                    <p className="text-lg text-gray-600">Create, edit, and manage authors effortlessly</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search authors by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                </div>

                {/* Create Author Form */}
                <div className="mb-12 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
                    <CreateAuthorForm onCreate={onCreate} />
                </div>

                {/* Author List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
                    {filteredAuthors.length > 0 ? (
                        filteredAuthors.map((author) => (
                            <div
                                key={author.id}
                                className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-[0_10px_50px_rgba(0,0,0,0.25)] transition-shadow duration-300 ease-in-out transform hover:scale-105 min-w-[350px]"
                            >
                                <AuthorListItem author={author} onDelete={onDelete} onUpdate={onUpdate} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-xl text-gray-500 font-light">
                            No authors match your search.
                        </p>
                    )}
                </div>
            </div>
        </GlobalLayout>
    );
};

export default AuthorsPage;
