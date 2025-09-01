import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AvatarState } from '../types';

interface AvatarContextType {
  avatarState: AvatarState;
  setAvatarState: (state: AvatarState) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  // Fix: Use ReturnType<typeof setTimeout> for portability between environments (browser vs. node)
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const setTemporaryState = (state: AvatarState) => {
    // Clear any existing timeout to prevent premature return to idle
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setAvatarState(state);

    // Set a timer to return to idle only for temporary states
    if (state !== 'idle' && state !== 'thinking') {
      const id = setTimeout(() => {
        setAvatarState('idle');
      }, 3000); // return to idle after 3 seconds
      setTimeoutId(id);
    }
  };

  return (
    <AvatarContext.Provider value={{ avatarState, setAvatarState: setTemporaryState }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};