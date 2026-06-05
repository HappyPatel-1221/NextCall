import React from "react";
import { X } from "lucide-react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-[520px] rounded-xl bg-white dark:bg-dark-1 border border-gray-200 dark:border-white/10 p-6 shadow-2xl transition-all">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <img src={image} alt="modal graphic" className="h-24 w-24" />
            </div>
          )}

          <h1 className={`text-2xl font-bold leading-[42px] text-gray-900 dark:text-white ${className}`}>
            {title}
          </h1>

          {children}

          {handleClick && (
            <button
              className="w-full rounded-lg bg-blue-primary px-4 py-3 text-sm font-semibold text-white shadow hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              onClick={handleClick}
            >
              {buttonIcon && (
                <img src={buttonIcon} alt="button icon" width={16} height={16} className="invert" />
              )}
              {buttonText || "Schedule Meeting"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
