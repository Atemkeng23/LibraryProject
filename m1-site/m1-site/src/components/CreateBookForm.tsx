import React, { useState } from "react";
import axios from "axios";
import { useListAuthorProviders } from "../providers/useAuthorProviders";

export const CreateBookForm = () => {
    const { authors, loading, error } = useListAuthorProviders();
    const [title, setTitle] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [price, setPrice] = useState("");
    const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");
    const [isFormVisible, setIsFormVisible] = useState(false); // État pour afficher/masquer le formulaire

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newBook = {
            title,
            publicationDate,
            price: parseFloat(price),
            authorId: selectedAuthorId,
        };

        try {
            await axios.post("http://localhost:3001/books", newBook);
            alert("Livre créé avec succès !");
            setIsFormVisible(false); // Cacher le formulaire après soumission
        } catch (err) {
            alert("Erreur lors de la création du livre");
        }
    };

    if (loading) return <p>Chargement des auteurs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            {!isFormVisible ? (
                <div className="text-center">
                    <button
                        onClick={() => setIsFormVisible(true)} // Afficher le formulaire lorsqu'on clique sur ce bouton
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Créer un nouveau livre
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Créer un nouveau livre</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Titre du livre */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Titre du livre
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Date de publication */}
                        <div>
                            <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">
                                Date de publication
                            </label>
                            <input
                                type="date"
                                id="publicationDate"
                                value={publicationDate}
                                onChange={(e) => setPublicationDate(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Prix */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Prix
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Choisir un auteur */}
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                Choisir un auteur
                            </label>
                            <select
                                id="author"
                                value={selectedAuthorId}
                                onChange={(e) => setSelectedAuthorId(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Sélectionner un auteur</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.firstName} {author.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Boutons */}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsFormVisible(false)} // Fermer le formulaire et réafficher le bouton "Créer un livre"
                                type="button"
                                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                Créer
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};
