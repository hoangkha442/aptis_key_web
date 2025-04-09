import { Select } from "antd";

type Question = {
  reading_part_5_id: number;
  content: string;
  sort_order: number;
  description: string;
  name_of_test: string;
};

type Answer5Props = {
  questions: Question[];
  user: Record<number, string>; // { sort_order: heading_id }
};

const Answer5 = ({ questions, user }: Answer5Props) => {
  // headingMap: heading_id (string) -> heading content
  const headingMap: Record<string, string> = {};
  const correctMap: Record<number, string> = {};

  questions.forEach((q) => {
    headingMap[q.reading_part_5_id.toString()] = q.content;
    correctMap[q.sort_order] = q.reading_part_5_id.toString(); // convert ID to string
  });

  const totalPoint = questions.reduce((sum, q) => {
    const userAnswerId = user[q.sort_order];
    const correctAnswerId = correctMap[q.sort_order];
    return userAnswerId === correctAnswerId ? sum + 2 : sum;
  }, 0);

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-4 mb-2">
        <h3 className="text-xl font-bold">Question 5 of 5</h3>
        <div className="text-red-500 text-lg">Point: {totalPoint}</div>
      </div>

      <p className="font-medium text-base">{questions[0]?.description}</p>
      <p className="text-xl font-semibold">{questions[0]?.name_of_test}</p>

      {questions
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((q) => {
          const userAnswerId = user[q.sort_order];
          const correctAnswerId = correctMap[q.sort_order];
          const isCorrect = userAnswerId === correctAnswerId;

          return (
            <div key={q.sort_order} className="flex items-start gap-2 text-base">
              <div className="flex items-center gap-3 w-1/2">
                <p className="font-semibold">{q.sort_order}.</p>
                <Select
                  value={userAnswerId || "no_answer"}
                  disabled
                  className={`w-full border border-dashed rounded-lg !text-black ${
                    isCorrect ? "border-green-200" : "border-red-200"
                  }`}
                >
                  <Select.Option value="no_answer">
                    <i className="">Không chọn đáp án</i>
                  </Select.Option>
                  {Object.entries(headingMap).map(([id, content]) => (
                    <Select.Option key={id} value={id}>
                      {content}
                    </Select.Option>
                  ))}
                </Select>

                <span
                  className={`text-lg font-bold ${
                    userAnswerId
                      ? isCorrect
                        ? "text-green-600"
                        : "text-red-500"
                      : "text-red-500"
                  }`}
                >
                  {isCorrect ? "✔" : "✘"}
                </span>
              </div>

              <div className="text-green-600 w-1/2">
                Correct answer:{" "}
                <span className="font-bold">
                  {headingMap[correctAnswerId] || <i>(Không tìm thấy đáp án)</i>}
                </span>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Answer5;
