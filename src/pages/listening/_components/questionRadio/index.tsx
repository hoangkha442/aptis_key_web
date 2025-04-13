import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface Props {
  question: any;
  value: string;
  onChange: (val: string) => void;
}

const QuestionRadio: React.FC<Props> = ({ question, value, onChange }) => {
  const options = JSON.parse(question.options || "[]");
  const isSubmitted = useSelector((state: RootState) => state.listeningUI.isSubmitted);
  const reviewAnswers = useSelector((state: RootState) => state.listeningUI.reviewAnswers);
  const thisReview = reviewAnswers.find((r) => r.questionId === String(question.listening_test_items_id));

  const handleOptionClick = (opt: string) => {
    if (!isSubmitted) {
      onChange(opt);
    }
  };

  return (
    <div>
      <p className="my-3 font-medium text-base">{question.content}</p>

      <div className="grid grid-cols-1 gap-1 min-w-[300px]">
        {options.map((opt: string, index: number) => {
          const optionLabel = String.fromCharCode(65 + index);

          const isUserChoice = opt === value;
          const isCorrect = opt === thisReview?.correctAnswer;

          let bgColor = "bg-gray-100";
          if (isSubmitted) {
            if (isUserChoice && isCorrect) bgColor = "bg-green-100"; // đúng
            else if (isUserChoice && !isCorrect) bgColor = "bg-red-100"; // sai
            else if (!isUserChoice && isCorrect) bgColor = "bg-green-50"; // hiển thị đáp án đúng nhẹ
          } else {
            if (isUserChoice) bgColor = "bg-[#fdfac7]";
          }

          return (
            <button
              key={opt}
              className={`w-full grid grid-cols-12 items-center text-left border h-[70px] cursor-pointer
                ${bgColor} text-gray-800 hover:bg-gray-200 border-gray-300`}
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

      {isSubmitted && !thisReview?.isCorrect && (
        <div className="mt-4 text-sm text-red-700">
          Đáp án đúng là: <span className="font-semibold">{thisReview?.correctAnswer}</span>
        </div>
      )}
    </div>
  );
};


export default QuestionRadio;
