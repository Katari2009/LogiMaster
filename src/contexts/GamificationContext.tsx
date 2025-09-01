import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { UserProfile, ProgressData } from '../types';
import { getProgressData, saveProgressData } from '../utils/progress';
import { LEVELS, BADGES } from '../utils/gamification';
import { useNotification } from './NotificationContext';

interface GamificationContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  createUserProfile: (profile: Omit<UserProfile, 'points' | 'level' | 'unlockedBadges'>) => void;
  addPoints: (pointsToAdd: number) => void;
  resetGamificationProgress: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const USER_PROFILE_KEY = 'userProfile';

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification, triggerConfetti } = useNotification();

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(USER_PROFILE_KEY);
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Failed to parse user profile from localStorage", error);
      localStorage.removeItem(USER_PROFILE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('storage')); // Notify other components
  };

  const createUserProfile = (profileData: Omit<UserProfile, 'points' | 'level' | 'unlockedBadges'>) => {
    const newProfile: UserProfile = {
      ...profileData,
      points: 0,
      level: LEVELS[0].name,
      unlockedBadges: [],
    };
    saveProfile(newProfile);
  };
  
  const resetGamificationProgress = () => {
    if (userProfile) {
        const resetProfile = {
            ...userProfile,
            points: 0,
            level: LEVELS[0].name,
            unlockedBadges: [],
        };
        saveProfile(resetProfile);
        saveProgressData({}); // Also clear activity progress
        showNotification('¡Tu progreso ha sido reiniciado!', 'info');
    }
  };


  const addPoints = useCallback((pointsToAdd: number) => {
    if (!userProfile) return;

    const newPoints = userProfile.points + pointsToAdd;
    let newLevel = userProfile.level;
    let leveledUp = false;

    // Check for level up
    const currentLevelIndex = LEVELS.findIndex(l => l.name === userProfile.level);
    const nextLevel = LEVELS[currentLevelIndex + 1];
    if (nextLevel && newPoints >= nextLevel.minPoints) {
      newLevel = nextLevel.name;
      leveledUp = true;
    }

    const updatedProfile: UserProfile = { ...userProfile, points: newPoints, level: newLevel };
    
    // Check for new badges
    const progressData = getProgressData();
    const newlyUnlockedBadges: string[] = [];
    BADGES.forEach(badge => {
        if (!updatedProfile.unlockedBadges.includes(badge.id) && badge.condition(updatedProfile, progressData)) {
            updatedProfile.unlockedBadges.push(badge.id);
            newlyUnlockedBadges.push(badge.name);
        }
    });

    saveProfile(updatedProfile);
    
    // Trigger notifications and effects
    if (leveledUp) {
        showNotification(`¡Subiste de nivel! Ahora eres ${newLevel}`, 'success');
        triggerConfetti();
    }
    newlyUnlockedBadges.forEach(badgeName => {
        showNotification(`¡Insignia desbloqueada: ${badgeName}!`, 'success');
        triggerConfetti();
    });

  }, [userProfile, showNotification, triggerConfetti]);


  return (
    <GamificationContext.Provider value={{ userProfile, isLoading, createUserProfile, addPoints, resetGamificationProgress }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = (): GamificationContextType => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};