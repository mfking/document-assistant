export type Actor = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  type: Actor;
  content: string;
  timestamp: string;
}
