
import React, { useRef } from 'react';
import { IdentityResult, PaperAsset, MediaAsset } from '../types';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const HorizontalSection: React.FC<SectionProps> = ({ title, icon, children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mb-16">
      <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
        <div className="p-2.5 bg-black text-white rounded-xl shadow-lg">
          {icon}
        </div>
        <h2 className="text-2xl font-black text-black tracking-tight">{title}</h2>
      </div>
      
      <div className="relative group/section">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-md border border-slate-200 text-black rounded-full shadow-xl opacity-0 group-hover/section:opacity-100 transition-all hover:bg-black hover:text-white active:scale-95 hidden md:flex items-center justify-center"
          aria-label="Scroll Left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 px-4 md:px-0 scrollbar-hide snap-x no-scrollbar scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
          <div className="flex-shrink-0 w-8 md:w-20" aria-hidden="true" />
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-md border border-slate-200 text-black rounded-full shadow-xl opacity-0 group-hover/section:opacity-100 transition-all hover:bg-black hover:text-white active:scale-95 hidden md:flex items-center justify-center"
          aria-label="Scroll Right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Visual Fade indicators */}
        <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const PaperCard: React.FC<{ paper: PaperAsset }> = ({ paper }) => (
  <a 
    href={paper.url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex-shrink-0 w-72 md:w-80 h-56 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex flex-col justify-between group"
  >
    <div>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-white bg-black px-2.5 py-1 rounded-md">Archive</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="font-black text-black text-lg line-clamp-2 mb-2 group-hover:underline transition-all">{paper.title}</h3>
      <p className="text-sm text-slate-700 font-medium line-clamp-3 leading-snug">{paper.snippet || 'No summary available'}</p>
    </div>
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate border-t border-slate-100 pt-4">
      {paper.source || 'Verified Source'}
    </div>
  </a>
);

const MediaCard: React.FC<{ asset: MediaAsset, type: 'image' | 'video' }> = ({ asset, type }) => (
  <a 
    href={asset.url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex-shrink-0 w-64 md:w-72 aspect-[4/3] bg-black rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 snap-start relative group"
  >
    <div className={`absolute inset-0 opacity-20 ${type === 'video' ? 'bg-indigo-900' : 'bg-slate-900'}`} 
         style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 0.5px, transparent 0)`, backgroundSize: '16px 16px' }} />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
    
    <div className="absolute inset-0 flex items-center justify-center">
      {type === 'video' ? (
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      ) : (
        <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:bg-white transition-all duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-5">
      <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{asset.platform || 'Public Asset'}</span>
      <h3 className="text-white font-bold text-base line-clamp-1 mt-1 group-hover:text-indigo-200 transition-colors">{asset.title}</h3>
    </div>
  </a>
);

const IdentityResults: React.FC<{ result: IdentityResult }> = ({ result }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 w-full max-w-6xl mx-auto px-4">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">
           <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
           Automatically Identified: {result.category}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-none">{result.name}</h1>
        <p className="text-slate-800 text-xl max-w-3xl mx-auto leading-relaxed font-medium">{result.summary}</p>
      </div>

      <HorizontalSection 
        title="Scholarly Records" 
        icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
      >
        {result.papers.length > 0 ? (
          result.papers.map((paper, i) => <PaperCard key={i} paper={paper} />)
        ) : (
          <div className="w-full text-center text-slate-400 py-16 font-bold uppercase tracking-widest">No matching scholarly records</div>
        )}
      </HorizontalSection>

      <HorizontalSection 
        title="Visual Forensics" 
        icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
      >
        {result.images.length > 0 ? (
          result.images.map((img, i) => <MediaCard key={i} asset={img} type="image" />)
        ) : (
          <div className="w-full text-center text-slate-400 py-16 font-bold uppercase tracking-widest">No visual forensic data</div>
        )}
      </HorizontalSection>

      <HorizontalSection 
        title="Motion Records" 
        icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
      >
        {result.videos.length > 0 ? (
          result.videos.map((vid, i) => <MediaCard key={i} asset={vid} type="video" />)
        ) : (
          <div className="w-full text-center text-slate-400 py-16 font-bold uppercase tracking-widest">No available motion records</div>
        )}
      </HorizontalSection>
    </div>
  );
};

export default IdentityResults;
