import React, { useState, useEffect } from 'react';
import { Module } from '../types';
import ActivityComponent from './ActivityComponent';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { getProgressData, saveProgressData } from '../utils/progress';
import { useAvatar } from '../contexts/AvatarContext';


interface ModuleViewProps {
  module: Module;
  onBack: () => void;
}

const ModuleView: React.FC<ModuleViewProps> = ({ module, onBack }) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(() => {
    const progress = getProgressData();
    return new Set(progress[module.id]?.completedActivities || []);
  });
  const { setAvatarState } = useAvatar();

  useEffect(() => {
    const progress = getProgressData();
    if (!progress[module.id]) {
      progress[module.id] = { completedActivities: [], answers: {} };
    }
    progress[module.id].completedActivities = Array.from(completedActivities);
    saveProgressData(progress);
    window.dispatchEvent(new Event('storage'));
  }, [completedActivities, module.id]);
  
  const isModuleCompleted = completedActivities.size === module.activities.length;
  useEffect(() => {
      if(isModuleCompleted) {
          setAvatarState('celebrating');
      }
  }, [isModuleCompleted, setAvatarState]);

  const currentActivity = module.activities[currentActivityIndex];
  const progressPercent = (completedActivities.size / module.activities.length) * 100;

  const handleCompleteActivity = () => {
    setCompletedActivities(prev => new Set(prev).add(currentActivity.id));
    if(currentActivityIndex < module.activities.length - 1){
        setCurrentActivityIndex(i => i + 1);
    }
  };

  const goToNext = () => {
    if (currentActivityIndex < module.activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
    }
  };

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} style={styles.backButton} className="back-button">
        <ArrowLeftIcon style={{ height: '1.25rem', width: '1.25rem' }} />
        Volver al Dashboard
      </button>

      <div style={styles.card}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>{module.title}</h1>
            <p style={styles.subtitle}>Actividad {currentActivityIndex + 1} de {module.activities.length}</p>
          </div>
          <div style={styles.progressBarContainer}>
            <div 
              style={{ ...styles.progressBar, width: `${progressPercent}%` }}
            ></div>
          </div>
        </header>

        <div style={{ padding: '0 1.5rem 1.5rem' }}>
            <ActivityComponent 
                key={currentActivity.id} 
                activity={currentActivity}
                moduleId={module.id}
                onComplete={handleCompleteActivity}
            />
        </div>

        <footer style={styles.footer}>
          <button
            onClick={goToPrev}
            disabled={currentActivityIndex === 0}
            style={{...styles.navButton, ...styles.prevButton, opacity: currentActivityIndex === 0 ? 0.5 : 1}}
            className="button-pop"
          >
            <ArrowLeftIcon style={{ height: '1.25rem', width: '1.25rem' }} />
            Anterior
          </button>
          
          {completedActivities.has(currentActivity.id) && currentActivityIndex < module.activities.length - 1 && (
             <button
                onClick={goToNext}
                style={{...styles.navButton, ...styles.nextButton}}
                className="button-pop"
             >
                Siguiente
                <ArrowRightIcon style={{ height: '1.25rem', width: '1.25rem' }} />
             </button>
          )}

          {currentActivityIndex === module.activities.length - 1 && completedActivities.has(currentActivity.id) &&(
              <div style={styles.completionMessage}>
                <CheckCircleIcon style={{ height: '1.5rem', width: '1.5rem' }}/>
                ¡Módulo completado!
              </div>
          )}
        </footer>
      </div>
      <style>{`
        .back-button:hover {
          color: var(--color-primary);
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    marginBottom: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  card: {
    backgroundColor: 'var(--color-surface-glass)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
    border: '1px solid var(--color-border-glass)'
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border-glass)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '9999px',
    height: '0.625rem',
    marginTop: '1rem',
    overflow: 'hidden'
  },
  progressBar: {
    backgroundColor: 'var(--color-primary)',
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.5s ease-in-out',
  },
  footer: {
    marginTop: '1rem',
    padding: '1.5rem',
    borderTop: '1px solid var(--color-border-glass)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1.25rem',
    borderRadius: '0.75rem',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
  },
  prevButton: {
    backgroundColor: 'var(--color-surface-glass-light)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border-glass)',
  },
  nextButton: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
  },
  completionMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--color-success)',
    fontWeight: 600,
    fontSize: '1rem'
  }
};


export default ModuleView;