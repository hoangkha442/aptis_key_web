import React, { useEffect, useRef, useState } from "react";
import { Select, Button, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import useDevToolsDetection from "../../../../hooks/useDevToolsDetection";
import { useDispatch } from "react-redux";
import { resetListeningTestState } from "../../../../redux/slices/listeningUI.slice";
interface Props {
  questions: any[];
  answers: Record<string, string>;
  onChange: (id: number, value: string) => void;
}

const Question15: React.FC<Props> = ({ questions, answers, onChange }) => {
  const isSubmitted = useSelector(
    (state: RootState) => state.listeningUI.isSubmitted
  );
  const reviewAnswers = useSelector(
    (state: RootState) => state.listeningUI.reviewAnswers
  );
  const dispatch = useDispatch();
  const isDevToolsOpen = useDevToolsDetection();
  const navigate = useNavigate();
  const [showTranscript, setShowTranscript] = useState(false);
  const audioUrl = questions[1]?.script;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  useEffect(() => {
    if (isDevToolsOpen) {
      message.error("Bạn đang sử dụng DevTools. Truy cập sẽ bị chặn.");
      dispatch(resetListeningTestState());
      localStorage.removeItem("listening_key_test_id");
      navigate("/");
    }
  }, [isDevToolsOpen, navigate]);

  const handleEnded = () => {
    setIsPlaying(false);
  };
  const handleSelectChange = (id: number, value: string) => {
    if (!isSubmitted) {
      onChange(id, value);
    }
  };

  return (
    <section>
      <button
        disabled={!audioUrl}
        className={`flex items-center gap-2 font-medium ${
          audioUrl
            ? "cursor-pointer text-gray-900"
            : "cursor-not-allowed text-gray-400"
        }`}
        onClick={handlePlayAudio}
      >
        {isPlaying ? (
          <PauseCircleOutlined style={{ fontSize: 24 }} />
        ) : (
          <PlayCircleOutlined style={{ fontSize: 24 }} />
        )}
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

      <p className="text-gray-900 font-medium">{questions[0]?.description}</p>

      <div className="flex flex-col gap-3 mt-6">
        {questions.map((question, index) => {
          const options = JSON.parse(question.options || "[]");
          const thisReview = reviewAnswers.find(
            (r) => r.questionId === String(question.listening_test_items_id)
          );
          const isCorrect = thisReview?.isCorrect;

          return (
            <div
              key={question.listening_test_items_id}
              className="flex sm:flex-row flex-col sm:gap-5 gap-1 sm:items-center items-start"
            >
              <p className="font-medium text-gray-900">
                {index + 1}. {question.content}
              </p>
              <Select
                value={answers[question.listening_test_items_id] || ""}
                onChange={(value) =>
                  handleSelectChange(question.listening_test_items_id, value)
                }
                disabled={isSubmitted}
                className={`${
                  isSubmitted
                    ? isCorrect
                      ? "border-green-500"
                      : "border-red-500"
                    : ""
                }`}
              >
                <Select.Option value="">Chọn một đáp án</Select.Option>
                {options.map((opt: string) => (
                  <Select.Option key={opt} value={opt}>
                    {opt}
                  </Select.Option>
                ))}
              </Select>
              {isSubmitted && (
                <p
                  className={`mt-1 sm:text-sm text-xs ${
                    isCorrect ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {isCorrect
                    ? "Bạn trả lời đúng. +2 điểm"
                    : "Bạn trả lời sai. +0 điểm"}
                  {!isCorrect && (
                    <span className="ml-2 text-gray-600 sm:text-base text-sm">
                      (Đáp án: <strong>{thisReview?.correctAnswer}</strong>)
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Button
        className="mb-2 mt-4 border border-gray-300 text-gray-800 font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm md:text-base"
        onClick={() => setShowTranscript(!showTranscript)}
      >
        {showTranscript ? "Hide Transcript" : "Show Transcript"}
      </Button>

      {showTranscript && (
        <div className="mt-4 p-2 text-gray-900 font-medium sm:text-base text-sm">
          <p className="mb-3">Topic: {questions[0]?.topic}</p>
          <p>Đoạn đối thoại của 2 người (Man - Woman):</p>
          {questions.map((question) => (
            <div
              className="mt-4 flex flex-col gap-2 font-normal"
              key={question.listening_test_items_id}
            >
              <p className="sm:text-base text-xs" dangerouslySetInnerHTML={{ __html: question.script }} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Question15;
