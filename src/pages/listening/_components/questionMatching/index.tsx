import React, { useState } from "react";
import { Select, message } from "antd";

interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const QuestionMatchingGroup: React.FC<Props> = ({ questions, answers, onChange }) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const addExtraAnswers = (options: string[]) => {
    // Tạo thêm 2 đáp án sai, đảm bảo mỗi đáp án có key khác biệt
    return [
      ...options,
      "X (wrong answer 1)",
      "X (wrong answer 2)",
    ];
  };

  const handleSelectChange = (id: number, value: string) => {
    onChange(id, value);
  };

  return (
    <div>
      <p className="text-gray-900 font-medium">{questions[0]?.content}</p>
      <button className="cursor-pointer text-gray-900 font-medium" onClick={() => { message.warning('Tính năng chưa phát triển!') }}>
        Play/Stop (1 times left)
      </button>

      <div className="flex flex-col gap-5 mt-3">
        {questions.map((question) => {
          const options = JSON.parse(question.options || "[]");
          const updatedOptions = addExtraAnswers(options);

          return (
            <div key={question.listening_test_items_id} className="flex items-center flex-wrap">
              <p className="w-1/3 font-medium text-gray-900">{question.description}</p>
              <Select
                value={answers[question.listening_test_items_id] || ""}
                onChange={(value) => handleSelectChange(question.listening_test_items_id, value)}
                className="mt-2 w-2/3"
                placeholder="Chọn một đáp án"
              >
                <Select.Option value="">Chọn một đáp án</Select.Option>
                {updatedOptions.map((opt: string, index: number) => (
                  <Select.Option key={`${opt}-${index}`} value={opt}> {/* Sử dụng index để đảm bảo key duy nhất */}
                    {opt}
                  </Select.Option>
                ))}
              </Select>
            </div>
          );
        })}
      </div>

      <button
        className="mb-2 mt-4 border border-gray-300 text-gray-800 font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm md:text-base cursor-pointer"
        onClick={() => setShowTranscript(!showTranscript)}
      >
        {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
      </button>

      {showTranscript && (
        <div className="mt-4 p-2 text-gray-900 font-medium">
          <p className="mb-3">Topic: {questions[0]?.topic}</p>
          <p>*Đoạn recordings của 4 người:</p>
          {questions.map((question) => (
            <div className="mt-4 flex flex-col gap-2 font-normal" key={question.listening_test_items_id}>
              <p>{question.script}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionMatchingGroup;
