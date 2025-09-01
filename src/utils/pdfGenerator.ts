import jsPDF from 'jspdf';
import { UserProfile, ProgressData, QuizQuestion } from '../types';
import { modules } from '../data/moduleData';

export const exportProgressToPDF = async (userProfile: UserProfile, progressData: ProgressData) => {
  const doc = new jsPDF();
  const margin = 15;
  let yPos = 20;

  const addText = (text: string, x: number, y: number, options = {}) => {
    // Wrapper to handle page breaks
    const splitText = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2);
    const textHeight = doc.getTextDimensions(splitText).h;
    if (y + textHeight > doc.internal.pageSize.height - 20) {
      doc.addPage();
      yPos = 20;
      y = yPos;
    }
    doc.text(splitText, x, y, options);
    return y + textHeight;
  };

  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  yPos = addText('LogiMaster: Reporte de Progreso', margin, yPos);
  yPos += 5;

  // User Info
  const now = new Date();
  const date = now.toLocaleDateString('es-CL');
  const time = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  yPos = addText(`Nombre: ${userProfile.name}`, margin, yPos);
  yPos = addText(`Curso: ${userProfile.course}`, margin, yPos);
  yPos = addText(`Fecha de Exportación: ${date} ${time}`, margin, yPos);
  yPos += 10;
  
  // Progress Summary
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  yPos = addText('Resumen de Progreso', margin, yPos);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos - 3, doc.internal.pageSize.width - margin, yPos - 3);
  yPos += 5;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  modules.forEach(module => {
    const moduleProgress = progressData[module.id];
    const completedCount = moduleProgress?.completedActivities?.length || 0;
    const totalActivities = module.activities.length;
    const percentage = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

    doc.setFont('helvetica', 'bold');
    yPos = addText(`${module.title}: ${percentage}% completado`, margin, yPos);
    yPos += 2;
    
    doc.setFont('helvetica', 'normal');
    if(moduleProgress?.answers) {
        Object.entries(moduleProgress.answers).forEach(([activityId, answerData]) => {
            const activity = module.activities.find(a => a.id === activityId);
            if (!activity || !activity.questions) return;
            
            yPos = addText(`  Respuestas en "${activity.title}":`, margin + 5, yPos);
            
            activity.questions.forEach((q: QuizQuestion) => {
                const userAnswerText = answerData[q.id] || 'Sin responder';
                const correctOption = q.options.find(o => o.isCorrect);
                const isCorrect = userAnswerText === correctOption?.text;

                doc.setFontSize(10);
                yPos = addText(`    - ${q.question}`, margin + 10, yPos);
                
                const statusColor = isCorrect ? [0, 150, 0] : [200, 0, 0];
                doc.setTextColor(userAnswerText === 'Sin responder' ? 'gray' : statusColor[0], userAnswerText === 'Sin responder' ? 128 : statusColor[1], userAnswerText === 'Sin responder' ? 128 : statusColor[2]);
                yPos = addText(`      Tu respuesta: ${userAnswerText} ${isCorrect ? '(Correcta)' : '(Incorrecta)'}`, margin + 12, yPos);
                
                doc.setTextColor(0, 0, 0); // Reset color
            });
            yPos += 3;
        })
    }
    yPos += 8;
  });

  // Footer
  const pageCount = doc.internal.pages.length;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      'Creado por Christian Núñez Vega, Asesor Pedagógico, Programa PACE-UDA, 2025.',
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  doc.save(`progreso_${userProfile.name.replace(/ /g, '_')}.pdf`);
};