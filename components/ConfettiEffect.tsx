import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div style={{...styles.confettiPiece, ...style}}></div>
);

const ConfettiEffect: React.FC = () => {
    const { isConfettiActive } = useNotification();
    if (!isConfettiActive) return null;

    const confetti = Array.from({ length: 50 }).map((_, index) => {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            transform: `rotate(${Math.random() * 360}deg)`
        };
        return <ConfettiPiece key={index} style={style} />;
    });

    return (
        <>
            <div style={styles.confettiContainer}>
                {confetti}
            </div>
            <style>{`
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-100vh) rotateZ(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotateZ(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
  confettiContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 9999,
  },
  confettiPiece: {
    position: 'absolute',
    width: '10px',
    height: '20px',
    opacity: 0,
    animation: 'confetti-fall 3s linear forwards',
  },
};

export default ConfettiEffect;
