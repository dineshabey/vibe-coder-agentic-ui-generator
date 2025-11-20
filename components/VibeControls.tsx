import React from 'react';
import { VibePreset } from '../types';

interface VibeControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isValid: boolean;
}

const PRESETS: VibePreset[] = [
  { id: '1', label: 'Modern SaaS', color: 'bg-blue-600', prompt: 'Create a clean, modern SaaS landing page. Use Inter font, ample whitespace, rounded corners, and a blue/indigo primary color palette. Make it look trustworthy and expensive.' },
  { id: '2', label: 'Cyberpunk', color: 'bg-pink-600', prompt: 'Cyberpunk aesthetic. Dark mode, neon pink and green accents, glitch effects, sharp angles, and a futuristic terminal vibe.' },
  { id: '3', label: 'Minimalist', color: 'bg-zinc-600', prompt: 'Ultra minimalist. Black and white only. Serif typography for headings. Lots of negative space. Brutalist layout structure.' },
  { id: '4', label: 'Playful', color: 'bg-yellow-500', prompt: 'Playful and friendly. Use rounded warm colors (orange, yellow), bubbly shapes, soft shadows, and a casual tone.' },
];

export const VibeControls: React.FC<VibeControlsProps> = ({ prompt, setPrompt, onGenerate, isGenerating, isValid }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 flex flex-col gap-2">
        <label className="block text-sm font-medium text-slate-400">2. Define the Vibe</label>
        <textarea
          className="w-full flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
          placeholder="Describe the website features, style, and behavior. E.g., 'A login page with a glass effect card centered on a gradient background...'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setPrompt(preset.prompt)}
              className="flex-shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs text-slate-300 transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${preset.color}`}></span>
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!isValid || isGenerating}
        className={`
          w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3
          ${isValid && !isGenerating 
            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
        `}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Coding...</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Generate UI</span>
          </>
        )}
      </button>
    </div>
  );
};