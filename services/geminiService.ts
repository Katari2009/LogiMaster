
import { GoogleGenAI, Type } from "@google/genai";
import { PracticeProblem } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateExplanation = async (topic: string, currentExplanation: string): Promise<string> => {
    try {
        const prompt = `Eres un profesor de matemáticas experto y amigable. Explica el concepto de "${topic}" para un estudiante de secundaria en Chile. Usa un enfoque diferente al siguiente para no repetirte: "${currentExplanation}". Sé claro, conciso y utiliza una analogía o ejemplo práctico.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating explanation:", error);
        return "Hubo un error al generar la explicación. Por favor, intenta de nuevo.";
    }
};

export const generatePracticeProblem = async (topic: string): Promise<PracticeProblem | string> => {
    try {
        const prompt = `Genera un problema práctico de opción múltiple sobre "${topic}" para un estudiante de secundaria. Proporciona el problema, cuatro opciones (una correcta) y una explicación detallada de la solución. Asegúrate de que las opciones sean plausibles.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        problem: { type: Type.STRING, description: "El enunciado del problema." },
                        options: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    text: { type: Type.STRING, description: "El texto de la opción." },
                                    isCorrect: { type: Type.BOOLEAN, description: "Si la opción es la correcta." }
                                },
                                required: ["text", "isCorrect"]
                            },
                            description: "Un array de 4 objetos de opción."
                        },
                        solution: { type: Type.STRING, description: "La explicación paso a paso de la solución." }
                    },
                    required: ["problem", "options", "solution"]
                }
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as PracticeProblem;

    } catch (error) {
        console.error("Error generating practice problem:", error);
        return "No se pudo generar un problema de práctica. Inténtalo de nuevo.";
    }
};
