
import React, { useState } from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { UserIcon } from './icons/UserIcon';
import { useGamification } from '../contexts/GamificationContext';
import { StarIcon } from './icons/StarIcon';
import { RefreshIcon } from './icons/RefreshIcon';

const Header: React.FC = () => {
  const { userProfile, resetGamificationProgress } = useGamification();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  if (!userProfile) return null;

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      resetGamificationProgress();
    }
    setIsMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.logoContainer}>
          <BookOpenIcon style={{ height: '2rem', width: '2rem', color: 'var(--color-primary)' }} />
          <h1 style={styles.logoText}>LogiMaster</h1>
        </div>
        <div style={styles.profileContainer}>
            <div style={{...styles.gamificationInfo, ...{display: 'none'} }}>
                <div style={styles.levelInfo}>{userProfile.level}</div>
                <div style={styles.pointsInfo}><StarIcon style={{width: '1rem', height: '1rem'}}/> {userProfile.points}</div>
            </div>
          <div style={{ textAlign: 'right' }}>
            <p style={styles.profileName}>{userProfile.name}</p>
            <p style={styles.profileCourse}>{userProfile.course}</p>
          </div>
          <div style={{position: 'relative'}}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={styles.profilePicWrapper}>
              {userProfile.profilePic ? (
                <img src={userProfile.profilePic} alt="Perfil" style={styles.profilePicImage} />
              ) : (
                <UserIcon style={{ width: '1.75rem', height: '1.75rem', color: 'var(--color-text-secondary)' }} />
              )}
            </button>
             {isMenuOpen && (
              <div style={styles.dropdownMenu}>
                <button onClick={handleReset} style={styles.menuButton}>
                  <RefreshIcon style={{width: '1rem', height: '1rem'}}/> Reiniciar Progreso
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
          @media (min-width: 640px) {
            .gamification-info {
                display: flex !important;
            }
          }
      `}</style>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        backgroundColor: 'var(--color-surface-glass)',
        backdropFilter: 'saturate(180%) blur(10px)',
        boxShadow: 'var(--shadow-md)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid var(--color-border-glass)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
    },
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    gamificationInfo: {
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'var(--color-surface-glass-light)',
        padding: '0.25rem 0.75rem',
        borderRadius: '99px',
        border: '1px solid var(--color-border-glass)',
    },
    levelInfo: {
        fontWeight: 600,
        fontSize: '0.8rem',
        color: 'var(--color-text-primary)'
    },
    pointsInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontWeight: 600,
        fontSize: '0.8rem',
        color: 'var(--color-accent)',
        paddingLeft: '0.5rem',
        borderLeft: '1px solid var(--color-border-glass)'
    },
    profileName: {
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        fontSize: '0.95rem'
    },
    profileCourse: {
        fontSize: '0.8rem',
        color: 'var(--color-text-secondary)',
    },
    profilePicWrapper: {
        width: '2.75rem',
        height: '2.75rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        border: '2px solid var(--color-border-glass)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        padding: 0,
    },
    profilePicImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    dropdownMenu: {
        position: 'absolute',
        right: 0,
        top: '120%',
        backgroundColor: 'var(--color-surface-glass)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border-glass)',
        overflow: 'hidden',
        width: '180px',
        zIndex: 20
    },
    menuButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'none',
        border: 'none',
        color: 'var(--color-text-primary)',
        padding: '0.75rem 1rem',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
    }
};

export default Header;