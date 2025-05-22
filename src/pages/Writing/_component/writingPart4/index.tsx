import { Input } from "antd";
const { TextArea } = Input;

export default function WritingPart4({
  questions,
  answers,
  handleChange,
  maxWords,
}: any) {
  return (
    <>
      <p className="font-bold text-base mt-10 mb-3">{questions[0]?.title}</p>
      <div className="py-3 text-gray-800 leading-relaxed mb-2">
        {questions[0]?.description
          .split("\n")
          .map((line: string, index: number) => (
            <p key={index} className="mb-3">
              {line}
            </p>
          ))}
      </div>
      {questions.map((q: any) => (
        <div className="!bg-transparent !border-none !p-0 mb-4" key={q.id}>
          <p className=" text-gray-800 text-base mb-2 font-bold">
            {q.from_name ? `${q.from_name}: ` : ""}{" "}
            <span className="font-bold">{q.prompt}</span>
          </p>
          <TextArea
            rows={4}
            value={answers[q.id] || ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
          <p className="text-end flex gap-2 justify-end">
            Words:{" "}
            <span className="font-bold">
              {answers[q.id]?.trim().split(/\s+/).filter(Boolean).length || 0} /{" "}
              {maxWords(q.word_limit)}
            </span>
          </p>
        </div>
      ))}
    </>
  );
}
