import React, { JSX, useMemo, useState } from "react";
import { Select, Button } from "antd";
const { Option } = Select;

type Question = {
  reading_part_5_id: number;
  content: string;
  sort_order: number;
  description: string;
  name_of_test: string;
  paragraph: string;
  vietnam_paragraph: string;
  short_answer: string;
};

type Props = {
  questions: Question[];
  valueMap: { [sortOrder: number]: string };
  onChange: (sortOrder: number, headingId: string) => void;
};

const Question5: React.FC<Props> = ({ questions, valueMap, onChange }) => {
  const [showViet, setShowViet] = useState<{ [key: number]: boolean }>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [showPar, setShowPar] = useState(false)
  const sortedQuestions = [...questions].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const headingOptions = useMemo(
    () => shuffleArray([...questions]),
    [questions]
  );

  const handleShowViet = (sortOrder: number) => {
    setShowViet((prev) => ({ ...prev, [sortOrder]: !prev[sortOrder] }));
  };
  function parseShortAnswer(shortAnswer: any) {
    const lines = shortAnswer
      .trim()
      .split("\n")
      .map((line: string) => line.trim())
      .filter(Boolean);

    let enShort = "";
    let viShort = "";
    let explanation = "";

    lines.forEach((line: string) => {
      if (line.toLowerCase().startsWith("symbol")) {
        enShort = line;
      } else if (line.startsWith("(")) {
        viShort = line;
      } else if (line.startsWith("⇨")) {
        explanation = line.replace("⇨", "").trim();
      }
    });

    return { enShort, viShort, explanation };
  }

  function highlightKeywords(text: string, keywords: string[]): JSX.Element {
    if (!keywords.length) return <>{text}</>;
    const sortedKeywords = keywords.sort((a, b) => b.length - a.length);
    let pattern = sortedKeywords
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const regex = new RegExp(`(${pattern})`, "gi");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          sortedKeywords.some(
            (keyword) => part.trim().toLowerCase() === keyword.toLowerCase()
          ) ? (
            <b key={i} className="text-blue-700">
              {part}
            </b>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-base my-5">
        {sortedQuestions[0]?.description}
      </h3>

      <div className="flex gap-2 items-center">
        <p className="sm:text-2xl text-lg">{sortedQuestions[0]?.name_of_test}</p>
        <Button
          size="large"
          onClick={() => {
            setShowAnswer(!showAnswer);
          }}
          className="mr-2"
        >
          {showAnswer ? "Ẩn đáp án" : "Hiển thị đáp án"}
        </Button>
        <button
          onClick={() => {
            setShowPar(!showPar);
          }}
          className="mr-2 cursor-pointer rounded-lg border transition-all duration-500 border-[#45378f] py-2 px-4 text-[#45378f] font-medium hover:bg-[#45378f] hover:text-white"
        >
          {showPar ? "Ẩn đoạn văn" : "Hiển thị đoạn văn"}
        </button>
      </div>
      {showAnswer &&
        (() => {
          const { enShort, viShort, explanation } = parseShortAnswer(
            questions[0]?.short_answer || ""
          );
          const keywords = viShort
            .replace(/[()]/g, "")
            .split(/[–-]/)
            .map((str) => str.trim())
            .filter(Boolean);

          return (
            <div className="mt-2 bg-blue-50 border border-blue-200 p-3 rounded-xl shadow-sm">
              <div className="flex items-center mb-2 gap-2">
                <span className="inline-block text-blue-600 font-bold sm:text-lg text-base">
                  Đáp án
                </span>
              </div>
              <div className="sm:space-y-2 space-y-1 ml-2">
                {enShort && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Tiếng Anh:
                    </span>
                    <span className="ml-2 text-gray-900 font-bold sm:text-base text-xs">
                      {enShort}
                    </span>
                  </div>
                )}
                {viShort && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Tiếng Việt:
                    </span>
                    <span className="ml-2 text-gray-900 font-bold m:text-base text-xs">
                      {viShort}
                    </span>
                  </div>
                )}
                {explanation && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Giải thích:
                    </span>
                    <span className="ml-2 text-gray-900 m:text-base text-xs">
                      {highlightKeywords(explanation, keywords)}
                    </span>
                  </div>
                )}
                {!enShort && !viShort && !explanation ? <div>
                    <span className="text-gray-900 font-semibold">
                      {questions[0]?.short_answer}
                    </span>
                  </div> : ""}
              </div>
            </div>
          );
        })()}

      {sortedQuestions.map((q, index) => (
        <div key={q.sort_order} className={`space-y-2 ${showPar ? "mb-6" : "mb-2"}`}>
          <div className="flex items-center space-x-2">
            <p className="font-medium">{index + 1}.</p>
            <Select
              size="middle"
              placeholder="Chọn tiêu đề"
              value={valueMap[q.sort_order]}
              onChange={(val) => onChange(q.sort_order, String(val))}
              className="w-full max-w-md"
            >
              {headingOptions.map((heading) => (
                <Option
                  key={heading.reading_part_5_id}
                  value={heading.reading_part_5_id.toString()}
                >
                  {heading.content}
                </Option>
              ))}
            </Select>
          </div>
          {showPar &&
          (
          <div className="my-2">
            <div className="text-gray-900">
              <p className="mb-2 sm:text-base text-xs">{q.paragraph}</p>
              <Button
                size="middle"
                onClick={() => handleShowViet(q.sort_order)}
                className="mr-2"
              >
                {showViet[q.sort_order]
                  ? "Ẩn tiếng Việt"
                  : "Hiển thị tiếng Việt"}
              </Button>
            </div>
            {showViet[q.sort_order] && (
              <div className="mt-2 bg-blue-50 p-2 rounded">
                <strong>Đoạn văn tiếng Việt:</strong>
                <div className="flex gap-2">
                  <p className="font-medium">{index + 1}.</p>
                  <p className="sm:text-base text-xs">{q.vietnam_paragraph}</p>
                </div>
              </div>
            )}
          </div>

          )}
        </div>
      ))}
    </div>
  );
};

export default Question5;

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
