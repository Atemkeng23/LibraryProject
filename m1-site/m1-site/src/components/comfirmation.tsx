import React, { FC } from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            {/* Overlay pour bloquer l'interaction avec l'arrière-plan */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 pointer-events-auto"></div>

            {/* Contenu de la modale */}
            <div className="bg-white p-5 rounded shadow-lg z-10">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 px-4 py-2 mr-2 rounded"
                        onClick={onClose}
                    >
                        Annuler
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={onConfirm}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
