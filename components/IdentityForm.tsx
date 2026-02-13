
import React, { useState } from 'react';

interface IdentityFormProps {
  onSearch: (name: string) => void;
  isLoading: boolean;
}

const IdentityForm: React.FC<IdentityFormProps> = ({ onSearch, isLoading }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSearch(name.trim());
    }
  };

  const handleQuickSearch = (val: string) => {
    setName(val);
    onSearch(val);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for a person, object, or place..."
            className="w-full px-5 py-3.5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none text-black font-medium placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className={`px-10 py-3.5 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-2 ${
            isLoading || !name.trim() 
            ? 'bg-slate-300 cursor-not-allowed' 
            : 'bg-black hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI Scanning...
            </span>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <span className="text-slate-400">Suggestions:</span>
        <button type="button" onClick={() => handleQuickSearch("Nikola Tesla")} className="hover:text-black transition-colors underline decoration-slate-300">Nikola Tesla</button>
        <button type="button" onClick={() => handleQuickSearch("Voyager 1")} className="hover:text-black transition-colors underline decoration-slate-300">Voyager 1</button>
        <button type="button" onClick={() => handleQuickSearch("The Great Wall of China")} className="hover:text-black transition-colors underline decoration-slate-300">Great Wall</button>
      </div>
    </form>
  );
};

export default IdentityForm;
