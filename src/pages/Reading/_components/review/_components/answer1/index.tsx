import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type Answer1Props = {
  user: Record<string, string>;
  correct: Record<string, string>;
  questions: {
    content: string;
    options: string;
    reading_part_1_id: number;
  }[];
};

const Answer1 = ({ user, correct, questions }: Answer1Props) => {
  const correctCount = questions.reduce((count, q) => {
    const userAnswer = user[q.reading_part_1_id] || "";
    const correctAnswer = correct[q.reading_part_1_id];
    return userAnswer === correctAnswer ? count + 1 : count;
  }, 0);

  const totalPoints = correctCount * 2;

  return (
    <section>
      <div className="flex items-center mb-4 gap-5">
        <h3 className="text-xl font-semibold">Question 1 of 5</h3>
        <div className="text-red-500 text-lg font-normal">Point: {totalPoints}</div>
      </div>

      {questions.map((q) => {
        const userAnswer = user[q.reading_part_1_id] || "";
        const correctAnswer = correct[q.reading_part_1_id];
        const isCorrect = userAnswer === correctAnswer;
        const parts = q.content.split("___");

        return (
          <div
            key={q.reading_part_1_id}
            className={`p-4 rounded border mb-4 ${
              isCorrect
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className="sm:text-base text-xs flex items-center">
              {parts[0]}
              <span className="font-semibold underline mx-1 sm:text-base text-xs">
                {userAnswer || <i>(bỏ trống)</i>}
              </span>
              {parts[1]}
              <span className="ml-2 inline-flex items-center gap-1 sm:text-base text-xs ">
                {isCorrect ? (
                  <CheckCircleOutlined className="text-green-500" />
                ) : (
                  <>
                    <CloseCircleOutlined className="!text-red-500" />
                    <span className="sm:text-base text-xs  text-gray-800">
                      (Correct answer: {correctAnswer})
                    </span>
                  </>
                )}
              </span>
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default Answer1;
