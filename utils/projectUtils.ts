import JSZip from 'jszip';
import { VirtualFile } from '../types';

export const generateProjectFiles = (htmlCode: string, prompt: string): VirtualFile[] => {
  const safePrompt = prompt.replace(/\n/g, ' ');
  
  return [
    {
      name: 'index.html',
      path: 'src/index.html',
      language: 'html',
      content: htmlCode,
      description: 'The main entry point containing the generated UI.'
    },
    {
      name: 'README.md',
      path: 'README.md',
      language: 'markdown',
      content: `# Vibe Coder Project\n\n## Design Brief\n> ${safePrompt}\n\n## Overview\nThis project was generated using Gemini 2.5 Multimodal API. It consists of a single-file HTML structure using Tailwind CSS via CDN.\n\n## Usage\nSimply open \`src/index.html\` in any modern web browser to view the result.`,
      description: 'Project documentation and usage instructions.'
    },
    {
      name: 'package.json',
      path: 'package.json',
      language: 'json',
      content: JSON.stringify({
        name: "vibe-coder-generated",
        version: "1.0.0",
        description: "AI generated UI",
        scripts: {
          "start": "serve src"
        },
        dependencies: {}
      }, null, 2),
      description: 'Project metadata and configuration.'
    },
    {
      name: 'tailwind.config.js',
      path: 'tailwind.config.js',
      language: 'javascript',
      content: `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: ["./src/**/*.{html,js}"],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`,
      description: 'Tailwind CSS configuration (reference only).'
    }
  ];
};

export const downloadProjectZip = async (files: VirtualFile[]) => {
  const zip = new JSZip();

  files.forEach(file => {
    // Handle nested paths roughly
    if (file.path.includes('/')) {
       // simple folder support for 1 level deep
       const parts = file.path.split('/');
       if (parts.length > 1) {
           const folder = zip.folder(parts[0]);
           if (folder) {
               folder.file(parts[1], file.content);
           }
       }
    } else {
       zip.file(file.name, file.content);
    }
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'vibe-coder-project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
