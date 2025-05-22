export type grouped_questions = {
  [part: string]: {
    id: number;
    prompt: string;
    from_name?: string | null;
    note?: string | null;
    word_limit: string;
    answer_type: 'short_text' | 'paragraph' | 'email';
  }[];
};
