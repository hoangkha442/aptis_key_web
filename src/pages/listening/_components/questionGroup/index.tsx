import React, { useState } from "react";

interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const QuestionGroup: React.FC<Props> = ({ questions, answers, onChange }) => {
  console.log('questions: ', questions);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const handleOptionClick = (id: number, opt: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [id]: opt,
    }));
    onChange(id, opt);
  };

  return (
    <div>
      <p className="text-gray-900 font-medium">{questions[0]?.description}</p>
      {questions.map((question) => {
        const options = JSON.parse(question.options || "[]");

        return (
          <div
            key={question.listening_test_items_id}
            
          >
            <p className="my-3 font-medium text-base">{question.content}</p>
            <div className="grid grid-cols-1 gap-1 min-w-[300px]">
              {options.map((opt: string, idx: number) => {
                const optionLabel = String.fromCharCode(65 + idx);
                return (
                  <button
                    key={opt}
                    className={`w-full grid grid-cols-12 items-center text-left border h-[70px] cursor-pointer
                      ${selectedOptions[question.listening_test_items_id] === opt ? 'bg-[#fdfac7]' : 'bg-gray-100'} 
                      text-gray-800 hover:bg-gray-200 border-gray-300`}
                    onClick={() => handleOptionClick(question.listening_test_items_id, opt)}
                  >
                    <div className="col-span-2 flex justify-center items-center border-r border-gray-300 bg-white h-full">
                      <span className="font-bold text-lg p-2">{optionLabel}</span>
                    </div>
                    <div className="col-span-10 ml-4 pr-4">
                      <span className="text-base normal-case">{opt}</span> 
                    </div>
                  </button>
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
