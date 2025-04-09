type Answer4Props = {
    questions: {
      reading_part_4_id: number;
      question_text: string;
      content: string;
      paragraph_text: string;
      description: string;
    }[];
    user: Record<number, string>;
    correct: Record<number, string>;
  };
  
  const Answer4 = ({ questions, user, correct }: Answer4Props) => {
    const totalCorrect = questions.reduce((count, q) => {
      const userAnswer = user[q.reading_part_4_id];
      const correctAnswer = correct[q.reading_part_4_id];
      return userAnswer === correctAnswer ? count + 1 : count;
    }, 0);
  
    const paragraphsMap: Record<string, string> = {};
    questions.forEach((q) => {
      const key = q.paragraph_text.trim().charAt(0);
      if (["A", "B", "C", "D"].includes(key) && !paragraphsMap[key]) {
        paragraphsMap[key] = q.paragraph_text;
      }
    });
  
    return (
      <section>
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-xl font-semibold">Question 4 of 5</h3>
          <div className="text-red-500 text-lg font-normal">Point: {totalCorrect}</div>
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
            const userAnswer = user[q.reading_part_4_id];
            const correctAnswer = correct[q.reading_part_4_id];
            const isCorrect = userAnswer === correctAnswer;
  
            return (
              <div
                key={q.reading_part_4_id}
                className="flex items-start gap-4 text-base"
              >
                <div className="flex-1">
                  <p className="mb-1 font-semibold">
                    {idx + 1}. {q.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold text-lg">
                      {isCorrect ? "✔" : "✘"}
                    </span>
                    <span className="text-gray-800">
                      Your answer:{" "}
                      <strong>{userAnswer || <i>(bỏ trống)</i>}</strong>
                    </span>
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
  