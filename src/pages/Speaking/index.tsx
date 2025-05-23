import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSpeakingCurrentPart,
  setSpeakingCurrentQuestionIndex,
  setSpeakingGroupedQuestions,
  setSpeakingStage,
} from "../../redux/slices/speakingUI.slice";
import { RootState } from "../../redux/store";
import { Modal, Spin } from "antd";
import { speakingService } from "../../config/speakingServices";

export default function SpeakingPage() {
  const dispatch = useDispatch();
  const { stage, groupedQuestions, currentPart, currentQuestionIndex } =
    useSelector((state: RootState) => state.speakingUI);

  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showPromptAfterIntro, setShowPromptAfterIntro] = useState(false);
  const [showIntroText, setShowIntroText] = useState(true);
  const [isPreparingPart4, setIsPreparingPart4] = useState(false);
  const [isAnsweringPart4, setIsAnsweringPart4] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordedAnswersRef = useRef<{ [id: number]: Blob }>({});

  const parts = Object.keys(groupedQuestions);
  const questions = groupedQuestions[currentPart] || [];
  const currentQuestion = questions[currentQuestionIndex];
  console.log("currentQuestion: ", currentQuestion);

  useEffect(() => {
    if (stage === "test" && parts.length === 0) {
      speakingService
        .getSpeakingTestById({ speaking_test_id: 1 })
        .then((res) => {
          dispatch(setSpeakingGroupedQuestions(res.data.questions));
          // dispatch(setSpeakingGroupedQuestions(res.data.questions));
          // dispatch(setSpeakingCurrentPart("Part 4"));
          // dispatch(setSpeakingCurrentQuestionIndex(0));
        });
    }
  }, [stage]);

  useEffect(() => {
    if (currentQuestion) {
      playQuestion();
    }
  }, [currentQuestionIndex, currentPart]);

  const playBeep = () => {
    const beep = new Audio("/beep.mp3");
    beep.play();
  };

  const playQuestion = () => {
    if (!currentQuestion) return;

    setShowPromptAfterIntro(false);
    setShowIntroText(true);
    setIsPreparingPart4(false);
    setIsAnsweringPart4(false);

    const isPart4 = currentQuestion.part_number === 4;

    const playBeepThen = (callback: () => void, delay = 1000) => {
      playBeep();
      setTimeout(callback, delay);
    };

    if (isPart4) {
      // const part4Questions = groupedQuestions[currentPart] || [];
      // const fullPrompt = part4Questions.map((q) => q.prompt).join(". ");
      // const combinedUtterance = new SpeechSynthesisUtterance(fullPrompt);
      // speechSynthesis.speak(combinedUtterance);
      const part4Questions = groupedQuestions[currentPart] || [];
      console.log("part4Questions: ", part4Questions);
      const fullPrompt = part4Questions.map((q) => q.prompt).join(". ");

      const speakPrompts = () => {
        const combinedUtterance = new SpeechSynthesisUtterance(fullPrompt);
        speechSynthesis.speak(combinedUtterance);

        combinedUtterance.onend = () => {
          const guide = new SpeechSynthesisUtterance(
            "You now have one minute to think about your answers. You can make notes if you wish."
          );
          speechSynthesis.speak(guide);
          guide.onend = () => {
            playBeepThen(() => {
              setIsPreparingPart4(true);
              setTimer(60);
              const prepCountdown = setInterval(() => {
                setTimer((prev) => {
                  if (prev <= 1) {
                    clearInterval(prepCountdown);
                    setIsPreparingPart4(false);
                    playBeepThen(() => {
                      setIsAnsweringPart4(true);
                      startTimerAndRecording(120);
                    }, 500);
                    return 0;
                  }
                  return prev - 1;
                });
              }, 1000);
            });
          };
        };
      };

      if (currentQuestion.audio_url) {
        setShowIntroText(true);
        const intro = new SpeechSynthesisUtterance(currentQuestion.audio_url);
        speechSynthesis.speak(intro);
        intro.onend = () => {
          playBeep();
          setTimeout(() => {
            setShowIntroText(false);
            setShowPromptAfterIntro(true);
            speakPrompts();
          }, 1000);
        };
      } else {
        setShowIntroText(false);
        setShowPromptAfterIntro(true);
        speakPrompts();
      }

      // combinedUtterance.onend = () => {
      //   const guide = new SpeechSynthesisUtterance(
      //     "You now have one minute to think about your answers. You can make notes if you wish."
      //   );
      //   speechSynthesis.speak(guide);
      //   guide.onend = () => {
      //     playBeepThen(() => {
      //       setIsPreparingPart4(true);
      //       setTimer(60);
      //       const prepCountdown = setInterval(() => {
      //         setTimer((prev) => {
      //           if (prev <= 1) {
      //             clearInterval(prepCountdown);
      //             setIsPreparingPart4(false);
      //             playBeepThen(() => {
      //               setIsAnsweringPart4(true);
      //               startTimerAndRecording(120);
      //             }, 500);
      //             return 0;
      //           }
      //           return prev - 1;
      //         });
      //       }, 1000);
      //     });
      //   };
      // };
    } else {
      const playPrompt = () => {
        const utterPrompt = new SpeechSynthesisUtterance(
          currentQuestion.prompt
        );
        speechSynthesis.speak(utterPrompt);
        utterPrompt.onend = () => {
          setTimeout(() => {
            playBeep();
          }, 500);
          setTimeout(() => {
            startTimerAndRecording(currentQuestion.suggested_time);
          }, 1000);
        };
      };

      if (currentQuestionIndex === 0 && currentQuestion.audio_url) {
        const intro = new SpeechSynthesisUtterance(currentQuestion.audio_url);
        speechSynthesis.speak(intro);
        intro.onend = () => {
          playBeep();
          setTimeout(() => {
            setShowIntroText(false);
            setShowPromptAfterIntro(true);
            playPrompt();
          }, 1000);
        };
      } else {
        setShowIntroText(false);
        setShowPromptAfterIntro(true);
        playPrompt();
      }
    }
  };

  const startTimerAndRecording = async (seconds: number) => {
    setTimer(seconds);
    setIsPlaying(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      if (currentQuestion) {
        recordedAnswersRef.current[currentQuestion.id] = blob;

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `answer_${currentQuestion.id}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        console.log("Auto-downloaded answer for Q", currentQuestion.id);
      }
    };

    mediaRecorder.start();

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsPlaying(false);
          mediaRecorder.stop();

          setTimeout(() => {
            if (currentPart === "Part 4") {
              const nextPartIndex = parts.indexOf(currentPart) + 1;
              if (nextPartIndex >= parts.length) {
                // Hiển thị Modal hỏi người dùng
                Modal.confirm({
                  title: "Bạn đã hoàn thành phần xong 4 phần thi",
                  content:
                    "Sau này sẽ có tính năng review bài làm. Hiện tại chưa có!",
                  okText: "Ok, hiểu rồi",
                  cancelText: "Không, tôi muốn thoát",
                  onOk: () => {
                    // Xóa cả Writing + Listening để chuẩn bị vào trang Review
                    localStorage.removeItem("writingUI");
                    localStorage.removeItem("listening_key_test_id");
                    localStorage.removeItem("reading_key_test_id");
                    localStorage.removeItem("reading_answers");
                    localStorage.removeItem("simulated_listening_answers");
                    localStorage.removeItem("simulated_reading_answers");

                    // Điều hướng sang trang review kết quả
                    window.location.href =
                      "/";
                  },
                  onCancel: () => {
                    // Chỉ xóa dữ liệu Listening
                    localStorage.removeItem("writingUI");
                    localStorage.removeItem("listening_key_test_id");
                    localStorage.removeItem("reading_key_test_id");
                    localStorage.removeItem("reading_answers");
                    localStorage.removeItem("simulated_listening_answers");
                    localStorage.removeItem("simulated_reading_answers");
                  },
                });
              } else {
                // Nếu chưa phải phần cuối
                dispatch(setSpeakingCurrentPart(parts[nextPartIndex]));
                dispatch(setSpeakingCurrentQuestionIndex(0));
              }
            } else {
              if (currentQuestionIndex + 1 < questions.length) {
                dispatch(
                  setSpeakingCurrentQuestionIndex(currentQuestionIndex + 1)
                );
              } else {
                const nextPartIndex = parts.indexOf(currentPart) + 1;
                if (nextPartIndex < parts.length) {
                  dispatch(setSpeakingCurrentPart(parts[nextPartIndex]));
                  dispatch(setSpeakingCurrentQuestionIndex(0));
                }
              }
            }
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (stage === "intro") {
    return (
      <div className="max-w-3/4 mx-auto py-20">
        <h2 className="mb-1 font-medium tracking-wide text-[13px]">
          Aptis General Practice Test
        </h2>
        <h3 className="text-base font-semibold">Speaking</h3>
        <div className="flex mt-4 gap-8">
          <p className="text-[13px] flex flex-col gap-1">
            Number of Questions<span className="font-bold text-sm">4</span>
          </p>
          <p className="text-[13px]">
            It takes about <strong>12 minutes</strong> and it is divided into{" "}
            <strong>four sections</strong>
          </p>
        </div>
        <button
          className="px-[15px] py-3 bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-base cursor-pointer font-medium mt-6"
          onClick={() => dispatch(setSpeakingStage("info"))}
        >
          Start Assessment
        </button>
      </div>
    );
  }
  if (stage === "info") {
    return (
      <div className="relative min-h-screen flex flex-col">
        <div className="max-w-2xl mx-auto text-start py-20">
          <h2 className="font-bold text-2xl">
            Aptis General Speaking Instructions
          </h2>
          <p className="text-base font-bold my-2">Speaking</p>
          <ul className="flex flex-col gap-2 text-sm text-gray-950">
            <li>
              You will answer some questions about yourself and then do three
              short speaking tasks.
            </li>
            <li>Each part of the test will appear automatically.</li>
            <li>The test will take about 12 minutes.</li>
            <li>When you click on the 'Next' button, the test will begin.</li>
          </ul>
          <p className="text-base text-gray-800 mt-10">
            When you click on the 'Next' button, the test will begin.
          </p>
        </div>

        <footer className="mt-auto text-center p-3">
          <div className="bg-white border border-[#f8f8f8] shadow-[0_0_20px_2px_#c3c1dd] rounded-lg">
            <div className="py-2 mr-3 flex justify-end">
              <button
                className="px-4 py-3 bg-[#45368f] text-white rounded-lg cursor-pointer hover:bg-[#372a73] font-medium flex gap-2 items-center"
                onClick={() => dispatch(setSpeakingStage("test"))}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <polyline points="15 6 21 12 15 18" />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (!Object.keys(groupedQuestions).length) {
    return (
      <Spin
        tip="Loading speaking test..."
        style={{ display: "block", marginTop: 100 }}
      />
    );
  }

  return (
    <div className="relative h-[100vh]">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold mb-2">Speaking {currentPart}</h2>
        {!showIntroText && currentPart !== "Part 4" && (
          <p className="text-base font-medium mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        )}

        <div className="">
          {/* Intro hướng dẫn */}
          {currentQuestionIndex === 0 &&
            currentQuestion?.audio_url &&
            showIntroText && (
              <div className="">
                <p className="font-medium whitespace-pre-line">
                  {currentQuestion.audio_url}
                </p>
              </div>
            )}
          {showPromptAfterIntro && currentPart === "Part 4" ? (
            <div className="flex flex-col gap-4">
              {(groupedQuestions["Part 4"] || []).map((q, idx) => (
                <div key={q.id}>
                  <p className="text-lg font-semibold">
                    {idx + 1}. {q.prompt}
                  </p>
                  {q.image_url && (
                    <img
                      src={q.image_url}
                      alt={`question-${idx + 1}`}
                      className="mt-2 rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : showPromptAfterIntro ? (
            <>
              <p className="text-lg mb-2 font-semibold">
                {currentQuestion?.prompt}
              </p>
              {currentQuestion?.image_url && (
                <img
                  src={currentQuestion.image_url}
                  alt="question"
                  className="mt-3 rounded"
                />
              )}
            </>
          ) : null}

          <div className="mt-4">
            {isPreparingPart4 && (
              <p className="absolute right-10 top-1/2 -translate-y-1/2 h-[90%] w-[20%] bg-white border border-[#f8f8f8] shadow-[0_0_20px_2px_#c3c1dd] rounded-lg">
                <p className="font-bold flex justify-center text-xl mt-6">
                  Preparing...{" "}
                </p>
                <div className="flex w-full justify-center">
                  <div className="border-2 border-blue-800 w-32 h-32 rounded-full flex items-center text-center justify-center text-4xl font-medium text-blue-800 mt-10">
                    {timer}s
                  </div>
                </div>
              </p>
            )}
            {isAnsweringPart4 && (
              <p className="absolute right-10 top-1/2 -translate-y-1/2 h-[90%] w-[20%] bg-white border border-[#f8f8f8] shadow-[0_0_20px_2px_#c3c1dd] rounded-lg">
                <p className="font-bold flex justify-center text-xl mt-6">
                  Recording...{" "}
                </p>
                <div className="flex w-full justify-center">
                  <div className="border-2 border-blue-800 w-32 h-32 rounded-full flex items-center text-center justify-center text-4xl font-medium text-blue-800 mt-10">
                    {timer}s
                  </div>
                </div>
              </p>
            )}
            {isPlaying && !isAnsweringPart4 && (
              <p className="absolute right-10 top-1/2 -translate-y-1/2 h-[90%] w-[20%] bg-white border border-[#f8f8f8] shadow-[0_0_20px_2px_#c3c1dd] rounded-lg">
                <p className="font-bold flex justify-center text-xl mt-6">
                  Recording...{" "}
                </p>
                <div className="flex w-full justify-center">
                  <div className="border-2 border-blue-800 w-32 h-32 rounded-full flex items-center text-center justify-center text-4xl font-medium text-blue-800 mt-10">
                    {timer}s
                  </div>
                </div>
              </p>
            )}
            {/* {!isPlaying && !isPreparingPart4 && !isAnsweringPart4 && (
              <p className="text-gray-500">Preparing next question...</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
