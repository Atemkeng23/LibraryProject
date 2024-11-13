import { FC, useState } from "react";
import { AuthorModel } from "../models/AuthorModel";
import { Button } from "./Button";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./comfirmation";

type Props = {
    author: AuthorModel;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedAuthor: AuthorModel) => void; // onUpdate maintenant prend un objet AuthorModel
};

export const AuthorListItem: FC<Props> = ({ author, onDelete, onUpdate }) => {
    const router = useRouter();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updatedAuthor, setUpdatedAuthor] = useState<AuthorModel>({
        id: author.id,
        firstName: author.firstName || '',
        lastName: author.lastName || '',
        biography: author.biography || '',
        photoUrl: author.photoUrl || '',
        bookCount: author.bookCount || 0,
        averageRating: author.averageRating || 0
    });
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete(author.id);
        setModalOpen(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Fonction pour gérer la mise à jour de l'auteur
    const handleUpdateChange = (field: string, value: string) => {
        setUpdatedAuthor(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            {/* Bloc de modification avec le formulaire complet */}
            {editMode ? (
                <div className="space-y-4">
                    {/* Champs de formulaire pour l'édition */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={updatedAuthor.firstName}
                            onChange={(e) => handleUpdateChange('firstName', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={updatedAuthor.lastName}
                            onChange={(e) => handleUpdateChange('lastName', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Biography</label>
                        <textarea
                            value={updatedAuthor.biography}
                            onChange={(e) => handleUpdateChange('biography', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input
                            type="url"
                            value={updatedAuthor.photoUrl}
                            onChange={(e) => handleUpdateChange('photoUrl', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="space-x-4">
                        <Button
                            onClick={() => {
                                setEditMode(false);
                                setUpdatedAuthor({
                                    ...updatedAuthor, // Reset to initial values
                                    firstName: author.firstName || '',
                                    lastName: author.lastName || '',
                                    biography: author.biography || '',
                                    photoUrl: author.photoUrl || ''
                                });
                            }}
                            className="bg-gray-300 text-green-500 hover:bg-gray-400"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                onUpdate(author.id, updatedAuthor); // Pass updated author object
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
                    {`${author.firstName} ${author.lastName}`}
                </div>
            )}

            {/* Boutons */}
            <div className="mt-4 space-x-4">
                <Button
                    onClick={() => router.push(`/authors/${author.id}`)}
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
                message={`Êtes-vous sûr de vouloir supprimer l'auteur ${author.firstName} ${author.lastName} ?`}
            />
        </div>
    );
};
