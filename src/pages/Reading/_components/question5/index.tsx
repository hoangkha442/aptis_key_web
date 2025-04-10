import React, { useEffect, useState } from "react";
import { Select } from "antd";
const { Option } = Select;

type Question = {
  reading_part_5_id: number;
  content: string;
  sort_order: number;
  description: string;
  name_of_test: string;
};

type Props = {
  questions: Question[];
  valueMap: { [sortOrder: number]: string };
  onChange: (sortOrder: number, headingId: string) => void;
};

const Question5: React.FC<Props> = ({ questions, valueMap, onChange }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, [questions]);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-base my-5">
        {shuffledQuestions[0]?.description}
      </h3>
      <p className="text-2xl">{shuffledQuestions[0]?.name_of_test}</p>
      {shuffledQuestions.map((q, index) => (
        <div
          key={q.sort_order}
          className="space-y-0 flex space-x-2 items-center"
        >
          <p className="font-medium">{index + 1}.</p>
          <Select
            size="middle"
            placeholder="Chọn tiêu đề"
            value={valueMap[q.sort_order]}
            onChange={(val) => onChange(q.sort_order, val)}
            className="w-full max-w-md"
          >
            {shuffleArray(questions).map((heading) => (
              <Option
                key={heading.reading_part_5_id}
                value={heading.reading_part_5_id.toString()}
              >
                {heading.content}
              </Option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
};

export default Question5;

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
