export interface FileItem {
  id: string;
  file: File;
  preview: string;
  progress: number;
  uploaded: boolean;
  error?: string;
  shareId?: string;
}

export interface ShareableLink {
  id: string;
  title: string;
  files: string[];
  createdAt: number;
  expiresAt: number;
}