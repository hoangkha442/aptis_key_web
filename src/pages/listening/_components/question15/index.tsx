import React, { useState } from "react";
import { Select, Button, message } from "antd";

interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const Question15: React.FC<Props> = ({ questions, answers, onChange }) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const handleSelectChange = (id: number, value: string) => {
    onChange(id, value);
  };

  return (
    <div>
      <button className="cursor-pointer text-gray-900 font-medium" onClick={() => { message.warning('Tính năng chưa phát triển!') }}>
        Play/Stop (1 times left)
      </button>
      <p className="text-gray-900 font-medium">{questions[0]?.description}</p>

      <div className="flex flex-col gap-3 mt-3">
        {questions.map((question, index) => {
          const options = JSON.parse(question.options || "[]");

          return (
            <div key={question.listening_test_items_id} className="flex items-center flex-wrap gap-5">
              <p className=" font-medium text-gray-900">{index + 1}. {question.content}</p>
              <Select
                value={answers[question.listening_test_items_id] || ""}
                onChange={(value) => handleSelectChange(question.listening_test_items_id, value)}
                className="mt-2"
                placeholder="Chọn một đáp án"
              >
                <Select.Option value="">Chọn một đáp án</Select.Option>
                {options.map((opt: string) => (
                  <Select.Option key={opt} value={opt}>
                    {opt}
                  </Select.Option>
                ))}
              </Select>
            </div>
          );
        })}
      </div>

      <Button
        className="mb-2 mt-4 border border-gray-300 text-gray-800 font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm md:text-base"
        onClick={() => setShowTranscript(!showTranscript)}
      >
        {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
        <br />
      </Button>

      {showTranscript && (
        <div className="mt-4 p-2 text-gray-900 font-medium">
          <p className="mb-3">Topic: {questions[0]?.topic}</p>
          <p>Đoạn đối thoại của 2 người (Man - Woman):</p>
          {questions.map((question) => (
            <div className="mt-4 flex flex-col gap-2 font-normal" key={question.listening_test_items_id}>
              <p
                dangerouslySetInnerHTML={{ __html: question.script }} // Hiển thị HTML từ script
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question15;
