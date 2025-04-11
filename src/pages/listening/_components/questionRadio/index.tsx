import React from "react";

interface Props {
  question: any;
  value: string;
  onChange: (val: string) => void;
}

const QuestionRadio: React.FC<Props> = ({ question, value, onChange }) => {
  const options = JSON.parse(question.options || "[]");

  return (
    <div className="border p-4 rounded bg-white shadow-sm mb-6">
      <p className="font-semibold">{question.tittle}</p>
      {question.description && <p className="text-gray-600">{question.description}</p>}
      <p className="mt-3">{question.content}</p>

      <div className="mt-4 space-y-2">
        {options.map((opt: string) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name={`question-${question.listening_test_items_id}`}
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            <span className="ml-2">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionRadio;
