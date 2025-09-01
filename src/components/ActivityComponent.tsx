import React, { useState, useEffect } from 'react';
import { Activity, PracticeProblem, QuizOption, AnswerData } from '../types';
import * as geminiService from '../services/geminiService';
import { getProgressData, saveProgressData } from '../utils/progress';
import { useAvatar } from '../contexts/AvatarContext';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { useGamification } from '../contexts/GamificationContext';
import { POINTS_CONFIG } from '../utils/gamification';

interface ActivityComponentProps {
  activity: Activity;
  moduleId: string;
  onComplete: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
    <div style={{...styles.spinnerDot, animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s'}}></div>
    <div style={{...styles.spinnerDot, animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s'}}></div>
    <div style={{...styles.spinnerDot, animation: 'bounce 1.4s infinite ease-in-out both'}}></div>
    <style>{`
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }
    `}</style>
  </div>
);

const ActivityComponent: React.FC<ActivityComponentProps> = ({ activity, moduleId, onComplete }) => {
  const [geminiResponse, setGeminiResponse] = useState<string | PracticeProblem | null>(null);
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerData>(() => {
    const progress = getProgressData();
    return progress[moduleId]?.answers?.[activity.id] || {};
  });
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [feedbackAnimation, setFeedbackAnimation] = useState<{[key: string]: string}>({});
  const { setAvatarState } = useAvatar();
  const { addPoints } = useGamification();

  useEffect(() => {
    if (activity.type === 'quiz' && activity.questions) {
      const savedAnswers = getProgressData()[moduleId]?.answers?.[activity.id];
      const isCompleted = getProgressData()[moduleId]?.completedActivities.includes(activity.id);
      if (savedAnswers && Object.keys(savedAnswers).length === activity.questions.length && isCompleted) {
          setIsQuizCompleted(true);
      }
    }
  }, [activity, moduleId]);

  const callGemini = async (serviceCall: () => Promise<any>) => {
    setIsLoadingGemini(true);
    setGeminiResponse(null);
    setAvatarState('thinking');
    const response = await serviceCall();
    setGeminiResponse(response);
    setIsLoadingGemini(false);
    setAvatarState('idle');
  };

  const handleGetExplanation = () => callGemini(() => geminiService.generateExplanation(activity.topic, activity.content));
  const handleGetProblem = () => callGemini(() => geminiService.generatePracticeProblem(activity.topic));

  const handleSelectAnswer = (questionId: string, option: QuizOption) => {
    const newAnswers = { ...selectedAnswers, [questionId]: option.text };
    setSelectedAnswers(newAnswers);
    
    const progress = getProgressData();
    if (!progress[moduleId]) {
      progress[moduleId] = { completedActivities: [], answers: {} };
    }
    if (!progress[moduleId].answers[activity.id]) {
        progress[moduleId].answers[activity.id] = {};
    }
    progress[moduleId].answers[activity.id][questionId] = option.text;
    saveProgressData(progress);
  };
  
  const checkQuizAnswers = () => {
    setIsQuizCompleted(true);
    let allCorrect = true;
    const newAnimations: {[key: string]: string} = {};

    activity.questions?.forEach(q => {
        const correctOption = q.options.find(o => o.isCorrect);
        const isCorrect = selectedAnswers[q.id] === correctOption?.text;
        if (!isCorrect) allCorrect = false;
        newAnimations[q.id] = isCorrect ? 'animate-tada' : 'animate-shake';
    });

    setFeedbackAnimation(newAnimations);
    setAvatarState(allCorrect ? 'happy' : 'sad');

    if(allCorrect){
        const isAlreadyCompleted = getProgressData()[moduleId]?.completedActivities.includes(activity.id);
        if (!isAlreadyCompleted) {
            const pointsToAward = (activity.questions?.length || 0) * POINTS_CONFIG.CORRECT_ANSWER;
            addPoints(pointsToAward);
        }
        onComplete();
    }
  };
  
  const handleExplanationComplete = () => {
      const isAlreadyCompleted = getProgressData()[moduleId]?.completedActivities.includes(activity.id);
      if (!isAlreadyCompleted) {
          addPoints(POINTS_CONFIG.COMPLETE_EXPLANATION);
      }
      onComplete();
  };


  const renderGeminiResponse = () => {
    if (isLoadingGemini) return <div style={styles.geminiContainer}><LoadingSpinner/></div>;
    if (!geminiResponse) return null;

    return (
      <div style={styles.geminiContainer} className="animate-fade-in">
        <h4 style={styles.geminiTitle}><SparklesIcon style={{ height: '1.25rem', width: '1.25rem' }}/> Asistente IA</h4>
        {typeof geminiResponse === 'string' ? (
          <p style={{whiteSpace: 'pre-wrap'}}>{geminiResponse}</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontWeight: 600 }}>{geminiResponse.problem}</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {geminiResponse.options.map((opt, i) => <li key={i}>{opt.text}</li>)}
            </ul>
            <details style={{ paddingTop: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--color-accent)' }}>Ver solución</summary>
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{geminiResponse.solution}</p>
            </details>
          </div>
        )}
      </div>
    );
  };

  if (activity.type === 'explanation') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={styles.activityTitle}>{activity.title}</h2>
        <p style={styles.activityContent}>{activity.content}</p>
        <div style={styles.iaButtonsContainer}>
          <button onClick={handleGetExplanation} disabled={isLoadingGemini} style={{...styles.iaButton, opacity: isLoadingGemini ? 0.6 : 1}} className="button-pop">
            <LightBulbIcon style={{ height: '1.25rem', width: '1.25rem' }} /> Explicación Alternativa (IA)
          </button>
          <button onClick={handleGetProblem} disabled={isLoadingGemini} style={{...styles.iaButton, opacity: isLoadingGemini ? 0.6 : 1}} className="button-pop">
            <SparklesIcon style={{ height: '1.25rem', width: '1.25rem' }} /> Problema de Práctica (IA)
          </button>
        </div>
        {renderGeminiResponse()}
         <div style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleExplanationComplete} style={styles.primaryButton} className="button-pop">
                Entendido, continuar
            </button>
        </div>
      </div>
    );
  }

