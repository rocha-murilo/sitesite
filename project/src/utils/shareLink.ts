import { nanoid } from 'nanoid';
import { ShareableLink } from '../types/file';

const SHARE_EXPIRATION_HOURS = 24;

export function generateShareableLink(fileIds: string[], title: string): ShareableLink {
  const now = Date.now();
  return {
    id: nanoid(10),
    title,
    files: fileIds,
    createdAt: now,
    expiresAt: now + (SHARE_EXPIRATION_HOURS * 60 * 60 * 1000)
  };
}

export function getShareUrl(shareId: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/share/${shareId}`;
}