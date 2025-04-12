import React, { useState } from "react";

interface Props {
  question: any;
  value: string;
  onChange: (val: string) => void;
}

const QuestionRadio: React.FC<Props> = ({ question, value, onChange }) => {
  const options = JSON.parse(question.options || "[]");

  const [selectedOption, setSelectedOption] = useState<string | null>(value);
  const [showAnswer, setShowAnswer] = useState(false)

  const handleOptionClick = (opt: string) => {
    setSelectedOption(opt);
    onChange(opt);
  };

  const toggleAnswer = () => {
    setShowAnswer(prevState => !prevState)
  };

  return (
    <div>
      <p className="my-3 font-medium text-base">{question.content}</p>
      <div className="grid grid-cols-1 gap-1 min-w-[300px]">
        {options.map((opt: string, index: number) => {
          const optionLabel = String.fromCharCode(65 + index); 
          return (
            <button
              key={opt}
              className={`w-full grid grid-cols-12 items-center text-left border h-[70px] cursor-pointer
                ${selectedOption === opt ? 'bg-[#fdfac7]' : 'bg-gray-100'} 
                text-gray-800 hover:bg-gray-200 border-gray-300`}
              onClick={() => handleOptionClick(opt)}
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

      <button
        onClick={toggleAnswer}
        className="mb-2 mt-4 border border-gray-300 text-gray800 font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm md:text-base cursor-pointer"
      >
        {showAnswer ? "Hide Key" : "Show Key"}
      </button>

      {showAnswer && (
        <div className="mt-4 p-2 bg-green-50 text-green-800 rounded">
          <p>The correct answer is: <span className="font-bold">{question.correct_answer}</span></p>
        </div>
      )}
    </div>
  );
};

export default QuestionRadio;
