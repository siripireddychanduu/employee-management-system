import type { ReactNode } from "react";

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function EmployeeModal({
  open,
  title,
  children,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col transform transition-all duration-300 scale-100 border border-gray-100 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4.5 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-all"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content - Handles scrolling beautifully if contents overflow */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
