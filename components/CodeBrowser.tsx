import React, { useState, useEffect } from 'react';
import { VirtualFile } from '../types';
import { downloadProjectZip } from '../utils/projectUtils';

interface CodeBrowserProps {
  files: VirtualFile[];
}

export const CodeBrowser: React.FC<CodeBrowserProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<VirtualFile | null>(null);

  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    }
  }, [files, selectedFile]);

  const handleDownload = () => {
    downloadProjectZip(files);
  };

  if (files.length === 0) return null;

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex shadow-2xl flex-col md:flex-row">
      {/* Sidebar: File Explorer */}
      <div className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Files</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {/* Simulated Folder Structure */}
          <div className="text-sm">
             {/* Root Files */}
             {files.map((file) => (
               <button
                 key={file.path}
                 onClick={() => setSelectedFile(file)}
                 className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors mb-1
                   ${selectedFile?.path === file.path ? 'bg-indigo-600/20 text-indigo-300' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                 `}
               >
                 <FileIcon name={file.name} />
                 <span className="truncate">{file.path}</span>
               </button>
             ))}
          </div>
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
           <button 
             onClick={handleDownload}
             className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             Download Project
           </button>
        </div>
      </div>

      {/* Main Area: Code View */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {selectedFile ? (
          <>
            <div className="h-10 border-b border-slate-800 flex items-center px-4 justify-between bg-slate-900">
               <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                 <FileIcon name={selectedFile.name} />
                 {selectedFile.name}
               </div>
               <span className="text-xs text-slate-500">{selectedFile.language.toUpperCase()}</span>
            </div>
            
            {selectedFile.description && (
              <div className="bg-slate-800/30 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 flex gap-2 items-center">
                <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {selectedFile.description}
              </div>
            )}

            <div className="flex-1 overflow-auto p-4 custom-scrollbar relative group">
              <pre className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap break-all">
                {selectedFile.content}
              </pre>
              <button 
                onClick={() => navigator.clipboard.writeText(selectedFile.content)}
                className="absolute top-2 right-2 p-2 bg-slate-800/80 text-slate-400 rounded hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy content"
              >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            Select a file to view content
          </div>
        )}
      </div>
    </div>
  );
};

const FileIcon = ({ name }: { name: string }) => {
  if (name.endsWith('html')) return <span className="text-orange-500">📄</span>;
  if (name.endsWith('css')) return <span className="text-blue-400">#️⃣</span>;
  if (name.endsWith('js')) return <span className="text-yellow-400">⚡</span>;
  if (name.endsWith('json')) return <span className="text-green-400">{}</span>;
  if (name.endsWith('md')) return <span className="text-slate-300">📝</span>;
  return <span className="text-slate-400">📄</span>;
};
