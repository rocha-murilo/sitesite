import JSZip from 'jszip';
import { FileItem } from '../types/file';

export async function compressFiles(files: FileItem[]): Promise<string> {
  const zip = new JSZip();
  
  // Add each file to the zip
  for (const fileItem of files) {
    zip.file(fileItem.file.name, fileItem.file);
  }
  
  // Generate the zip file
  const content = await zip.generateAsync({ type: 'blob' });
  
  // Create a download URL
  const url = URL.createObjectURL(content);
  
  return url;
}