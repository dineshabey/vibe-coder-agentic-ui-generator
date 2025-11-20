export interface GenerationState {
  isLoading: boolean;
  generatedCode: string | null;
  error: string | null;
}

export interface VibePreset {
  id: string;
  label: string;
  prompt: string;
  color: string;
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  COMPRESSING = 'COMPRESSING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface VirtualFile {
  name: string;
  path: string;
  content: string;
  language: string;
  description?: string;
}
