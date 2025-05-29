import { Question } from "../../../question2";

type Answer2Props = {
  user: Record<string, Question | null>;
  correct: Record<string, number>;
  questions: Question[];
};

const Answer2 = ({ user, correct, questions }: Answer2Props) => {
  const allSlotIndexes = questions.map((_, i) => i + 1);

  const slotAnswers = allSlotIndexes.reduce((acc, idx) => {
    acc[idx] = user[idx] ?? null;
    return acc;
  }, {} as { [slotIndex: number]: Question | null });

  const getCorrectQuestion = (slotIndex: number) =>
    questions.find((q) => q.reading_part_2_id === correct[slotIndex]);

  const totalCorrect = allSlotIndexes.reduce((sum, idx) => {
    const answer = slotAnswers[idx];
    return answer?.reading_part_2_id === correct[idx] ? sum + 1 : sum;
  }, 0);

  return (
    <section>
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-xl font-semibold">Question 2 of 5</h3>
        <div className="text-red-500 text-lg font-normal">Point: {totalCorrect}</div>

      </div>

      <p className="font-semibold text-base my-5">{questions[0]?.description}</p>

      <div className="flex sm:gap-12 gap-4">
        {/* User Answer */}
        <div className="flex-1">
          <h3 className="text-sm mb-4 font-medium text-gray-600">Your answer:</h3>
          <div className="space-y-2">
            {allSlotIndexes.map((idx) => {
              const answer = slotAnswers[idx];
              const isCorrect = answer?.reading_part_2_id === correct[idx];

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2 p-3 border border-dashed sm:text-base text-xs  ${
                    isCorrect
                      ? "border-green-400 bg-green-50"
                      : "bg-red-50 border-red-300"
                  }`}
                >
                  <div className="text-red-500 font-bold w-4">
                    {isCorrect ? "✔" : "✘"}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium sm:text-base text-xs mr-1">{idx}.</span>
                    {answer?.content || <i className="text-gray-400 sm:text-base text-xs">(bỏ trống)</i>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Correct Answer */}
        <div className="flex-1">
          <h3 className="text-sm mb-4 font-medium text-gray-600">Correct answer:</h3>
          <div className="space-y-2">
            {allSlotIndexes.map((idx) => {
              const correctContent = getCorrectQuestion(idx)?.content;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-3 border border-dashed border-[#e5e7eb] bg-white text-sm"
                >
                  <div className="flex-1 sm:text-base text-xs">
                    <span className="font-medium mr-1">{idx}.</span>
                    {correctContent}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Answer2;
