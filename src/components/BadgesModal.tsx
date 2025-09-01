import React from 'react';
import { useGamification } from '../contexts/GamificationContext';
import { BADGES } from '../utils/gamification';
import { XCircleIcon } from './icons/XCircleIcon';

interface BadgesModalProps {
  onClose: () => void;
}

const BadgesModal: React.FC<BadgesModalProps> = ({ onClose }) => {
  const { userProfile } = useGamification();

  if (!userProfile) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()} className="animate-fade-in">
        <button onClick={onClose} style={styles.closeButton} className="button-pop">
          <XCircleIcon style={{ width: '1.5rem', height: '1.5rem' }} />
        </button>
        <h2 style={styles.title}>Mis Insignias</h2>
        <p style={styles.subtitle}>¡Colecciónalas todas y demuestra tu maestría!</p>
        <div style={styles.grid}>
          {BADGES.map(badge => {
            const isUnlocked = userProfile.unlockedBadges.includes(badge.id);
            return (
              <div key={badge.id} style={{ ...styles.badgeCard, opacity: isUnlocked ? 1 : 0.5 }}>
                <span style={{ ...styles.badgeIcon, filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>
                  {badge.icon}
                </span>
                <h3 style={styles.badgeName}>{badge.name}</h3>
                <p style={styles.badgeDesc}>{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 20, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    backgroundColor: 'var(--color-surface-glass)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow-md)',
    padding: '2rem',
    border: '1px solid var(--color-border-glass)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
  },
  subtitle: {
    textAlign: 'center',
    color: 'var(--color-text-secondary)',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1.5rem',
  },
  badgeCard: {
    backgroundColor: 'var(--color-surface-glass-light)',
    borderRadius: 'var(--border-radius)',
    padding: '1.5rem 1rem',
    textAlign: 'center',
    border: '1px solid var(--color-border-glass)',
    transition: 'opacity 0.3s',
  },
  badgeIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '0.5rem',
  },
  badgeName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
  },
  badgeDesc: {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    marginTop: '0.25rem',
  },
};

export default BadgesModal;