import React from "react";

interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const QuestionGroup: React.FC<Props> = ({ questions, answers, onChange }) => {
  return (
    <div>
      {questions.map((question) => {
        const options = JSON.parse(question.options || "[]");

        return (
          <div
            key={question.listening_test_items_id}
            className="border p-4 rounded bg-white shadow-sm mb-6"
          >
            <p className="font-semibold">{question.content}</p>

            <div className="mt-2 space-y-2">
              {options.map((opt: string, idx: number) => {
                const label = String.fromCharCode(65 + idx);
                return (
                  <label
                    key={opt}
                    className={`block p-2 rounded border ${
                      answers[question.listening_test_items_id] === opt
                        ? "bg-blue-100 border-blue-400"
                        : "bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.listening_test_items_id}`}
                      className="mr-2"
                      checked={answers[question.listening_test_items_id] === opt}
                      onChange={() => onChange(question.listening_test_items_id, opt)}
                    />
                    <strong>{label}.</strong> <span className="ml-2">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionGroup;
