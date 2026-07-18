import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-sm group select-none">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
      </div>

      <input
        type="text"
        placeholder="Search by name, email, or ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-150"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          title="Clear search parameter"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
