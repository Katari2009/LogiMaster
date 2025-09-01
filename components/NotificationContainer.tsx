import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';

const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  const getIcon = (type: string) => {
      switch(type) {
          case 'success': return <CheckCircleIcon style={{color: 'var(--color-success)'}}/>;
          case 'error': return <XCircleIcon style={{color: 'var(--color-error)'}}/>;
          case 'info':
          default:
              return <LightBulbIcon style={{color: 'var(--color-accent)'}}/>;
      }
  }

  return (
    <>
      <div style={styles.container}>
        {notifications.map(notification => (
          <div key={notification.id} style={styles.notification} className="notification-item">
            <div style={styles.iconWrapper}>{getIcon(notification.type)}</div>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-item {
            animation: slideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      `}</style>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    top: '5rem',
    right: '1rem',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  notification: {
    minWidth: '280px',
    maxWidth: '320px',
    backgroundColor: 'var(--color-surface-glass)',
    backdropFilter: 'blur(10px)',
    borderRadius: '0.75rem',
    boxShadow: 'var(--shadow-md)',
    padding: '1rem',
    border: '1px solid var(--color-border-glass)',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  iconWrapper: {
      flexShrink: 0
  }
};

export default NotificationContainer;
