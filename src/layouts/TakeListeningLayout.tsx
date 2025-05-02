import React, { ReactNode, useEffect, useState } from "react";
import { ConfigProvider, Layout, theme, Modal, message } from "antd";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  resetListeningTestState,
  setActiveListeningPart,
  setListeningReviewAnswersAndScore,
} from "../redux/slices/listeningUI.slice";
import { ListeningQuestion, ListeningTestData } from "../types/listening";

const { Header, Content, Footer } = Layout;
const TOTAL_DURATION = 40 * 60;

const getLevelFromScore = (score: number) => {
  if (score <= 15) return "A1";
  if (score <= 23) return "A2";
  if (score <= 33) return "B1";
  if (score <= 41) return "B2";
  return "C";
};

const ListeningPagination = ({ total }: { total: number }) => {
  const activePart = useSelector(
    (state: RootState) => state.listeningUI.activePart
  );
  const answers = useSelector((state: RootState) => state.listeningUI.answers);
  const isSubmitted = useSelector(
    (state: RootState) => state.listeningUI.isSubmitted
  );
  const dispatch = useDispatch();
  const data: ListeningTestData | null = useSelector(
    (state: RootState) => state.listening.data
  );
  const navigate = useNavigate();

  const handleNext = () => {
    if (activePart < total) {
      dispatch(setActiveListeningPart(activePart + 1));
    }
  };

  const handlePrev = () => {
    if (activePart > 1) {
      dispatch(setActiveListeningPart(activePart - 1));
    }
  };

  const handleSubmit = () => {
    const isIncomplete = Object.values(answers).some((val) => !val);
    const confirmAndSubmit = () => {
      if (!data) return;
      const reviewAnswers: any[] = [];
      let score = 0;
      const items = (data as ListeningTestData).listening_test_items;
      for (const part of Object.values(items)) {
        const questions = Array.isArray(part) ? part : [part];
        questions.forEach((q: ListeningQuestion) => {
          const userAnswer = answers[q.listening_test_items_id] || "";
          const correctAnswer = q.correct_answer;
          const isCorrect = userAnswer === correctAnswer;
          reviewAnswers.push({
            questionId: String(q.listening_test_items_id),
            userAnswer,
            correctAnswer,
            isCorrect,
          });
          if (isCorrect) score += 2;
        });
      }
      dispatch(setListeningReviewAnswersAndScore({ reviewAnswers, score }));
    };

    if (isIncomplete) {
      Modal.confirm({
        title: "Bạn chưa hoàn thành tất cả các câu hỏi",
        content: "Bạn có chắc chắn muốn nộp bài không?",
        okText: "Vẫn nộp bài",
        cancelText: "Quay lại",
        onOk: confirmAndSubmit,
      });
    } else {
      confirmAndSubmit();
    }
  };

  return (
    <div className="flex w-full !justify-end gap-4 mt-2">
      <button
        disabled={activePart <= 1}
        onClick={handlePrev}
        className="px-[15px] py-[7px] bg-white border transition-all duration-500 border-[#d9d9d9] rounded-lg hover:border-blue-500 hover:text-blue-500 text-lg cursor-pointer"
      >
        Previous
      </button>
      {isSubmitted ? (
        <>
          <button
            onClick={handleNext}
            className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-lg cursor-pointer"
          >
            Next
          </button>
          <button
  onClick={() => {
    dispatch(resetListeningTestState());
    localStorage.removeItem("listening_key_test_id");
    navigate("/courses")
  }}
  className="px-4 py-2 bg-gray-300 rounded-lg text-lg cursor-pointer"
>
  Back to courses
</button>

        </>
      ) : activePart < total ? (
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#45368f] text-white rounded-lg text-lg cursor-pointer"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[#45368f] text-white rounded-lg text-lg  cursor-pointer"
        >
          Submit
        </button>
      )}
    </div>
  );
};

const TakeListeningLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const totalQuestions = 17;
  const isSubmitted = useSelector(
    (state: RootState) => state.listeningUI.isSubmitted
  );
  const score = useSelector((state: RootState) => state.listeningUI.score);
  const answers = useSelector((state: RootState) => state.listeningUI.answers);
  const data = useSelector((state: RootState) => state.listening.data);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_DURATION);

  useEffect(() => {
    if (isSubmitted || !data) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const reviewAnswers: any[] = [];
          let score = 0;
          const items = (data as ListeningTestData).listening_test_items;
          for (const part of Object.values(items)) {
            const questions = Array.isArray(part) ? part : [part];
            questions.forEach((q: ListeningQuestion) => {
              const userAnswer = answers[q.listening_test_items_id] || "";
              const correctAnswer = q.correct_answer;
              const isCorrect = userAnswer === correctAnswer;
              reviewAnswers.push({
                questionId: String(q.listening_test_items_id),
                userAnswer,
                correctAnswer,
                isCorrect,
              });
              if (isCorrect) score += 2;
            });
          }

          dispatch(setListeningReviewAnswersAndScore({ reviewAnswers, score }));
          message.info("⏰ Hết giờ. Bài đã được nộp tự động.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data, dispatch, isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isIntroPage = location.pathname === "/listening/take-test/intro";

  return (
    <ConfigProvider componentSize="large">
      <Layout className="!h-screen flex flex-col">
        <Header className="flex justify-between items-center !bg-[#f9fafc] px-6">
        <img
  onClick={() => {
    dispatch(resetListeningTestState());
    localStorage.removeItem("listening_key_test_id");
    navigate("/")
    message.info('Chào mừng bạn về trang chủ')
  }}
  src={logo}
  alt="Logo"
  className="h-[80px] object-contain cursor-pointer"
/>

          <div className="text-lg font-semibold text-[#45368f] flex gap-6 items-center">

            {isSubmitted ? (
              <div className="text-right text-sm text-[#45368f] font-semibold">
                Total score: <span className="text-lg">{score}</span> / 50
                <br />
                Level:{" "}
                <span className="text-lg uppercase">
                  ({getLevelFromScore(score)})
                </span>
              </div>
            ) : (
              <span className="text-red-600 font-bold text-lg">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </Header>

        <Content className="flex-1 overflow-y-auto !px-12 !bg-[#f9fafc]">
          {children}
        </Content>

        <Footer
          style={{ background: colorBgContainer }}
          className="text-end flex flex-col items-center gap-2 !py-2 border-t border-[#e5e7eb]"
        >
          {isIntroPage ? (
            <div>
              Aptis key test ©{new Date().getFullYear()} Created by Hoàng Kha
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <ListeningPagination total={totalQuestions} />
            </div>
          )}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default TakeListeningLayout;
