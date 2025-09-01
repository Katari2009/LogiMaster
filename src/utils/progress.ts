import { ProgressData } from '../types';

const PROGRESS_KEY = 'logimasterProgress';

export const getProgressData = (): ProgressData => {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to parse progress data from localStorage", error);
    // If parsing fails, clear the invalid data
    localStorage.removeItem(PROGRESS_KEY);
    return {};
  }
};

export const saveProgressData = (data: ProgressData): void => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save progress data to localStorage", error);
  }
};