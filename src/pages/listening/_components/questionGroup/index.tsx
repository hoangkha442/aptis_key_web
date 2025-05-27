import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Button } from "antd";

interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const QuestionGroup: React.FC<Props> = ({ questions, answers, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  console.log('selectedOptions: ', selectedOptions);
  const isSubmitted = useSelector((state: RootState) => state.listeningUI.isSubmitted);
  const reviewAnswers = useSelector((state: RootState) => state.listeningUI.reviewAnswers);
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const handleOptionClick = (id: number, opt: string) => {
    if (isSubmitted) return;
    setSelectedOptions(prev => ({ ...prev, [id]: opt }));
    onChange(id, opt);
  };

  return (
    <div>
      <p className="text-gray-900 font-medium">{questions[0]?.description}  <span className="text-red-700">(Đoạn văn này không có file audio, học viên học thuộc đáp án là được.)</span></p>
      <Button
        className="mb-2 mt-4 border border-gray-300 text-gray-800 font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm md:text-base"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </Button>
      {questions.map((question) => {
        const options = JSON.parse(question.options || "[]");
        const thisReview = reviewAnswers.find(r => r.questionId === String(question.listening_test_items_id));
        const userAnswer = answers[question.listening_test_items_id];

        return (
          <div key={question.listening_test_items_id}>
            <p className="my-3 font-medium text-base">{question.content}</p>
            
            <div className="grid grid-cols-1 gap-1 min-w-[300px]">
              {options.map((opt: string, idx: number) => {
                const optionLabel = String.fromCharCode(65 + idx);
                let bgColor = "bg-gray-100";
                if (isSubmitted) {
                  if (opt === thisReview?.correctAnswer && opt === userAnswer) bgColor = "bg-green-100";
                  else if (opt === userAnswer && opt !== thisReview?.correctAnswer) bgColor = "bg-red-100";
                  else if (opt === thisReview?.correctAnswer) bgColor = "bg-green-50";
                } else {
                  if (opt === userAnswer) bgColor = "bg-[#fdfac7]";
                }

                return (
                  <button
                    key={opt}
                    className={`w-full grid grid-cols-12 items-center text-left border h-[70px] cursor-pointer ${bgColor} text-gray-800 hover:bg-gray-200 border-gray-300`}
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
              {isSubmitted && (
                <p className={`text-sm mt-1 ${thisReview?.isCorrect ? "text-green-700" : "text-red-600"}`}>
                  {thisReview?.isCorrect ? " Bạn trả lời đúng. +2 điểm" : "  Bạn trả lời sai. +0 điểm"}
                  {!thisReview?.isCorrect && <span className="ml-2 text-gray-600">(Đáp án: <strong>{thisReview?.correctAnswer}</strong>)</span>}
                </p>
              )}
              {showAnswer && question.correct_answer && (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg shadow text-black">
          <p
            className="prose prose-sm prose-blue max-w-none leading-relaxed"
            
          >
            Answer: {question.correct_answer}
          </p>
        </div>
      )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionGroup;