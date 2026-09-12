export interface ChatbotMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const SUGGESTED_QUESTIONS = [
  "What foods should I avoid?",
  "Is morning sickness normal?",
  "What exercises are safe?",
  "How much water should I drink?",
];
