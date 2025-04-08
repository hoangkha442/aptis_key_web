type Question1Props = {
    question: {
      content: string;
      options: string;
      reading_part_1_id: number;
    };
    value: string | null;
    onChange: (value: string) => void;
  };
  
  export default function Question1({
    question,
    value,
    onChange,
  }: Question1Props) {
    const options = JSON.parse(question.options);
  
    const parts = question.content.split("___");
  
    return (
      <div className="space-y-4">
        <p className="font-semibold">
          {parts[0]}
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="inline-block border border-gray-300 rounded px-2 py-1 mx-2"
          >
            <option value="" disabled>
             
            </option>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {parts[1]}
        </p>
      </div>
    );
  }
  