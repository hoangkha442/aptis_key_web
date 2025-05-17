import React, { useEffect, useRef, useState } from "react";
import { Select, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useDevToolsDetection from "../../../../hooks/useDevToolsDetection";
import { resetListeningTestState } from "../../../../redux/slices/listeningUI.slice";
import { useNavigate } from "react-router-dom";

interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const QuestionMatchingGroup: React.FC<Props> = ({
  questions,
  answers,
  onChange,
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isSubmitted = useSelector(
    (state: RootState) => state.listeningUI.isSubmitted
  );
  const reviewAnswers = useSelector(
    (state: RootState) => state.listeningUI.reviewAnswers
  );

  const audioUrl = questions[0]?.content;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDevToolsOpen = useDevToolsDetection();

  const [isPlaying, setIsPlaying] = useState(false);
useEffect(() => {
    if (isDevToolsOpen) {
      message.error("Bạn đang sử dụng DevTools. Truy cập sẽ bị chặn.");
      dispatch(resetListeningTestState());
      localStorage.removeItem("listening_key_test_id");
      navigate("/");
    }
  }, [isDevToolsOpen, navigate]);
  const handlePlayAudio = () => {
    if (!audioUrl) {
      message.error("Không có dữ liệu audio để phát.");
      return;
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => message.error("Không thể phát audio."));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const addExtraAnswers = (options: string[]) => [
    ...options,
    "X (wrong answer 1)",
    "X (wrong answer 2)",
  ];

  const handleSelectChange = (id: number, value: string) => {
    onChange(id, value);
  };

  return (
    <div>
      <p className="text-gray-900 font-medium">
        Four people are talking about {questions[0]?.topic}. Complete the
        sentences below.
      </p>

      <button
        onClick={handlePlayAudio}
        disabled={!audioUrl}
        className={`flex items-center gap-2 font-medium mt-2 ${
          audioUrl
            ? "cursor-pointer text-gray-900"
            : "cursor-not-allowed text-gray-400"
        }`}
      >
        {isPlaying ? (
          <PauseCircleOutlined style={{ fontSize: 24 }} />
        ) : (
          <PlayCircleOutlined style={{ fontSize: 24 }} />
        )}{" "}
        Play/Stop (2 times left)
      </button>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="auto"
          onEnded={handleEnded}
        />
      )}

      <div className="flex flex-col gap-5 mt-3">
        {questions.map((question) => {
          const options = JSON.parse(question.options || "[]");
          const updatedOptions = addExtraAnswers(options);
          const thisReview = reviewAnswers.find(
            (r) => r.questionId === String(question.listening_test_items_id)
          );
          const isCorrect = thisReview?.isCorrect;

          return (
            <div
              key={question.listening_test_items_id}
              className="flex items-start flex-wrap w-full"
            >
              <p className="w-1/3 font-medium text-gray-900 pt-2">
                {question.description}
              </p>
              <div className="w-2/3">
                <Select
                  value={answers[question.listening_test_items_id] || ""}
                  onChange={(value) =>
                    handleSelectChange(question.listening_test_items_id, value)
                  }
                  className={`mt-2 w-full ${
                    isSubmitted
                      ? isCorrect
                        ? "border-green-500"
                        : "border-red-500"
                      : ""
                  }`}
                  disabled={isSubmitted}
                >
                  <Select.Option value="">Chọn một đáp án</Select.Option>
                  {updatedOptions.map((opt: string, index: number) => (
                    <Select.Option key={`${opt}-${index}`} value={opt}>
                      {opt}
                    </Select.Option>
                  ))}
                </Select>
                {isSubmitted && (
                  <p
                    className={`text-sm mt-1 ${
                      isCorrect ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {isCorrect
                      ? "Bạn trả lời đúng. +2 điểm"
                      : "Bạn trả lời sai. 0 điểm"}
                    {!isCorrect && (
                      <span className="ml-2 text-gray-600">
                        (Đáp án: <strong>{thisReview?.correctAnswer}</strong>)
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="mb-2 mt-4 border border-gray-300 text-gray-800 font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm md:text-base cursor-pointer"
        onClick={() => setShowTranscript(!showTranscript)}
      >
        {showTranscript ? "Hide Transcript" : "Show Transcript"}
      </button>

      {showTranscript && (
        <div className="mt-4 p-2 text-gray-900 font-medium">
          <p className="mb-3">Topic: {questions[0]?.topic}</p>
          {questions.map((question) => (
            <div
              className="mt-4 flex flex-col gap-2 font-normal"
              key={question.listening_test_items_id}
            >
              <p>{question.script}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionMatchingGroup;
