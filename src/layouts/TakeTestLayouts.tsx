import React, { ReactNode, useEffect, useState } from "react";
import {
  ConfigProvider,
  Layout,
  theme,
  Modal,
  message,
} from "antd";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  calculateScore,
  convertScoreToCEFR,
  ReadingProvider,
  useReadingContext,
} from "../pages/Reading/Context/ReadingContext";

const { Header, Content, Footer } = Layout;

const TakeTestLayouts: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const isTestPage = location.pathname === "/reading/take-test";
  const [totalScore, setTotalScore] = useState<number>(0);
  const [cefr, setCefr] = useState<string>("");

  useEffect(() => {
    if (location.pathname.includes("/review")) {
      const savedAnswers = localStorage.getItem("reading_answers");
      const savedCorrect = localStorage.getItem("reading_correct");
      if (savedAnswers && savedCorrect) {
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedCorrect = JSON.parse(savedCorrect);
        const total = calculateScore(parsedAnswers, parsedCorrect);
        setTotalScore(total);
        setCefr(convertScoreToCEFR(total));
      }
    }
  }, [location.pathname]);

  return (
    <ConfigProvider componentSize="large">
      <ReadingProvider>
        <Layout className="!h-screen flex flex-col">
          <Header className="flex justify-between items-center !bg-[#f9fafc] px-6">
            <img
              onClick={() => {
                navigate("/");
                localStorage.removeItem("reading_key_test_id");
                localStorage.removeItem("reading_answers");
                localStorage.removeItem("reading_correct");
                localStorage.removeItem("reading_timer_start");
                message.success("Chào mừng bạn trở về trang chủ");
              }}
              src={logo}
              alt="Logo"
              className="h-[80px] object-contain cursor-pointer"
            />
            {location.pathname.includes("/review") && (
              <div className="text-right text-sm text-[#45368f] font-semibold">
                Total score: <span className="text-lg">{totalScore}</span> / 50
                <br />
                Level: <span className="text-lg uppercase">{cefr}</span>
              </div>
            )}
          </Header>

          <Content className="flex-1 overflow-y-auto !p-x-12 !bg-[#f9fafc]">
            {children}
          </Content>

          <Footer
            style={{ background: colorBgContainer }}
            className="text-end flex flex-col items-center gap-2 !py-2 border-t border-[#e5e7eb]"
          >
            {location.pathname === "/reading/take-test/intro" ? (
              <div>
                Aptis key test ©{new Date().getFullYear()} Created by Hoàng Kha
              </div>
            ) : isTestPage ? (
              <div className="flex items-center justify-between w-full">
                <CountdownAndSubmit />
                <TestFooterPagination />
              </div>
            ) : (
              <div className="w-full flex justify-end">

              <button
                onClick={() => {
                  localStorage.removeItem("reading_key_test_id");
                  localStorage.removeItem("reading_answers");
                  localStorage.removeItem("reading_correct");
                  localStorage.removeItem("reading_timer_start");
                  navigate("/");
                  message.success("Chào mừng bạn trở về trang chủ");
                }}
                className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-lg cursor-pointer"
                >
                Back to home
              </button>
                </div>
            )}
          </Footer>
        </Layout>
      </ReadingProvider>
    </ConfigProvider>
  );
};

export default TakeTestLayouts;

// Countdown timer + auto submit
const CountdownAndSubmit = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const navigate = useNavigate();
  const { answers } = useReadingContext();
  const totalDuration = 35 * 60; // 35 phút

  useEffect(() => {
    const now = Date.now();
    const storedStartTime = localStorage.getItem("reading_timer_start");

    let startTime: number;
    if (storedStartTime) {
      startTime = parseInt(storedStartTime, 10);
    } else {
      startTime = now;
      localStorage.setItem("reading_timer_start", startTime.toString());
    }

    const elapsed = Math.floor((now - startTime) / 1000);
    const remaining = Math.max(0, totalDuration - elapsed);
    setTimeLeft(remaining);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.setItem("reading_answers", JSON.stringify(answers));
          localStorage.removeItem("reading_timer_start");
          navigate("/reading/take-test/review");
          setTimeout(() => {
            window.location.reload()
          }, 200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="text-sm font-semibold text-red-600">
      Còn lại: <span className="text-lg">{formatTime(timeLeft)}</span>
    </div>
  );
};

const TestFooterPagination = () => {
  const { activePart, setActivePart, answers } = useReadingContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const isIncomplete = () => {
      const isEmpty = (v: any) => v === "" || v === null || v === undefined;
      return (
        Object.values(answers.part1).some(isEmpty) ||
        Object.values(answers.part2).some(isEmpty) ||
        Object.values(answers.part3).some(isEmpty) ||
        Object.values(answers.part4).some(isEmpty) ||
        Object.values(answers.part5).some(isEmpty)
      );
    };

    if (isIncomplete()) {
      Modal.confirm({
        title: "Bạn chưa hoàn thành tất cả các câu hỏi",
        content: "Bạn có chắc chắn muốn nộp bài không?",
        okText: "Vẫn nộp bài",
        cancelText: "Quay lại",
        okButtonProps: {
          className: "!bg-[#45368f] hover:bg-[#372a73] text-white",
        },
        onOk() {
          localStorage.setItem("reading_answers", JSON.stringify(answers));
          localStorage.removeItem("reading_timer_start");
          navigate("/reading/take-test/review");
          message.info("Đã nộp bài thành công.");
          setTimeout(() => {
            window.location.reload()
          }, 600);
          navigate("/reading/take-test/review");
        },
      });
    } else {
      localStorage.setItem("reading_answers", JSON.stringify(answers));
      localStorage.removeItem("reading_timer_start");
      navigate("/reading/take-test/review");
      message.info("Đã nộp bài thành công.");
          setTimeout(() => {
            window.location.reload()
          }, 600);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-2">
      <button
        disabled={activePart <= 1}
        onClick={() => setActivePart(activePart - 1)}
        className="px-[15px] py-[7px] bg-white border border-[#d9d9d9] rounded-lg hover:border-blue-500 hover:text-blue-500 text-lg cursor-pointer"
      >
        Previous
      </button>

      {activePart < 5 ? (
        <button
          onClick={() => setActivePart(activePart + 1)}
          className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-lg cursor-pointer"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-lg cursor-pointer"
        >
          Submit Exam
        </button>
      )}
    </div>
  );
};
