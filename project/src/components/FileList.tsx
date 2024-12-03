import React, { useState } from 'react';
import { FileItem } from '../types/file';
import { 
  CheckCircle, 
  XCircle, 
  Image as ImageIcon, 
  FileText, 
  Film,
  Music,
  File,
  Link,
  Copy,
  Check,
  Pencil
} from 'lucide-react';
import { formatFileSize } from '../utils/formatters';
import { generateShareableLink, getShareUrl } from '../utils/shareLink';

interface FileListProps {
  files: FileItem[];
  onRemove: (id: string) => void;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) {
    return <ImageIcon className="w-8 h-8 text-blue-500" />;
  }
  if (type.startsWith('video/')) {
    return <Film className="w-8 h-8 text-blue-500" />;
  }
  if (type.startsWith('audio/')) {
    return <Music className="w-8 h-8 text-blue-500" />;
  }
  if (type === 'application/pdf') {
    return <FileText className="w-8 h-8 text-blue-500" />;
  }
  return <File className="w-8 h-8 text-blue-500" />;
}

export function FileList({ files, onRemove }: FileListProps) {
  const [shareUrl, setShareUrl] = useState<string>('');
  const [shareTitle, setShareTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = () => {
    const uploadedFiles = files.filter(f => f.uploaded);
    if (uploadedFiles.length === 0) return;

    const defaultTitle = uploadedFiles.length === 1 
      ? uploadedFiles[0].file.name 
      : `${uploadedFiles.length} arquivos compartilhados`;
    
    setShareTitle(defaultTitle);
    const shareLink = generateShareableLink(uploadedFiles.map(f => f.id), defaultTitle);
    const url = getShareUrl(shareLink.id);
    setShareUrl(url);
    setIsEditingTitle(true);
  };

  const handleUpdateTitle = () => {
    setIsEditingTitle(false);
    // In a real application, we would update the share link title in the backend here
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="mt-6">
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex-shrink-0">
              {file.file.type.startsWith('image/') ? (
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                getFileIcon(file.file.type)
              )}
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {file.file.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.file.size)}
                </p>
              </div>
              
              <div className="mt-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      file.error ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="mt-1 flex items-center">
                {file.uploaded ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : file.error ? (
                  <XCircle className="w-4 h-4 text-red-500" />
                ) : null}
                <span className={`text-xs ml-2 ${
                  file.error ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {file.error || (file.uploaded ? 'Enviado com sucesso' : `${file.progress}% enviado`)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onRemove(file.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          {shareUrl ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {isEditingTitle ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={shareTitle}
                      onChange={(e) => setShareTitle(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Digite um título para o compartilhamento"
                    />
                    <button
                      onClick={handleUpdateTitle}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="flex-1 font-medium text-gray-900">{shareTitle}</h3>
                    <button
                      onClick={() => setIsEditingTitle(true)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent border-none focus:outline-none text-gray-600"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-500 hover:text-blue-600"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGenerateLink}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={!files.some(f => f.uploaded)}
            >
              <Link className="w-4 h-4" />
              Gerar Link Compartilhável
            </button>
          )}
        </div>
      )}
    </div>
  );
}