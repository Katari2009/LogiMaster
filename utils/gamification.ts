import { Level, Badge, ProgressData, UserProfile } from '../types';
import { modules } from '../data/moduleData';

export const POINTS_CONFIG = {
    CORRECT_ANSWER: 15,
    COMPLETE_EXPLANATION: 5,
};

export const LEVELS: Level[] = [
    { name: 'Novato Logarítmico', minPoints: 0, icon: '🌱' },
    { name: 'Aprendiz de Bases', minPoints: 100, icon: '📘' },
    { name: 'Calculista Ágil', minPoints: 250, icon: '🧮' },
    { name: 'Experto en Propiedades', minPoints: 500, icon: '📜' },
    { name: 'Maestro de Ecuaciones', minPoints: 800, icon: '🏆' },
    { name: 'Maestro Logarítmico', minPoints: 1200, icon: '👑' },
];

export const BADGES: Badge[] = [
    {
        id: 'primeros_pasos',
        name: 'Primeros Pasos',
        description: 'Completa tu primera actividad.',
        icon: '👟',
        condition: (profile, progress) => {
            return Object.values(progress).some(m => m.completedActivities.length > 0);
        }
    },
    {
        id: 'sabelotodo_modulo_1',
        name: 'Maestro del Módulo 1',
        description: 'Completa todas las actividades del módulo "La Función Logarítmica".',
        icon: '🏅',
        condition: (profile, progress) => {
            const module1 = modules.find(m => m.id === 'log-func-01');
            if (!module1 || !progress['log-func-01']) return false;
            return progress['log-func-01'].completedActivities.length === module1.activities.length;
        }
    },
    {
        id: 'sabelotodo_paes',
        name: 'Listo para la PAES',
        description: 'Completa el ensayo tipo PAES.',
        icon: '🚀',
        condition: (profile, progress) => {
            const paesModule = modules.find(m => m.id === 'paes-log-01');
            if (!paesModule || !progress['paes-log-01']) return false;
            return progress['paes-log-01'].completedActivities.length === paesModule.activities.length;
        }
    },
    {
        id: 'racha_10_correctas',
        name: 'Racha de 10',
        description: 'Responde correctamente a 10 preguntas de quiz en total.',
        icon: '🔥',
        condition: (profile, progress) => {
            let correctAnswers = 0;
            for (const modId in progress) {
                const module = modules.find(m => m.id === modId);
                if (!module) continue;

                for (const actId in progress[modId].answers) {
                    const activity = module.activities.find(a => a.id === actId);
                    if (!activity || activity.type !== 'quiz' || !activity.questions) continue;
                    
                    const userAnswers = progress[modId].answers[actId];
                    for(const qId in userAnswers) {
                        const question = activity.questions.find(q => q.id === qId);
                        const correctOption = question?.options.find(o => o.isCorrect);
                        if (userAnswers[qId] === correctOption?.text) {
                            correctAnswers++;
                        }
                    }
                }
            }
            return correctAnswers >= 10;
        }
    },
    {
        id: 'cerebrito',
        name: 'Cerebrito',
        description: 'Consigue 500 Puntos de Experiencia (XP).',
        icon: '🧠',
        condition: (profile, progress) => profile.points >= 500
    },
    {
        id: 'invencible',
        name: 'Invencible',
        description: 'Consigue 1000 Puntos de Experiencia (XP).',
        icon: '💥',
        condition: (profile, progress) => profile.points >= 1000
    }
];
