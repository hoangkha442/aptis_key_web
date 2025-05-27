import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
interface Props {
  question: any;
  value: string;
  onChange: (val: string) => void;
}

const QuestionRadio: React.FC<Props> = ({ question, value, onChange }) => {
  const options = JSON.parse(question.options || "[]");
  const isSubmitted = useSelector(
    (state: RootState) => state.listeningUI.isSubmitted
  );
  const reviewAnswers = useSelector(
    (state: RootState) => state.listeningUI.reviewAnswers
  );
  const thisReview = reviewAnswers.find(
    (r) => r.questionId === String(question.listening_test_items_id)
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("isPlaying: ", isPlaying);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleOptionClick = (opt: string) => {
    if (!isSubmitted) {
      onChange(opt);
    }
  };
  function formatScriptToHTML(scriptText: string): string {
    return scriptText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const colonIndex = line.indexOf(":");
        if (colonIndex !== -1) {
          const speaker = line.substring(0, colonIndex).trim();
          const dialogue = line.substring(colonIndex + 1).trim();
          return `<p><b>${speaker}:</b> ${dialogue}</p>`;
        } else {
          return `<p>${line}</p>`;
        }
      })
      .join("");
  }

  const handlePlayAudio = () => {
    const audioUrl = question.listening_audio;
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
  return (
    <div>
      <button
        disabled={!question.listening_audio}
        className={`flex items-center gap-2 font-medium ${
          question.listening_audio
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
      {question.listening_audio && (
        <audio
          ref={audioRef}
          src={question.listening_audio}
          preload="auto"
          onEnded={handleEnded}
        />
      )}
      <p className="my-3 font-medium text-base">{question.content}</p>

      <div className="grid grid-cols-1 gap-1 min-w-[300px]">
        {options.map((opt: string, index: number) => {
          const optionLabel = String.fromCharCode(65 + index);

          const isUserChoice = opt === value;
          const isCorrect = opt === thisReview?.correctAnswer;

          let bgColor = "bg-gray-100";
          if (isSubmitted) {
            if (isUserChoice && isCorrect) bgColor = "bg-green-100";
            else if (isUserChoice && !isCorrect) bgColor = "bg-red-100";
            else if (!isUserChoice && isCorrect) bgColor = "bg-green-50";
          } else {
            if (isUserChoice) bgColor = "bg-[#fdfac7]";
          }

          return (
            <button
              key={opt}
              className={`w-full grid grid-cols-12 items-center text-left border h-[70px] cursor-pointer
                ${bgColor} text-gray-800 hover:bg-gray-200 border-gray-300`}
              onClick={() => handleOptionClick(opt)}
            >
              <div className="col-span-2 flex justify-center items-center border-r border-gray-300 bg-white h-full">
                <span className="font-bold text-lg p-2">{optionLabel}</span>
              </div>
              <div className="col-span-10 ml-4 pr-4">
                <span className="text-base normal-case">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {isSubmitted && !thisReview?.isCorrect && (
        <div className="mt-4 text-sm text-red-700">
          Đáp án đúng là:{" "}
          <span className="font-semibold">{thisReview?.correctAnswer}</span>
        </div>
      )}

      <Button
        className="mb-2 mt-4 border border-gray-300 text-gray-800 font-medium rounded-lg px-2 py-1 md:px-4 md:py-2 text-sm md:text-base"
        onClick={() => setShowTranscript(!showTranscript)}
      >
        {showTranscript ? "Hide Transcript" : "Show Transcript"}
      </Button>
      {showTranscript && question.script && (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg shadow text-black">
          <h3 className="font-semibold text-lg mb-2">Transcript</h3>
          <div
            className="prose prose-sm prose-blue max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatScriptToHTML(question.script),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionRadio;
