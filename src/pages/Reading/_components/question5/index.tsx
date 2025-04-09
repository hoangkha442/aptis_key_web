import { Select } from "antd";
import React from "react";

const { Option } = Select;

type Question = {
  reading_part_5_id: number;
  content: string;
  sort_order: number;
};

type Props = {
  questions: Question[];
  valueMap: { [sortOrder: number]: string };
  onChange: (sortOrder: number, headingId: string) => void;
};

const Question5: React.FC<Props> = ({ questions, valueMap, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Choose a heading for each numbered paragraph (1–7):</h3>
      {questions
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((q) => (
          <div key={q.sort_order} className="space-y-1">
            <p className="font-medium">{q.sort_order}.</p>
            <Select
              placeholder="Chọn tiêu đề"
              value={valueMap[q.sort_order]}
              onChange={(val) => onChange(q.sort_order, val)}
              className="w-full max-w-md"
            >
              {questions.map((heading) => (
                <Option key={heading.reading_part_5_id} value={heading.reading_part_5_id.toString()}>
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
