import React from 'react';
import { useAvatar } from '../contexts/AvatarContext';

const AvatarCompanion: React.FC = () => {
    const { avatarState } = useAvatar();

    const getEyePaths = () => {
        switch (avatarState) {
            case 'happy':
            case 'celebrating':
                return {
                    left: "M 8 12 Q 12 10 16 12",
                    right: "M 20 12 Q 24 10 28 12",
                };
            case 'sad':
                 return {
                    left: "M 8 12 Q 12 14 16 12",
                    right: "M 20 12 Q 24 14 28 12",
                };
            case 'thinking':
                 return {
                    left: "M 8 12 L 16 12",
                    right: "M 20 12 L 28 12",
                };
            case 'idle':
            default:
                return {
                    left: "M 10 12 A 2 2 0 1 1 14 12 A 2 2 0 1 1 10 12 Z",
                    right: "M 22 12 A 2 2 0 1 1 26 12 A 2 2 0 1 1 22 12 Z"
                };
        }
    };

    const eyePaths = getEyePaths();

    return (
        <>
            <div className={`avatar-container ${avatarState}`}>
                <svg viewBox="0 0 36 36" className="avatar-svg">
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <g className="avatar-body">
                         <circle cx="18" cy="18" r="14" fill="url(#avatar-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                        <path d={eyePaths.left} className="avatar-eye" fill={avatarState === 'idle' ? 'white' : 'none'} />
                        <path d={eyePaths.right} className="avatar-eye" fill={avatarState === 'idle' ? 'white' : 'none'} />
                        <circle cx="18" cy="18" r="1.5" fill="var(--color-primary)" className="avatar-glow" filter="url(#glow)"/>
                    </g>
                     <path d="M 12 28 Q 18 31 24 28" stroke="white" strokeWidth="1.5" fill="none" className="avatar-mouth" />
                     <circle cx="10" cy="5" r="2" fill="var(--color-accent)" className="avatar-light" />
                </svg>
            </div>
            <style>{`
                .avatar-container {
                    position: fixed;
                    bottom: 1rem;
                    right: 1rem;
                    width: 100px;
                    height: 100px;
                    z-index: 1000;
                    transition: transform 0.5s ease-in-out;
                }
                .avatar-svg {
                    width: 100%;
                    height: 100%;
                }
                .avatar-body {
                    animation: float 6s ease-in-out infinite;
                }
                .avatar-eye {
                    stroke: white;
                    stroke-width: 1.5;
                    transition: d 0.3s ease;
                }
                .avatar-mouth {
                    opacity: 0;
                    transform-origin: center;
                    transition: opacity 0.3s, transform 0.3s;
                }
                .avatar-light {
                    animation: blink 4s infinite;
                }
                .avatar-glow {
                     animation: pulse 4s infinite ease-in-out;
                }
                
                /* States */
                .avatar-container.thinking .avatar-body { animation-duration: 2s; }
                .avatar-container.happy .avatar-mouth,
                .avatar-container.celebrating .avatar-mouth { opacity: 1; transform: scaleY(1.2); }
                .avatar-container.sad .avatar-body { transform: translateY(5px); animation: none; }
                .avatar-container.celebrating { animation: celebrate 1.5s ease-in-out 2; }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.7; }
                }
                 @keyframes celebrate {
                    0%, 100% { transform: rotate(0) scale(1); }
                    25% { transform: rotate(15deg) scale(1.1); }
                    75% { transform: rotate(-15deg) scale(1.1); }
                }
            `}</style>
             <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <radialGradient id="avatar-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{stopColor: 'rgba(138, 43, 226, 0.5)'}} />
                        <stop offset="100%" style={{stopColor: 'rgba(40, 30, 70, 0.9)'}} />
                    </radialGradient>
                </defs>
            </svg>
        </>
    );
};

export default AvatarCompanion;