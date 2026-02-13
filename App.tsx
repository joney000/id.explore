
import React, { useState, useCallback } from 'react';
import { IdentityResult } from './types';
import { fetchIdentityData } from './services/geminiService';
import IdentityForm from './components/IdentityForm';
import IdentityResults from './components/IdentityResults';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdentityResult | null>(null);

  const handleSearch = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIdentityData(name);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Sticky Header / Search Bar area */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 py-4 shadow-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setResult(null)}>
            <div className="bg-black p-2 rounded-xl text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-black tracking-tighter">ID.EXPLORE</h1>
          </div>
          
          <div className="w-full max-w-xl">
             <IdentityForm onSearch={handleSearch} isLoading={loading} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        {!result && !loading && !error && (
          <div className="flex flex-col items-center justify-center text-center mt-20 space-y-6 animate-in fade-in zoom-in duration-1000">
            <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl flex items-center justify-center rotate-3">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H10a2 2 0 00-2 2v14a2 2 0 002 2z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21a2 2 0 100-4 2 2 0 000 4z" />
               </svg>
            </div>
            <div className="max-w-md">
              <h2 className="text-4xl font-black text-black mb-4 tracking-tight">Identity Intelligence</h2>
              <p className="text-slate-600 text-lg leading-snug">
                One name is all it takes. Our AI will classify the identity and gather papers, imagery, and video records instantly.
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center mt-24 space-y-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="text-center animate-pulse">
              <h3 className="text-xl font-bold text-black">Identifying & Sourcing...</h3>
              <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px] mt-2">Classifying Data Points</p>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mt-12 p-8 bg-white border-2 border-red-100 rounded-3xl shadow-2xl flex items-start gap-5">
            <div className="bg-red-50 p-3 rounded-2xl text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-black text-black uppercase tracking-tight">Search Disrupted</h4>
              <p className="text-slate-600 my-3 font-medium">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="px-6 py-2.5 bg-black text-white rounded-xl hover:bg-slate-800 transition-all font-bold text-sm shadow-lg active:scale-95"
              >
                Reset Search
              </button>
            </div>
          </div>
        )}

        {result && !loading && <IdentityResults result={result} />}
      </main>

      <footer className="w-full py-10 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] border-t border-slate-200 bg-white">
        <p>© {new Date().getFullYear()} ID.EXPLORE • Real-time Grounding Engine</p>
      </footer>
    </div>
  );
};

export default App;
