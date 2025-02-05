export interface Country {
  code: string;
  name: string;
  emoji: string;
  capital?: string;
  currency?: string;
  languages: Language[];
  continent: {
    name: string;
  };
  phone?: string;
}

export interface Language {
  name: string;
  native: string;
}

export interface Message {
  role: "assistant" | "user";
  content: string;
}

export interface ChatConfig {
  model: string;
  temperature: number;
  top_p: number;
  max_tokens: number;
}
