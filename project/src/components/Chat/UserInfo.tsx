import React from 'react';
import { User } from '../../types/chat';

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              user.online ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">
            {user.online ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    </div>
  );
}