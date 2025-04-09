import { Select } from "antd";
import React from "react";

const { Option } = Select;

type Question = {
  reading_part_4_id: number;
  content: string;
  description: string;
  correct_answer: string;
  options: string[];
};

type Props = {
  questions: Question[];
  valueMap: { [id: number]: string };
  onChange: (id: number, value: string) => void;
  texts: { [key: string]: string };
};

const Question4: React.FC<Props> = ({ questions, valueMap, onChange, texts }) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-base my-5">{questions[0]?.description}:</h3>
      <div className="space-y-2">
        {Object.entries(texts).map(([key, text]) => (
          <p key={key} className="text-black whitespace-pre-line">
            {text}
          </p>
        ))}
      </div>

      {/* <h3 className="font-semibold text-lg">Choose the correct answer for each question:</h3> */}
      <div className="space-y-4">
        {questions?.map((q, index) => (
          <div key={q.reading_part_4_id} className="space-y-1 flex gap-2 items-center">
            <p className="font-normal"><span className="font-semibold">{index + 1}.</span> {q.content}</p>
            {/* <p className="font-medium">{q.content}</p> */}
            <Select
              placeholder="Chọn đáp án"
              value={valueMap[q.reading_part_4_id]}
              onChange={(val) => onChange(q.reading_part_4_id, val)}
              className="w-14 !h-8 !p-0 !rounded"
            >
              {q.options.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question4;
