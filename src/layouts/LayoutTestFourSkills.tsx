import React, { ReactNode, useEffect, useState } from "react";
import { Layout, ConfigProvider, theme, message, Modal } from "antd";
import { useLocation } from "react-router-dom";
// import logo from "../assets/passkey_logo.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  // resetListeningTestState,
  setListeningReviewAnswersAndScore,
} from "../redux/slices/listeningUI.slice";
import {
  setCurrentPart,
  setWritingStage,
} from "../redux/slices/writingUI.slice";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { ListeningTestData, ListeningQuestion } from "../types/listening";

const { Header, Content, Footer } = Layout;
const TOTAL_DURATION_WRITING = 50 * 60;

const getLevelFromScore = (score: number) => {
  if (score <= 15) return "A1";
  if (score <= 23) return "A2";
  if (score <= 33) return "B1";
  if (score <= 41) return "B2";
  return "C";
};

const LayoutTestFourSkills: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isListening = location.pathname.includes("/simulated-exam-room/listening/take-test/intro");
  const isReading = location.pathname.includes("reading");
  const isWriting = location.pathname.includes("writing");
  const writingStage = useSelector((state: RootState) => state.writingUI.stage);
  const writingPartKeys = useSelector((state: RootState) =>
    Object.keys(state.writingUI.groupedQuestions)
  );
  const writingCurrentPart = useSelector(
    (state: RootState) => state.writingUI.currentPart
  );
  const writingAnswers = useSelector(
    (state: RootState) => state.writingUI.answers
  );
  const groupedQuestions = useSelector(
    (state: RootState) => state.writingUI.groupedQuestions
  );

  const currentIndex = writingPartKeys.indexOf(writingCurrentPart);
  const isLastPart = currentIndex === writingPartKeys.length - 1;
  const isWritingReady =
    isWriting &&
    writingPartKeys.length > 0 &&
    writingCurrentPart &&
    currentIndex !== -1;

  // Listening state
  const isSubmitted = useSelector(
    (state: RootState) => state.listeningUI.isSubmitted
  );
  const score = useSelector((state: RootState) => state.listeningUI.score);
  const answers = useSelector((state: RootState) => state.listeningUI.answers);
  const data = useSelector((state: RootState) => state.listening.data);

  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_DURATION_WRITING);

  useEffect(() => {
    if (!isListening || isSubmitted || !data) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          autoSubmitListening();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isListening, isSubmitted, data]);

  const autoSubmitListening = () => {
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
    message.info("⏰ Hết giờ. Bài nghe đã được nộp tự động.");
  };

  useEffect(() => {
    if (!isWriting || writingStage !== "test") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitWritingDocument(); // tự động nộp bài
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isWriting, writingStage]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const formatTimeFull = (secs: number) => {
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleSubmitWriting = async () => {
    const totalQuestions = Object.values(groupedQuestions).flat().length;
    const answeredCount = Object.values(writingAnswers).filter(
      (a) => a && a.trim().length > 0
    ).length;

    if (answeredCount < totalQuestions) {
      Modal.confirm({
        title: `Bạn chưa trả lời hết các câu hỏi (${answeredCount}/${totalQuestions})`,
        content: "Bạn có chắc chắn muốn nộp bài?",
        okText: "Nộp bài",
        cancelText: "Hủy",
        onOk: async () => {
          await submitWritingDocument();
        },
      });
      return;
    }

    await submitWritingDocument(); // nếu đã trả lời hết thì nộp luôn
  };

  const submitWritingDocument = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: Object.entries(groupedQuestions).flatMap(([part, qs]) => [
              new Paragraph({ text: part, heading: "Heading1" }),
              ...qs.map((q) => {
                const userAnswer = writingAnswers[q.id] || "(No answer)";
                const answerLines = userAnswer.split("\n");

                const answerRuns: TextRun[] = answerLines.flatMap(
                  (line, idx) => {
                    const runs: TextRun[] = [new TextRun(line)];
                    if (idx < answerLines.length - 1) {
                      runs.push(new TextRun({ break: 1 }));
                    }
                    return runs;
                  }
                );

                return new Paragraph({
                  children: [
                    new TextRun({ text: q.prompt, bold: true }),
                    new TextRun("\n"),
                    ...answerRuns,
                  ],
                });
              }),
            ]),
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "writing_answers.docx");
      message.success("Nộp bài thành công! File Word đã được tải xuống.");
      localStorage.removeItem("writingUI");
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo file Word.");
    }
  };

  return (
    <ConfigProvider componentSize="large">
      <Layout className="!h-screen flex flex-col">
        <Header className="flex justify-between items-center !bg-[#f9fafc] px-6">
          <div className="text-lg font-semibold text-[#45368f] flex gap-6 items-center">
            {isListening && !isSubmitted ? (
              <span className="text-red-600 font-bold text-lg">
                {formatTime(timeLeft)}
              </span>
            ) : isSubmitted && isListening ? (
              <div className="text-right text-sm text-[#45368f] font-semibold">
                Total score: <span className="text-lg">{score}</span> / 50
                <br />
                Level:{" "}
                <span className="text-lg uppercase">
                  ({getLevelFromScore(score)})
                </span>
              </div>
            ) : null}
          </div>
          {isWriting && writingStage === "test" && writingStage === "test" && (
            <div className="text-right mr-4">
              <div className="text-2xl font-bold text-black tracking-widest">
                {formatTimeFull(timeLeft)}
              </div>
              <div className=" text-back text-[17px] leading-0 py-3">
                Time remaining
              </div>
              <div className="w-full mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2e0e66] transition-all duration-300"
                  style={{
                    width: `${
                      ((TOTAL_DURATION_WRITING - timeLeft) /
                        TOTAL_DURATION_WRITING) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}
        </Header>
        <Content className="flex-1 overflow-y-auto !px-12 !bg-[#f9fafc]">
          {children}
        </Content>
        <Footer
          style={{ background: colorBgContainer }}
          className="text-end !py-2 border-t border-[#e5e7eb]"
        >
          {writingStage === "intro" ? (
            <div>
              Aptis Key Test ©{new Date().getFullYear()} - Created by PassKey
              Center
            </div>
          ) : writingStage === "info" ? (
            <div className="text-end">
              <button
                className="px-4 py-2 bg-[#45368f] text-white rounded-lg cursor-pointer hover:bg-[#372a73]"
                onClick={() => dispatch(setWritingStage("test"))}
              >
                Next
              </button>
            </div>
          ) : isWriting && isWritingReady ? (
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => {
                  if (currentIndex <= 0) {
                    dispatch(setWritingStage("info"));
                  } else {
                    dispatch(setCurrentPart(writingPartKeys[currentIndex - 1]));
                  }
                }}
              >
                Previous
              </button>
              {isLastPart ? (
                <button
                  className="px-4 py-2 bg-[#45368f] text-white rounded-lg cursor-pointer hover:bg-[#372a73]"
                  onClick={handleSubmitWriting}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-[#45368f] text-white rounded-lg cursor-pointer hover:bg-[#372a73]"
                  onClick={() =>
                    dispatch(setCurrentPart(writingPartKeys[currentIndex + 1]))
                  }
                >
                  Next
                </button>
              )}
            </div>
          ) : location.pathname ===
            "/simulated-exam-room/listening/take-test/intro" ? (
            <div>
              Aptis Key Test ©{new Date().getFullYear()} - Created by PassKey
              Center
            </div>
          ) : isReading ? (
            <div>Reading Section</div>
          ) : (
            <div>Speaking Section</div>
          )}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutTestFourSkills;
