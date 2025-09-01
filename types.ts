export interface UserProfile {
  name: string;
  course: string;
  profilePic: string | null;
  // Gamification fields
  points: number;
  level: string; // The name of the level
  unlockedBadges: string[]; // Array of badge IDs
}

export interface Level {
    name: string;
    minPoints: number;
    icon: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // Emoji or icon identifier
    condition: (profile: UserProfile, progress: ProgressData) => boolean;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface Activity {
  id: string;
  title: string;
  type: 'explanation' | 'quiz' | 'open_question';
  content: string; // Used for explanations or instructions
  topic: string; // Specific topic for Gemini prompts
  questions?: QuizQuestion[];
  rubric?: string; // For open questions
}

export interface Module {
  id:string;
  title: string;
  description: string;
  activities: Activity[];
}

export interface PracticeProblem {
    problem: string;
    options: { text: string; isCorrect: boolean }[];
    solution: string;
}

// Data structure for storing user's answers for a quiz activity
export interface AnswerData {
  [questionId: string]: string; // questionId -> selectedOptionText
}

// Data structure for storing progress within a single module
export interface ModuleProgress {
  completedActivities: string[]; // Array of completed activity IDs
  answers: {
    [activityId: string]: AnswerData;
  };
}

// Top-level structure for all progress data stored in localStorage
export interface ProgressData {
  [moduleId: string]: ModuleProgress;
}

export type AvatarState = 'idle' | 'happy' | 'sad' | 'thinking' | 'celebrating';