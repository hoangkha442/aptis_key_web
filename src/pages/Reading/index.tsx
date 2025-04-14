import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { readingService } from "../../config/readingServices";
import { message, Spin } from "antd";
import Question1 from "./_components/question1";
import Question2 from "./_components/question2";
import Question3 from "./_components/question3";
import Question4 from "./_components/question4";
import Question5 from "./_components/question5";
import { useReadingContext } from "./Context/ReadingContext";


const Reading = () => {
  const location = useLocation();
  const keyTestId = location.state?.keyTestId;
  const navigate = useNavigate();
  
  const { activePart, answers, setAnswers } = useReadingContext();

  const [readingParts, setReadingParts] = useState({
    part1: [],
    part2: [],
    part3: [],
    part4: [],
    part5: [],
  });

  const [dropCounter, setDropCounter] = useState(0);
  const [dropCounter3, setDropCounter3] = useState(0);
  const [paragraphTexts, setParagraphTexts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!keyTestId) {
      navigate("/");
      message.error("Không lấy được ID của key test. Liên hệ Admin!");
      return;
    }

    readingService
      .getReadingKeyTest({ reading_test_id: keyTestId })
      .then((res) => {
        localStorage.setItem("reading_key_test_id", keyTestId);
        const part1 = res.data.reading_part_1 || [];
        const part2 = res.data.reading_part_2 || [];
        const part3 = res.data.reading_part_3 || [];
        const part4 = (res.data.reading_part_4 || []).map((q: any) => ({
          ...q,
          options: JSON.parse(q.options),
        }));
        const part5 = res.data.reading_part_5 || [];

        const initPart2: any = {};
        const initPart3: any = {};
        const initPart4: any = {};
        const initPart5: any = {};

        for (let i = 1; i <= part2.length; i++) initPart2[i] = null;
        for (let i = 1; i <= part3.length; i++) initPart3[i] = null;
        for (const q of part4) initPart4[q.reading_part_4_id] = "";
        for (const q of part5) initPart5[q.sort_order] = "";

        setParagraphTexts(
          part4.reduce((acc: any, q: any) => {
            const key = q.paragraph_text?.trim()?.charAt(0);
            if (["A", "B", "C", "D"].includes(key)) acc[key] = q.paragraph_text;
            return acc;
          }, {})
        );

        setReadingParts({ part1, part2, part3, part4, part5 });
        setAnswers({
          part1: {},
          part2: initPart2,
          part3: initPart3,
          part4: initPart4,
          part5: initPart5,
        });
      })
      .catch((err) => {
        console.error("err: ", err);
        message.error("Không lấy được dữ liệu đề thi.");
      });
  }, [keyTestId]);

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      part1: { ...prev.part1, [id]: value },
    }));
  };

  const renderPartComponent = () => {
    const currentPart = readingParts[`part${activePart}` as 'part1' | 'part2' | 'part3' | 'part4' | 'part5'];
    if (!currentPart.length) return <div className="flex items-center gap-4 justify-center w-full h-full"><p>Đang tải câu hỏi ...</p>
  <Spin /></div>;

    switch (activePart) {
      case 1:
        return (
          <div>
            <p className="font-semibold text-base my-5">Read the email from a person to his/her friend. Choose one word from the list for each gap. The first one is done for you.</p>
            {currentPart.map((q: any) => (
            <Question1
              key={q.reading_part_1_id}
              question={q}
              value={answers.part1[q.reading_part_1_id] || null}
              onChange={(val) => handleAnswerChange(q.reading_part_1_id, val)}
            />
          ))}
          </div>
        )
      case 2:
        return (
          <Question2
            key={dropCounter}
            questions={currentPart}
            slotAnswers={answers.part2}
            setSlotAnswers={(ans) => {
              setAnswers((prev) => ({ ...prev, part2: ans }));
              setDropCounter((prev) => prev + 1);
            }}
          />
        );
      case 3:
        return (
          <Question3
            key={dropCounter3}
            questions={currentPart}
            slotAnswers={answers.part3}
            setSlotAnswers={(ans) => {
              setAnswers((prev) => ({ ...prev, part3: ans }));
              setDropCounter3((prev) => prev + 1);
            }}
          />
        );
      case 4:
        return (
          <Question4
            questions={currentPart}
            valueMap={answers.part4}
            onChange={(id, value) =>
              setAnswers((prev) => ({
                ...prev,
                part4: { ...prev.part4, [id]: value },
              }))
            }
            texts={paragraphTexts}
          />
        );
      case 5:
        return (
          <Question5
            questions={currentPart}
            valueMap={answers.part5}
            onChange={(sortOrder, value) =>
              setAnswers((prev) => ({
                ...prev,
                part5: { ...prev.part5, [sortOrder]: value },
              }))
            }
          />
        );
      default:
        return <p>Chưa hỗ trợ phần này</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-10 pb-10 pt-2">
      <h2 className="text-xl font-bold">Question {activePart} of 5 </h2>
      {renderPartComponent()}
    </div>
  );
};

export default Reading;
