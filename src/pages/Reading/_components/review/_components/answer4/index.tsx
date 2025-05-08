type Answer4Props = {
  questions: {
    reading_part_4_id: number;
    question_text: string;
    content: string;
    paragraph_text: string | null;
    description: string;
  }[];
  user: Record<number, string>;
  correct: Record<number, string>;
};

const Answer4 = ({ questions, user, correct }: Answer4Props) => {
  // Đếm tần suất xuất hiện của mỗi đáp án đúng
  const personFrequency: Record<string, number> = {};
  Object.values(correct).forEach((person) => {
    if (person) {
      personFrequency[person] = (personFrequency[person] || 0) + 1;
    }
  });

  // Lưu đoạn văn A/B/C/D nếu có
  const paragraphsMap: Record<string, string> = {};
  questions.forEach((q) => {
    const key = q.paragraph_text?.trim().charAt(0);
    if (key && !paragraphsMap[key]) {
      paragraphsMap[key] = q.paragraph_text!;
    }
  });

  // Hàm tính điểm tối đa của mỗi câu (dựa vào correct)
  const getMaxPointPerQuestion = (correctAnswer: string): number => {
    const freq = personFrequency[correctAnswer] || 1;
    return parseFloat((4 / freq).toFixed(2));
  };

  // Tổng điểm thực nhận từ câu đúng
  const totalScore = questions.reduce((sum, q) => {
    const id = q.reading_part_4_id;
    const correctAnswer = correct[id];
    const userAnswer = user[id];
    const maxPoint = getMaxPointPerQuestion(correctAnswer);
    return userAnswer === correctAnswer ? sum + maxPoint : sum;
  }, 0);

  return (
    <section>
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-xl font-semibold">Question 4 of 5</h3>
        <div className="text-red-500 text-lg font-normal">
          Point: {totalScore.toFixed(2)}
        </div>
      </div>

      <p className="font-semibold text-base my-5">{questions[0]?.description}</p>

      <div className="bg-gray-50 py-4 px-4 border border-[#e5e7eb] rounded mb-6">
        {["A", "B", "C", "D"].map((key) => (
          <p key={key} className="mb-2">
            <strong>{key}.</strong> {paragraphsMap[key] || <i>(Không có đoạn)</i>}
          </p>
        ))}
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const id = q.reading_part_4_id;
          const correctAnswer = correct[id];
          const userAnswer = user[id];
          const maxPoint = getMaxPointPerQuestion(correctAnswer);
          const isCorrect = userAnswer === correctAnswer;
          const earnedPoint = isCorrect ? maxPoint : 0;

          return (
            <div key={id} className="flex items-start gap-4 text-base">
              <div className="flex-1">
                <p className="mb-1 font-semibold">
                  {idx + 1}. {q.content}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-red-500 font-bold text-lg">
                    {isCorrect ? "✔" : "✘"}
                  </span>
                  <span className="text-gray-800">
                    Your answer:{" "}
                    <strong>{userAnswer || <i>(bỏ trống)</i>}</strong>
                  </span>
                  <span className="ml-2 text-green-600">+{earnedPoint} điểm</span>
                  {!isCorrect && (
                    <span className="ml-4 text-red-600">
                      Correct answer: <strong>{correctAnswer}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Answer4;
