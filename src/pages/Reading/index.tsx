import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { readingService } from "../../config/readingServices";
import { message } from "antd";
import Question1 from "./_components/question1";
import Question2 from "./_components/question2";
import Question3 from "./_components/question3";
import Question4 from "./_components/question4";
import Question5 from "./_components/question5";
import { useReadingContext } from "./Context/ReadingContext";
import { ReadingPart3Question } from "../../types/reading";

type Question = {
  reading_part_2_id: number;
  content: string;
  sort_order: number;
};

const Reading = () => {
  const location = useLocation();
  const keyTestId = location.state?.keyTestId;
  const navigate = useNavigate();
  const { activePart } = useReadingContext();

  const [readingParts, setReadingParts] = useState<{
    part1: any[];
    part2: any[];
    part3: any[];
    part4: any[];
    part5: any[];
  }>({ part1: [], part2: [], part3: [], part4: [], part5: [] });

  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const [answersPart2, setAnswersPart2] = useState<{ [slotIndex: number]: Question | null }>({});
  const [dropCounter, setDropCounter] = useState(0);
  const [answersPart3, setAnswersPart3] = useState<{ [slotIndex: number]: ReadingPart3Question | null }>({});
  const [dropCounter3, setDropCounter3] = useState(0);
  const [answersPart4, setAnswersPart4] = useState<{ [id: number]: string }>({});
  const [paragraphTexts, setParagraphTexts] = useState<{ [key: string]: string }>({});
  const [answersPart5, setAnswersPart5] = useState<{ [sortOrder: number]: string }>({});

  useEffect(() => {
    if (!keyTestId) {
      navigate("/");
      message.error("Không lấy được ID của key test. Liên hệ Admin!");
      return;
    }

    readingService
      .getReadingKeyTest({ reading_test_id: keyTestId })
      .then((res) => {
        const part1 = res.data.reading_part_1 || [];
        const part2 = res.data.reading_part_2 || [];
        const part3 = res.data.reading_part_3 || [];
        const part4 = (res.data.reading_part_4 || []).map((q: any) => ({
          ...q,
          options: JSON.parse(q.options),
        }));
        const part5 = res.data.reading_part_5 || [];

        const initialAnswers2: { [slotIndex: number]: Question | null } = {};
        const initialAnswers3: { [slotIndex: number]: ReadingPart3Question | null } = {};
        const initialAnswers4: { [id: number]: string } = {};
        const initialAnswers5: { [sortOrder: number]: string } = {};

        for (let i = 1; i <= part2.length; i++) initialAnswers2[i] = null;
        for (let i = 1; i <= part3.length; i++) initialAnswers3[i] = null;
        for (const q of part4) initialAnswers4[q.reading_part_4_id] = "";
        for (const q of part5) initialAnswers5[q.sort_order] = "";

        const paragraphMap: { [key: string]: string } = {};
        part4.forEach((q: any) => {
          const keyMatch = q.paragraph_text?.trim()?.charAt(0);
          if (["A", "B", "C", "D"].includes(keyMatch)) {
            paragraphMap[keyMatch] = q.paragraph_text;
          }
        });

        setParagraphTexts(paragraphMap);

        setReadingParts({ part1, part2, part3, part4, part5 });
        setAnswersPart2(initialAnswers2);
        setAnswersPart3(initialAnswers3);
        setAnswersPart4(initialAnswers4);
        setAnswersPart5(initialAnswers5);
      })
      .catch((err) => {
        console.error("err: ", err);
        message.error("Không lấy được dữ liệu đề thi.");
      });
  }, [keyTestId]);

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const renderPartComponent = () => {
    const currentPart = readingParts[`part${activePart as 1 | 2 | 3 | 4 | 5}`];
    if (!currentPart.length) return <p>Đang tải câu hỏi...</p>;

    switch (activePart) {
      case 1:
        return currentPart.map((q) => (
          <Question1
            key={q.reading_part_1_id}
            question={q}
            value={answers[q.reading_part_1_id] || null}
            onChange={(val) => handleAnswerChange(q.reading_part_1_id, val)}
          />
        ));
      case 2:
        return (
          <Question2
            key={dropCounter}
            questions={currentPart}
            slotAnswers={answersPart2}
            setSlotAnswers={(ans) => {
              setAnswersPart2(ans);
              setDropCounter((prev) => prev + 1);
            }}
          />
        );
      case 3:
        return (
          <Question3
            key={dropCounter3}
            questions={currentPart}
            slotAnswers={answersPart3}
            setSlotAnswers={(ans) => {
              setAnswersPart3(ans);
              setDropCounter3((prev) => prev + 1);
            }}
          />
        );
      case 4:
        return (
          <Question4
            questions={currentPart}
            valueMap={answersPart4}
            onChange={(id, value) =>
              setAnswersPart4((prev) => ({ ...prev, [id]: value }))
            }
            texts={paragraphTexts}
          />
        );
      case 5:
        return (
          <Question5
            questions={currentPart}
            valueMap={answersPart5}
            onChange={(sortOrder, value) =>
              setAnswersPart5((prev) => ({ ...prev, [sortOrder]: value }))
            }
          />
        );
      default:
        return <p>Chưa hỗ trợ phần này</p>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-semibold">
        Reading Test - Part {activePart}
      </h2>
      {renderPartComponent()}
    </div>
  );
};

export default Reading;