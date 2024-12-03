import { useState, useCallback } from 'react';
import { FileItem } from '../types/file';

export function useFileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const addFiles = useCallback((newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: file.type.startsWith('image/') 
        ? URL.createObjectURL(file)
        : '',
      progress: 0,
      uploaded: false
    }));

    setFiles((prev) => [...prev, ...fileItems]);

    // Simulate file upload
    fileItems.forEach((fileItem) => {
      const interval = setInterval(() => {
        setFiles((prev) => 
          prev.map((f) => {
            if (f.id === fileItem.id) {
              const progress = Math.min(f.progress + 10, 100);
              return {
                ...f,
                progress,
                uploaded: progress === 100
              };
            }
            return f;
          })
        );
      }, 500);

      // Clear interval when upload is complete
      setTimeout(() => clearInterval(interval), 5000);
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  return {
    files,
    addFiles,
    removeFile
  };
}