import { Input, Typography } from "antd";
const { TextArea } = Input;
const { Text } = Typography;

export default function WritingPart1({ questions, answers, handleChange }: any) {
  return (
    <>
      <p className="font-bold text-base mt-10 mb-3">
        {questions[0]?.title}
      </p>
      <p className="font-bold mt-3 text-base mb-8">
        Example <span className="font-normal text-gray-800 text-base">How are you? I'm fine, thanks.</span>
      </p>
      {questions.map((q: any) => (
        <div className="!bg-transparent !border-none !p-0 mb-4" key={q.id}>
          <p className="font-normal text-gray-800 text-base mb-2">
            {q.from_name ? `${q.from_name}: ` : ""}{q.prompt}
          </p>
          {q.note && <Text type="secondary">{q.note}</Text>}
          <TextArea
            rows={1}
            value={answers[q.id] || ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
          {/* <p className="text-end flex gap-2 justify-end">
            Words: <span className="font-bold">{answers[q.id]?.trim().split(/\s+/).filter(Boolean).length || 0} / {maxWords(q.word_limit)}</span>
          </p> */}
        </div>
      ))}
    </>
  );
}
