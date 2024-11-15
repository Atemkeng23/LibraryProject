import React, { useState } from "react";
import axios from "axios";

export const CreateAuthorForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [biography, setBiography] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false); // État pour afficher/masquer le formulaire

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newAuthor = {
            firstName,
            lastName,
            photoUrl,
            biography,
            bookCount: 0, // Initialisé à 0 par défaut
            averageRating: 0, // Initialisé à 0 par défaut
        };

        try {
            await axios.post("http://localhost:3001/authors", newAuthor);
            alert("Auteur créé avec succès !");
            setIsFormVisible(false); // Cacher le formulaire après soumission
        } catch (err) {
            alert("Erreur lors de la création de l'auteur");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            {!isFormVisible ? (
                <div className="text-center">
                    <button
                        onClick={() => setIsFormVisible(true)} // Afficher le formulaire lorsqu'on clique sur ce bouton
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Créer un nouvel auteur
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Créer un nouvel auteur</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Prénom */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Nom */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Photo de l'auteur */}
                        <div>
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
                                URL de la photo
                            </label>
                            <input
                                type="url"
                                id="photoUrl"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Biographie */}
                        <div>
                            <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
                                Biographie
                            </label>
                            <textarea
                                id="biography"
                                value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                                required
                                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows={4}
                            />
                        </div>

                        {/* Boutons */}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsFormVisible(false)} // Fermer le formulaire et réafficher le bouton "Créer un auteur"
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
