import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string, mimeType: string) => void;
  selectedImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Extract base64 data and mime type
      // Format: data:image/jpeg;base64,/9j/4AAQ...
      const matches = base64String.match(/^data:(.+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const data = matches[2];
        onImageSelected(data, mimeType);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <label className="block text-sm font-medium text-slate-400">1. Upload Sketch / Mockup</label>
      <div
        className={`relative flex-1 flex flex-col items-center justify-center w-full min-h-[200px] rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer group
          ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-indigo-400 hover:bg-slate-800'}
          ${selectedImage ? 'bg-slate-900' : 'bg-slate-800/50'}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        {selectedImage ? (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img 
              src={`data:image/png;base64,${selectedImage}`} 
              alt="Preview" 
              className="max-w-full max-h-[300px] object-contain rounded-md shadow-lg" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-white font-medium">Click to Change Image</span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-300 font-medium">Click or drop your sketch here</p>
            <p className="text-slate-500 text-sm mt-2">Supports PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};