import { FC } from "react";

type Props = {
  children: string;
  onClick: () => void;
  className?: string; // Ajout d'une prop pour les classes CSS supplémentaires
  disabled?: boolean; // Ajout d'une prop pour désactiver le bouton
};

export const Button: FC<Props> = ({ children, onClick, className = "", disabled = false }) => {
  return (
      <button
          onClick={onClick}
          className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-green-500 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group ${className}`}
          disabled={disabled}
      >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-500 duration-300 -translate-x-full bg-pink-500 group-hover:translate-x-0 ease">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </span>
        <span className="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">{children}</span>
        <span className="relative text-green-500">{children}</span>
      </button>
  );
};
