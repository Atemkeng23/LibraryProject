'use client';

import { FC } from "react";
import { GlobalLayout} from "./GlobalLayout";
import Link from "next/link";

const Home: FC = () => {
    return (
        <GlobalLayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12 px-6">

                {/* Navigation Header */}
                <header className="absolute top-0 left-0 w-full bg-white bg-opacity-90 shadow-lg z-10">
                    <div className="max-w-4xl mx-auto flex justify-between items-center py-4 px-6">
                        {/* Logo or Title */}
                        <div className="text-3xl font-bold text-gray-800">
                            <Link href="/" className="text-blue-600 hover:text-blue-800">
                                Library Management
                            </Link>
                        </div>

                        {/* Navigation Buttons */}
                        <nav className="space-x-6">
                            <Link
                                href="/authors"
                                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                            >
                                Authors
                            </Link>
                            <Link
                                href="/books"
                                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                            >
                                Books
                            </Link>
                            <Link
                                href="/reviews"
                                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
                            >
                                Reviews
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <div className="text-center text-white mb-12 mt-24">
                    <h1 className="text-6xl font-extrabold mb-4 text-shadow-md tracking-tight">
                        Welcome to the Library Management System
                    </h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                        A seamless platform to manage authors, books, and reviews efficiently and effectively.
                        Keep your library organized with ease and discover new worlds through literature.
                    </p>
                </div>

                {/* Credits Section */}
                <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg mx-auto transform hover:scale-105 transition-all duration-300 ease-in-out">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                        This application was developed by:
                    </h2>
                    <p className="text-lg text-gray-800 font-semibold text-center space-x-2">
                        <span className="text-purple-600">MARIA</span>,
                        <span className="text-pink-600">FRANCK</span>,
                        <span className="text-purple-600">MARLENE</span>,
                        <span className="text-pink-600">SANDRA</span>, and
                        <span className="text-purple-600">COLLINS</span>.
                    </p>
                </div>

                {/* Additional Description */}
                <div className="mt-10 max-w-4xl mx-auto text-center">
                    <p className="text-xl text-white opacity-80">
                        Whether you are an avid reader or a library manager, this tool helps you organize, track, and
                        manage all your books, reviews, and authors with ease. Dive into the world of books with a powerful
                        and user-friendly interface.
                    </p>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default Home;
