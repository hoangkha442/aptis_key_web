import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getListeningTestById } from "../../redux/slices/listeningSlice";
import {
  setListeningAnswer,
} from "../../redux/slices/listeningUI.slice";
import QuestionMatchingGroup from "./_components/questionMatching";
import QuestionGroup from "./_components/questionGroup";
import QuestionRadio from "./_components/questionRadio";
import { ListeningTestData } from "../../types/listening";
import Question15 from "./_components/question15";
import { Spin } from "antd";


export default function Listening() {
  const dispatch = useDispatch();

  const testId = localStorage.getItem("listening_key_test_id");

  const { data, status, error } = useSelector((state: RootState): {
    data: ListeningTestData | null;
    status: string;
    error: string | null;
  } => state.listening);
  const activePart = useSelector(
    (state: RootState) => state.listeningUI.activePart
  );
  const answers = useSelector(
    (state: RootState) => state.listeningUI.answers
  );

  const [allQuestions, setAllQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (testId) {
      dispatch(getListeningTestById(+testId) as any);
    }
  }, [dispatch, testId]);

  useEffect(() => {
    if (data?.listening_test_items) {
      const flattened: any[] = [];
      Object.entries(data.listening_test_items).forEach(([key, qs]: any) => {
        if (key.includes("14") || key.includes("15") || key.includes("16") || key.includes("17")) {
          flattened.push(qs); // Push group
        } else {
          qs.forEach((q: any) => flattened.push(q));
        }
      });

      setAllQuestions(flattened);

      const initAnswers: Record<string, string> = {};
      flattened.flat().forEach((q: any) => {
        initAnswers[q.listening_test_items_id] = "";
      });

    }
  }, [data]);

  const handleAnswerChange = (id: number, value: string) => {
    dispatch(setListeningAnswer({ questionId: String(id), answer: value }));
  };

  const currentBatch = (() => {
    const q = allQuestions[activePart - 1];
    if (!q) return [];
    return Array.isArray(q) ? q : [q];
  })();

  if (status === "loading") return <div className="flex items-center gap-4 justify-center w-full h-full"><p>Đang tải đề ...</p>
  <Spin /></div>
  if (status === "failed") return <p>{error}</p>;
  if (!currentBatch.length) return <p>No question found</p>;

  const renderComponent = () => {
    const first = currentBatch[0];
    const qNum = first?.question_number;

    if (qNum?.includes("Question 14")) {
      return (
        <QuestionMatchingGroup
          questions={currentBatch}
          answers={answers}
          onChange={handleAnswerChange}
        />
      );
    }
    if (qNum?.includes("Question 15")) {
      return (
        <Question15
          questions={currentBatch}
          answers={answers}
          onChange={handleAnswerChange}
        />
      );
    }

    if (qNum?.includes("Question 16") || qNum?.includes("Question 17")) {
      return (
        <QuestionGroup
          questions={currentBatch}
          answers={answers}
          onChange={handleAnswerChange}
        />
      );
    }
    

    return (
      <QuestionRadio
        question={first}
        value={answers[first.listening_test_items_id] || ""}
        onChange={(val) => handleAnswerChange(first.listening_test_items_id, val)}
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-10 pb-10 pt-2">
      <h2 className="text-xl font-bold mb-4">
        Question {activePart} of 17
      </h2>
      {renderComponent()}
    </div>
  );
}
