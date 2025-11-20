import React, { useState, useCallback, useMemo } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { VibeControls } from './components/VibeControls';
import { PreviewFrame } from './components/PreviewFrame';
import { CodeBrowser } from './components/CodeBrowser';
import { generateUIFromMultimodal } from './services/geminiService';
import { ProcessingStatus } from './types';
import { generateProjectFiles } from './utils/projectUtils';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const handleImageSelected = useCallback((base64: string, mimeType: string) => {
    setSelectedImage(base64);
    setImageMimeType(mimeType);
    setGeneratedCode(null);
    setError(null);
    setActiveTab('preview');
  }, []);

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setStatus(ProcessingStatus.GENERATING);
    setError(null);
    setActiveTab('preview');

    try {
      const code = await generateUIFromMultimodal(selectedImage, imageMimeType, prompt);
      setGeneratedCode(code);
      setStatus(ProcessingStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong generating the UI.");
      setStatus(ProcessingStatus.ERROR);
    }
  };

  const projectFiles = useMemo(() => {
    if (!generatedCode) return [];
    return generateProjectFiles(generatedCode, prompt);
  }, [generatedCode, prompt]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 className="font-bold text-xl tracking-tight">
              Agentic  <span className="text-indigo-400">UI Generator</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-500/30">
                Powered by Gemini 2.5
             </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full p-4 md:p-6 lg:h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pb-6 custom-scrollbar">
            {/* 1. Image Upload */}
            <section className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm">
               <ImageUploader 
                 onImageSelected={handleImageSelected} 
                 selectedImage={selectedImage} 
               />
            </section>

            {/* 2. Vibe Controls */}
            <section className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 shadow-xl backdrop-blur-sm flex-1 flex flex-col">
              <VibeControls 
                prompt={prompt}
                setPrompt={setPrompt}
                onGenerate={handleGenerate}
                isGenerating={status === ProcessingStatus.GENERATING}
                isValid={!!selectedImage}
              />
              
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex gap-2 items-start animate-fadeIn">
                   <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   {error}
                </div>
              )}
            </section>
          </div>

          {/* Right Panel: Preview & Code */}
          <div className="lg:col-span-8 h-[600px] lg:h-full flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex items-center justify-between">
               <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                 <button
                   onClick={() => setActiveTab('preview')}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all
                     ${activeTab === 'preview' 
                       ? 'bg-slate-800 text-white shadow-sm' 
                       : 'text-slate-400 hover:text-slate-200'}
                   `}
                 >
                   👁️ Live Preview
                 </button>
                 <button
                   onClick={() => setActiveTab('code')}
                   disabled={!generatedCode}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all
                     ${activeTab === 'code' 
                       ? 'bg-slate-800 text-white shadow-sm' 
                       : 'text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'}
                   `}
                 >
                   📂 Project Code
                 </button>
               </div>
            </div>

            <div className="flex-1 relative">
               {activeTab === 'preview' ? (
                 <PreviewFrame 
                   htmlCode={generatedCode} 
                   isLoading={status === ProcessingStatus.GENERATING} 
                 />
               ) : (
                 <CodeBrowser files={projectFiles} />
               )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
