// src/pages/Reading/_components/question4.tsx
import { Radio } from "antd";

type Paragraph = {
  id: string; // A, B, C, D
  text: string;
};

type Question = {
  reading_part_4_id: number;
  content: string;
  options: string[]; // ["A", "B", "C", "D"]
  correct_answer: string;
};

type Props = {
  paragraphs: Paragraph[];
  questions: Question[];
  answers: { [id: number]: string };
  onChange: (id: number, value: string) => void;
};

export default function Question4({ paragraphs, questions, answers, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Đọc các đoạn văn sau:</h3>
        {paragraphs.map((p) => (
          <div key={p.id} className="border p-4 rounded bg-white shadow-sm">
            <p className="font-bold mb-1">Đoạn {p.id}</p>
            <p>{p.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6">
        <h3 className="font-semibold text-lg">Chọn đoạn văn phù hợp với mỗi câu hỏi:</h3>
        {questions.map((q) => (
          <div key={q.reading_part_4_id} className="border-b pb-4">
            <p className="mb-2">{q.content}</p>
            <Radio.Group
              value={answers[q.reading_part_4_id] || null}
              onChange={(e) => onChange(q.reading_part_4_id, e.target.value)}
            >
              {q.options.map((opt) => (
                <Radio key={opt} value={opt}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        ))}
      </div>
    </div>
  );
}
