import { FC, useState, useEffect } from "react";
import { BookModel } from "../models/BookModel";
import { AuthorModel } from "../models/AuthorModel"; // Assure-toi que tu importes AuthorModel
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./comfirmation";
import {useListAuthorProviders} from "../providers/useAuthorProviders";
// Assurez-vous que ce hook existe pour récupérer les auteurs

type Props = {
    book: BookModel;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedBook: BookModel) => void; // onUpdate prend un objet BookModel
};

export const BookListItem: FC<Props> = ({ book, onDelete, onUpdate }) => {
    const router = useRouter();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updatedBook, setUpdatedBook] = useState<BookModel>({
        id: book.id,
        title: book.title || '',
        authorId: book.authorId || '',
        price: book.price || 0,
        publicationDate: book.publicationDate || '',
        averageRating: book.averageRating || 0,
    });
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    // Récupérer la liste des auteurs
    const { authors } = useListAuthorProviders(); // On suppose que ce hook te donne la liste des auteurs

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(book.id);
        setModalOpen(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Fonction pour gérer la mise à jour du livre
    const handleUpdateChange = (field: string, value: string | number) => {
        setUpdatedBook(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    // Mettre à jour l'ID de l'auteur lorsqu'un auteur est sélectionné
    const handleAuthorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUpdatedBook(prevState => ({
            ...prevState,
            authorId: event.target.value
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            {/* Bloc de modification avec le formulaire complet */}
            {editMode ? (
                <div className="space-y-4">
                    {/* Champs de formulaire pour l'édition */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={updatedBook.title}
                            onChange={(e) => handleUpdateChange('title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Sélecteur d'auteur */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <select
                            value={updatedBook.authorId}
                            onChange={handleAuthorSelect}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select an Author</option>
                            {authors?.map((author: AuthorModel) => (
                                <option key={author.id} value={author.id}>
                                    {`${author.firstName} ${author.lastName}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={updatedBook.price}
                            onChange={(e) => handleUpdateChange('price', Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Publication Date</label>
                        <input
                            type="date"
                            value={updatedBook.publicationDate}
                            onChange={(e) => handleUpdateChange('publicationDate', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="space-x-4">
                        <Button
                            onClick={() => {
                                setEditMode(false);
                                setUpdatedBook({
                                    ...updatedBook, // Reset to initial values
                                    title: book.title || '',
                                    authorId: book.authorId || '',
                                    price: book.price || 0,
                                    publicationDate: book.publicationDate || ''
                                });
                            }}
                            className="bg-gray-300 text-green-500 hover:bg-gray-400"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                onUpdate(book.id, updatedBook); // Pass updated book object
                                setEditMode(false);
                            }}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-lg font-semibold text-gray-800">
                    {book.title} {/* Affiche seulement le titre */}
                </div>
            )}

            {/* Boutons */}
            <div className="mt-4 space-x-4">
                <Button
                    onClick={() => router.push(`/books/${book.id}`)}
                    className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-green-500 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group"
                >
                    Details
                </Button>
                <Button
                    onClick={() => setEditMode(true)}
                    className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-green-500 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group"
                >
                    Update
                </Button>
                <Button
                    onClick={handleDeleteClick}
                    className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-green-500 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group"
                >
                    Delete
                </Button>
            </div>

            {/* Modale de confirmation */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                message={`Êtes-vous sûr de vouloir supprimer le livre ${book.title} ?`}
            />
        </div>
    );
};
