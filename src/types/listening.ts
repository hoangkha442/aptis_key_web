// types.ts
export interface ListeningQuestion {
    listening_test_items_id: number;
    question_number: string;
    tittle: string;
    description: string;
    content: string;
    correct_answer: string;
    options: string;
    script: string;
    topic: string;
    hidden_correct_aswer: boolean;
  }
  
  export interface ListeningTestData {
    listening_test_id: number;
    key_test: string;
    tittle: string;
    description: string;
    duration: number;
    listening_test_items: {
      [key: string]: ListeningQuestion[];
    };
  }
  