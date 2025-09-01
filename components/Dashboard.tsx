import React, { useState, useEffect } from 'react';
import { Module, ProgressData } from '../types';
import ModuleView from './ModuleView';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { AwardIcon } from './icons/AwardIcon';
import { modules } from '../data/moduleData'; 
import { getProgressData } from '../utils/progress';
import { exportProgressToPDF } from '../utils/pdfGenerator';
import { useGamification } from '../contexts/GamificationContext';
import BadgesModal from './BadgesModal';
import { LEVELS } from '../utils/gamification';

const Dashboard: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [progressData, setProgressData] = useState<ProgressData>(getProgressData());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const { userProfile } = useGamification();

  useEffect(() => {
    const handleStorageChange = () => {
      setProgressData(getProgressData());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  if (!userProfile) return null; // Should not happen if logic is correct

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
  };
  
  const handleBackToDashboard = () => {
      setSelectedModule(null);
      setProgressData(getProgressData());
  }
  
  const handleExportClick = async () => {
      setIsGeneratingPDF(true);
      try {
          await exportProgressToPDF(userProfile, progressData);
      } catch (error) {
          console.error("Failed to generate PDF:", error);
          alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.");
      } finally {
          setIsGeneratingPDF(false);
      }
  };

  const calculateModuleProgress = (moduleId: string, activitiesCount: number): number => {
    if (!progressData[moduleId] || activitiesCount === 0) return 0;
    const completedCount = progressData[moduleId].completedActivities?.length || 0;
    return Math.round((completedCount / activitiesCount) * 100);
  };
  
  const currentLevel = LEVELS.find(l => l.name === userProfile.level)!;
  const currentLevelIndex = LEVELS.findIndex(l => l.name === userProfile.level);
  const nextLevel = LEVELS[currentLevelIndex + 1];
  
  const xpForNextLevel = nextLevel ? nextLevel.minPoints - currentLevel.minPoints : 0;
  const xpInCurrentLevel = userProfile.points - currentLevel.minPoints;
  const xpProgressPercent = nextLevel ? Math.round((xpInCurrentLevel / xpForNextLevel) * 100) : 100;

  if (selectedModule) {
    return <ModuleView module={selectedModule} onBack={handleBackToDashboard} />;
  }

  return (
    <>
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Hola, {userProfile.name.split(' ')[0]}!</h1>
            <p style={styles.subtitle}>Listo/a para dominar los logaritmos?</p>
          </div>
        </div>
        
        {/* Gamification Card */}
        <div style={styles.gamificationCard}>
            <div style={{flex: '1 1 300px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span style={styles.levelIcon}>{currentLevel.icon}</span>
                    <div>
                        <h3 style={styles.levelTitle}>{userProfile.level}</h3>
                        <p style={styles.pointsText}>{userProfile.points} XP</p>
                    </div>
                </div>
                <div style={styles.xpBarContainer}>
                    <div style={{ ...styles.xpBar, width: `${xpProgressPercent}%` }}></div>
                </div>
                <p style={styles.xpText}>
                    {nextLevel ? `${nextLevel.minPoints - userProfile.points} XP para el siguiente nivel` : '¡Nivel máximo alcanzado!'}
                </p>
            </div>
            <div style={{flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                <button onClick={() => setIsBadgesModalOpen(true)} style={styles.actionButton} className="button-pop">
                    <AwardIcon style={{height: '1.25rem', width: '1.25rem'}} /> Mis Insignias
                </button>
                <button onClick={handleExportClick} disabled={isGeneratingPDF} style={{...styles.actionButton, opacity: isGeneratingPDF ? 0.6 : 1}} className="button-pop">
                    <DownloadIcon style={{ height: '1.25rem', width: '1.25rem' }}/> {isGeneratingPDF ? 'Generando...' : 'Exportar Progreso'}
                </button>
            </div>
        </div>
        
        <div style={styles.infoCard}>
          <h2 style={styles.infoCardTitle}>Guía Pedagógica</h2>
          <div style={styles.infoGrid}>
              <div style={styles.infoGridItem}>
                  <h3 style={styles.infoHeading}>Objetivo General</h3>
                  <p style={styles.infoText}>Resolver problemas aplicando las propiedades de los logaritmos, fortaleciendo el razonamiento matemático.</p>
              </div>
              <div style={styles.infoGridItem}>
                  <h3 style={styles.infoHeading}>Contenidos Clave</h3>
                  <p style={styles.infoText}>Definición, propiedades, cambio de base, logaritmos comunes y naturales, y resolución de ecuaciones.</p>
              </div>
              <div style={styles.infoGridItem}>
                  <h3 style={styles.infoHeading}>Curso</h3>
                  <p style={styles.infoText}>3º Medio, sistema educacional chileno.</p>
              </div>
              <div style={styles.infoGridItem}>
                  <h3 style={styles.infoHeading}>Habilidades del Siglo XXI</h3>
                  <p style={styles.infoText}>Pensamiento Crítico y Responsabilidad Individual al autoevaluar tu propio aprendizaje.</p>
              </div>
          </div>
        </div>


        <div style={styles.card}>
          <h2 style={styles.modulesTitle}>Módulos de aprendizaje</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {modules.map(module => {
              const progress = calculateModuleProgress(module.id, module.activities.length);
              return (
                <div 
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  style={styles.moduleItem}
                  className="card-lift"
                >
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={styles.moduleItemTitle}>{module.title}</h3>
                    <p style={styles.moduleItemDesc}>{module.description}</p>
                    <div style={styles.moduleProgressBarContainer}>
                      <div style={{...styles.moduleProgressBar, width: `${progress}%` }}></div>
                    </div>
                    <p style={styles.progressText}>{progress}% completado</p>
                  </div>
                  <ChevronRightIcon style={styles.chevronIcon} className="chevron-icon" />
                </div>
              );
            })}
          </div>
        </div>
        <style>{`
          .card-lift:hover .chevron-icon {
            transform: translateX(4px);
            color: var(--color-primary);
          }
        `}</style>
      </div>
      {isBadgesModalOpen && <BadgesModal onClose={() => setIsBadgesModalOpen(false)} />}
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: '1.125rem',
    color: 'var(--color-text-secondary)',
    marginTop: '0.25rem',
  },
  gamificationCard: {
    backgroundColor: 'var(--color-surface-glass)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-md)',
    padding: '1.5rem',
    border: '1px solid var(--color-border-glass)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.5rem',
  },
  levelIcon: {
      fontSize: '2.5rem',
  },
  levelTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: 'var(--color-text-primary)',
  },
  pointsText: {
      fontSize: '1rem',
      fontWeight: 600,
      color: 'var(--color-accent)',
  },
  xpBarContainer: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '9999px',
    height: '0.75rem',
    marginTop: '0.75rem',
    overflow: 'hidden'
  },
  xpBar: {
    backgroundColor: 'var(--color-accent)',
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.5s ease-in-out',
    boxShadow: '0 0 10px var(--color-accent)',
  },
  xpText: {
      fontSize: '0.8rem',
      color: 'var(--color-text-secondary)',
      marginTop: '0.3rem'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    minWidth: '180px',
    padding: '0.6rem 1rem',
    backgroundColor: 'var(--color-surface-glass-light)',
    border: '1px solid var(--color-border-glass)',
    borderRadius: '0.75rem',
    color: 'var(--color-text-primary)',
    fontWeight: 600,
    cursor: 'pointer',
  },
  infoCard: {
    backgroundColor: 'var(--color-surface-glass)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-md)',
    padding: '1.5rem',
    border: '1px solid var(--color-border-glass)',
  },
  infoCardTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: 'var(--color-text-primary)',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid var(--color-border-glass)'
  },
  infoGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
  },
  infoGridItem: {
    flex: '1 1 250px',
  },
  infoHeading: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-accent)',
    marginBottom: '0.25rem'
  },
  infoText: {
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
  },
  card: {
    backgroundColor: 'var(--color-surface-glass)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-md)',
    padding: '1.5rem',
    border: '1px solid var(--color-border-glass)',
  },
  modulesTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1rem'
  },
  moduleItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'var(--color-surface-glass-light)',
    padding: '1.5rem',
    borderRadius: 'var(--border-radius)',
    border: '1px solid transparent',
    cursor: 'pointer',
  },
  moduleItemTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
  moduleItemDesc: {
    color: 'var(--color-text-secondary)',
    marginTop: '0.25rem',
  },
  moduleProgressBarContainer: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '9999px',
    height: '0.625rem',
    marginTop: '1rem',
    overflow: 'hidden'
  },
  moduleProgressBar: {
    backgroundColor: 'var(--color-primary)',
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.5s ease-in-out',
  },
  progressText: {
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
    marginTop: '0.5rem'
  },
  chevronIcon: {
    height: '1.75rem',
    width: '1.75rem',
    color: 'var(--color-text-secondary)',
    transition: 'transform 0.2s, color 0.2s',
    flexShrink: 0,
    marginLeft: '1rem'
  }
};

export default Dashboard;