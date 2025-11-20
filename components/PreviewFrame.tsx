import React from 'react';

interface PreviewFrameProps {
  htmlCode: string | null;
  isLoading: boolean;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ htmlCode, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="z-10 flex flex-col items-center animate-pulse">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-semibold text-white">Generating Code...</h3>
          <p className="text-slate-400 mt-2">Analyzing layout & writing CSS</p>
        </div>
      </div>
    );
  }

  if (!htmlCode) {
    return (
      <div className="w-full h-full rounded-xl bg-slate-800/50 border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500">
        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <p>Generated preview will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-2xl relative group">
      <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-2 z-10">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <div className="flex-1 text-center">
           <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">index.html</span>
        </div>
      </div>
      <iframe
        srcDoc={htmlCode}
        title="Generated Preview"
        className="w-full h-full pt-8 bg-white"
        sandbox="allow-scripts"
      />
      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => {
                navigator.clipboard.writeText(htmlCode);
                alert("Code copied to clipboard!");
            }}
            className="p-1.5 bg-slate-800 text-white rounded-md shadow hover:bg-slate-700 text-xs flex items-center gap-1"
          >
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
             Copy Code
          </button>
      </div>
    </div>
  );
};