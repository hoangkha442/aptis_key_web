import React from "react";

interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const QuestionMatchingGroup: React.FC<Props> = ({ questions, answers, onChange }) => {
  return (
    <div>
      {questions.map((question) => {
        const options = JSON.parse(question.options || "[]");
        return (
          <div
            key={question.listening_test_items_id}
            className="border p-4 rounded bg-white shadow-sm mb-6"
          >
            <p className="font-semibold">{question.tittle}</p>
            <p className="text-gray-600">{question.description}</p>
            <p className="mt-3">{question.content}</p>

            <select
              value={answers[question.listening_test_items_id] || ""}
              onChange={(e) => onChange(question.listening_test_items_id, e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            >
              <option value="">Chọn một đáp án</option>
              {options.map((opt: string) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionMatchingGroup;
