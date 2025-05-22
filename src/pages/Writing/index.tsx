import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setWritingStage,
  setAnswer,
  setGroupedQuestions,
} from "../../redux/slices/writingUI.slice";
import { RootState } from "../../redux/store";
import { writingService } from "../../config/writing";
import { Typography, Spin } from "antd";
import WritingPart1 from "./_component/writingPart1";
import WritingPart2 from "./_component/writingParrt2";
import WritingPart3 from "./_component/writingParrt3";
import WritingPart4 from "./_component/writingPart4";

const { Title} = Typography;

export default function WritingPage() {
  const dispatch = useDispatch();

  const stage = useSelector((state: RootState) => state.writingUI.stage);
  const groupedQuestions = useSelector(
    (state: RootState) => state.writingUI.groupedQuestions
  );
  const currentPart = useSelector(
    (state: RootState) => state.writingUI.currentPart
  );
  const answers = useSelector((state: RootState) => state.writingUI.answers);

  const questions = groupedQuestions[currentPart] || [];
  console.log('questions: ', questions);
  const partKeys = Object.keys(groupedQuestions);

  useEffect(() => {
    if (stage === "test" && partKeys.length === 0) {
      writingService.getWritingTestById({ writing_test_id: 1 }).then((res) => {
        dispatch(setGroupedQuestions(res.data.grouped_questions));
      });
    }
  }, [dispatch, stage]);

  const maxWords = (limit: string) => {
    const match = limit.match(/\d+/g);
    return match ? parseInt(match[match.length - 1]) : 100;
  };

  const handleChange = (id: number, value: string) => {
    const words = value.trim().split(/\s+/);
    const max = maxWords(questions.find((q) => q.id === id)?.word_limit || "");
    if (words.length <= max) {
      dispatch(setAnswer({ id, answer: value }));
    }
  };
  const currentPartNumber = questions[0]?.part_number;

  if (stage === "intro") {
    return (
      <div className="max-w-3/4 mx-auto">
        <h2 className="mb-1 font-medium tracking-wide text-[13px]">
          Aptis General Practice Test
        </h2>
        <h3 className="text-base font-semibold">Writing</h3>
        <div className="flex mt-4 gap-8">
          <p className="text-[13px] flex flex-col gap-1">
            Number of Questions<span className="font-bold text-sm">4</span>
          </p>
          <p className="text-[13px] flex flex-col gap-1">
            Time Allowed: <span className="font-bold text-sm">50 min</span>
          </p>
        </div>
        <button className="px-[15px] py-3 bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-base cursor-pointer font-medium mt-6" onClick={() => dispatch(setWritingStage("info"))}>
          Start Assessment
        </button>
      </div>
    );
  }

  if (stage === "info") {
    return (
      <div className="max-w-2xl mx-auto text-start">
        <h2 className="font-bold text-2xl">Aptis General Writing Instructions</h2>
        <p className="text-base font-bold my-2">Writing</p>
        <p className="text-base text-gray-800 mb-1">The test has four parts and takes up to 50 minutes.</p>
        <ul className="flex flex-col gap-2 text-base text-gray-800">
          <li>Part One: 3 minutes</li>
          <li>Part Two: 7 minutes</li>
          <li>Part Three: 10 minutes</li>
          <li>Part Four: 30 minutes</li>
        </ul>
        <p className="text-base text-gray-800 mt-14">When you click on the 'Next' button, the test will begin.</p>
      </div>
    );
  }

  if (!Object.keys(groupedQuestions).length) {
    return (
      <Spin
        tip="Loading writing test..."
        style={{ display: "block", marginTop: 100 }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <Title level={3} className="!font-bold">Writing</Title>
      <Title level={3} className="!font-bold !mt-0">Question {currentPart} of 4</Title>
     {currentPartNumber === 1 && (
      <WritingPart1
        questions={questions}
        answers={answers}
        handleChange={handleChange}
        maxWords={maxWords}
      />
    )}

    {currentPartNumber === 2 && (
      <WritingPart2
        questions={questions}
        answers={answers}
        handleChange={handleChange}
        maxWords={maxWords}
      />
    )}
    {currentPartNumber === 3 && (
      <WritingPart3
        questions={questions}
        answers={answers}
        handleChange={handleChange}
        maxWords={maxWords}
      />
    )}
    {currentPartNumber === 4 && (
      <WritingPart4
        questions={questions}
        answers={answers}
        handleChange={handleChange}
        maxWords={maxWords}
      />
    )}
  </div>
  );
}
