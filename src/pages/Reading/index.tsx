import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { readingService } from "../../config/readingServices";
import { message } from "antd";
import Question1 from "./_components/question1";
import { useReadingContext } from "./Context/ReadingContext";
import Question2 from "./_components/question2";
import Question3 from "./_components/question3";
import { ReadingPart3Question } from "../../types/reading";
// import Intro from "./_components/intro";
type Question = {
  reading_part_2_id: number;
  content: string;
  sort_order: number;
};

const Reading = () => {
  const location = useLocation();
  const keyTestId = location.state?.keyTestId;
  const navigate = useNavigate();

  const [readingParts, setReadingParts] = useState<{
    part1: any[];
    part2: any[];
    part3: any[];
    part4: any[];
    part5: any[];
  }>({
    part1: [],
    part2: [],
    part3: [],
    part4: [],
    part5: [],
  });

  const { activePart } = useReadingContext();
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const [answersPart2, setAnswersPart2] = useState<{
    [slotIndex: number]: Question | null;
  }>({});
  const [dropCounter, setDropCounter] = useState(0);
  const [answersPart3, setAnswersPart3] = useState<{
    [slotIndex: number]: ReadingPart3Question | null;
  }>({});
  const [dropCounter3, setDropCounter3] = useState(0);
  

  useEffect(() => {
    if (!keyTestId) {
      navigate("/");
      message.error("Không lấy được ID của key test. Liên hệ Admin!");
      return;
    }

    readingService
      .getReadingKeyTest({ reading_test_id: keyTestId })
      .then((res) => {
        console.log("res: ", res);
        const part2Questions = res.data.reading_part_2 || [];
        const initialAnswers: { [slotIndex: number]: Question | null } = {};
        for (let i = 1; i <= part2Questions.length; i++) {
          initialAnswers[i] = null;
        }
        const part3Questions = res.data.reading_part_3 || [];
        const initialAnswers3: {
          [slotIndex: number]: ReadingPart3Question | null;
        } = {};

        for (let i = 1; i <= part3Questions.length; i++) {
          initialAnswers3[i] = null;
        }
        setReadingParts({
          part1: res.data.reading_part_1 || [],
          part2: part2Questions,
          part3: part3Questions,
          part4: res.data.reading_part_4 || [],
          part5: res.data.reading_part_5 || [],
        });

        setAnswersPart2(initialAnswers);
        setAnswersPart3(initialAnswers3);
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
      // case 1:
      //   return <Intro />
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