  if (activity.type === 'quiz') {
    const allQuestionsAnswered = Object.keys(selectedAnswers).length === activity.questions?.length;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={styles.activityTitle}>{activity.title}</h2>
            <p style={styles.activityContent}>{activity.content}</p>
            {activity.questions?.map((q) => {
                const correctOption = q.options.find(o => o.isCorrect);
                const userAnswer = selectedAnswers[q.id];
                const isAnswerCorrect = userAnswer === correctOption?.text;

                return (
                    <div key={q.id} style={styles.quizQuestionContainer}>
                        <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{q.question}</p>
                        <div style={styles.quizOptionsGrid}>
                            {q.options.map((opt, idx) => {
                                const isSelected = userAnswer === opt.text;
                                let optionStyle = { ...styles.quizOptionButton };
                                if (isQuizCompleted) {
                                    if (opt.isCorrect) {
                                        optionStyle = {...optionStyle, ...styles.quizOptionCorrect};
                                    } else if (isSelected) {
                                        optionStyle = {...optionStyle, ...styles.quizOptionIncorrect};
                                    }
                                } else {
                                     if (isSelected) {
                                        optionStyle = {...optionStyle, ...styles.quizOptionSelected};
                                    }
                                }
                                return (
                                    <button key={idx} onClick={() => handleSelectAnswer(q.id, opt)} disabled={isQuizCompleted} style={optionStyle} className="quiz-option button-pop">
                                        {opt.text}
                                    </button>
                                );
                            })}
                        </div>
                        {isQuizCompleted && (
                            <div 
                              className={feedbackAnimation[q.id]}
                              style={{...styles.feedbackBox, border: `1px solid ${isAnswerCorrect ? 'var(--color-success)' : 'var(--color-error)'}`}}
                            >
                                <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                                    {isAnswerCorrect ? <CheckCircleIcon style={{ color: 'var(--color-success)', height: '1.25rem', width: '1.25rem', flexShrink: 0, marginTop: '2px'}}/> : <XCircleIcon style={{ color: 'var(--color-error)', height: '1.25rem', width: '1.25rem', flexShrink: 0, marginTop: '2px' }}/>}
                                    <p style={{color: 'var(--color-text-primary)'}}><span style={{fontWeight: 600, color: isAnswerCorrect ? 'var(--color-success)' : 'var(--color-error)'}}>{isAnswerCorrect ? 'Correcto. ' : 'Incorrecto. '}</span>{q.explanation}</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
            {!isQuizCompleted && (
                 <div style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={checkQuizAnswers}
                        disabled={!allQuestionsAnswered}
                        style={{...styles.primaryButton, opacity: !allQuestionsAnswered ? 0.5 : 1, cursor: !allQuestionsAnswered ? 'not-allowed' : 'pointer'}}
                        className="button-pop"
                    >
                        Revisar Respuestas
                    </button>
                </div>
            )}
            <style>{`
                .quiz-option:not(:disabled):hover { 
                    border-color: var(--color-border-glass);
                    background-color: var(--color-surface-glass-light);
                }
            `}</style>
        </div>
    );
  }

  return <div>Tipo de actividad no soportado.</div>;
};

const styles: { [key: string]: React.CSSProperties } = {
  spinnerDot: {
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '50%',
    display: 'inline-block',
  },
  activityTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
  },
  activityContent: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap',
  },
  iaButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1.5rem',
  },
  iaButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border-glass)',
    borderRadius: '0.75rem',
    color: 'var(--color-text-primary)',
    fontWeight: 600,
    cursor: 'pointer',
  },
  primaryButton: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.625rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
  },
  geminiContainer: {
    marginTop: '1rem',
    padding: '1rem',
    borderRadius: 'var(--border-radius)',
    backgroundColor: 'var(--color-surface-glass-light)',
    border: '1px solid var(--color-border-glass)',
  },
  geminiTitle: {
    fontWeight: 'bold',
    color: 'var(--color-accent)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  quizQuestionContainer: {
    padding: '1.5rem',
    backgroundColor: 'var(--color-surface-glass-light)',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--color-border-glass)',
  },
  quizOptionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem',
  },
  quizOptionButton: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '2px solid var(--color-border-glass)',
    backgroundColor: 'transparent',
    color: 'var(--color-text-primary)',
    width: '100%',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  quizOptionSelected: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    boxShadow: '0 0 0 2px rgba(138, 43, 226, 0.3)',
  },
  quizOptionCorrect: {
    borderColor: 'var(--color-success)',
    backgroundColor: 'rgba(50, 205, 50, 0.1)',
    color: 'var(--color-text-primary)',
    fontWeight: 600,
  },
  quizOptionIncorrect: {
    borderColor: 'var(--color-error)',
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    color: 'var(--color-text-primary)',
    fontWeight: 600,
  },
  feedbackBox: {
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: 'var(--color-surface-glass-light)',
  }
};


export default ActivityComponent;