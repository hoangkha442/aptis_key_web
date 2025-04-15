import React, { useMemo } from "react";
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
  const sortedQuestions = [...questions].sort((a, b) => a.sort_order - b.sort_order);

  // 🔀 Shuffle heading options only once, memoized
  const headingOptions = useMemo(() => shuffleArray([...questions]), [questions]);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-base my-5">
        {sortedQuestions[0]?.description}
      </h3>
      <p className="text-2xl">{sortedQuestions[0]?.name_of_test}</p>

      {sortedQuestions.map((q, index) => (
        <div key={q.sort_order} className="flex space-x-2 items-center">
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
      ))}
    </div>
  );
};

export default Question5;

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
