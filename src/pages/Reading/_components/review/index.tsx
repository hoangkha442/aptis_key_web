import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { readingService } from "../../../../config/readingServices";
import Answer1 from "./_components/answer1";
import Answer2 from "./_components/answer2";
import Answer3 from "./_components/answer3";
import Answer4 from "./_components/answer4";
import Answer5 from "./_components/answer5";
import { calculateScore, convertScoreToCEFR } from "../../Context/ReadingContext";
import { setScore } from "../../../../redux/slices/readingScoreSlice";

const ReadingReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activePart, setActivePart] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<any>(null);
  const [readingParts, setReadingParts] = useState<any>(null);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("reading_answers");
    const keyTestId = Number(localStorage.getItem("reading_key_test_id"));

    if (!savedAnswers || !keyTestId) {
      message.error("Thiếu dữ liệu để hiển thị review.");
      navigate("/");
      return;
    }

    const parsedAnswers = JSON.parse(savedAnswers);
    setUserAnswers(parsedAnswers);

    readingService
      .getReadingKeyTest({ reading_test_id: keyTestId })
      .then((res: any) => {
        const correct = {
          part1: (res.data.reading_part_1 || []).reduce((acc: any, q: any) => {
            acc[q.reading_part_1_id] = q.correct_answer;
            return acc;
          }, {}),
          part2: (res.data.reading_part_2 || []).reduce((acc: any, q: any) => {
            acc[q.sort_order] = q.reading_part_2_id;
            return acc;
          }, {}),
          part3: (res.data.reading_part_3 || []).reduce((acc: any, q: any) => {
            acc[q.sort_order] = q.reading_part_3_id;
            return acc;
          }, {}),
          part4: (res.data.reading_part_4 || []).reduce((acc: any, q: any) => {
            acc[q.reading_part_4_id] = q.correct_answer;
            return acc;
          }, {}),
          part5: (res.data.reading_part_5 || []).reduce((acc: any, q: any) => {
            acc[q.sort_order] = q.reading_part_5_id.toString();
            return acc;
          }, {}),
        };

        setCorrectAnswers(correct);
        localStorage.setItem("reading_correct", JSON.stringify(correct));

        setReadingParts({
          part1: res.data.reading_part_1 || [],
          part2: res.data.reading_part_2 || [],
          part3: res.data.reading_part_3 || [],
          part4: res.data.reading_part_4 || [],
          part5: res.data.reading_part_5 || [],
        });

        // ✅ TÍNH ĐIỂM VÀ GỬI VÀO REDUX
        const total = calculateScore(parsedAnswers, correct);
        const band = convertScoreToCEFR(total);
        dispatch(setScore({ totalScore: total, cefr: band }));
      })
      .catch((err: any) => {
        console.error("err: ", err);
        message.error("Không lấy được đáp án đúng.");
      });
  }, [dispatch, navigate]);

  if (!userAnswers || !correctAnswers || !readingParts) {
    return (
      <div className="flex items-center gap-4 justify-center w-full h-full">
        <p>Đang tải đề ...</p>
        <Spin />
      </div>
    );
  }

  const renderCurrentAnswer = () => {
    switch (activePart) {
      case 1:
        return (
          <Answer1
            user={userAnswers.part1}
            correct={correctAnswers.part1}
            questions={readingParts.part1}
          />
        );
      case 2:
        return (
          <Answer2
            user={userAnswers.part2}
            correct={correctAnswers.part2}
            questions={readingParts.part2}
          />
        );
      case 3:
        return (
          <Answer3
            user={userAnswers.part3}
            correct={correctAnswers.part3}
            questions={readingParts.part3}
          />
        );
      case 4:
        return (
          <Answer4
            questions={readingParts.part4}
            user={userAnswers.part4}
            correct={correctAnswers.part4}
          />
        );
      case 5:
        return (
          <Answer5
            questions={readingParts.part5}
            user={userAnswers.part5 as Record<number, string>}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Review reading {readingParts?.part1[0]?.reading_test_id}
      </h2>
      <div className="flex gap-6">
        <div className="w-4/5">{renderCurrentAnswer()}</div>
        <div className="w-1/5 py-1 px-2">
          <h4 className="font-semibold mb-2">Quiz navigation</h4>
          <div className="grid grid-cols-4 gap-2 border-1 bg-gray-50 border-dashed border-[#d8d8da] rounded p-6">
            {[1, 2, 3, 4, 5].map((part) => (
              <button
                key={part}
                className={`w-8 h-8 border rounded text-center cursor-pointer ${
                  activePart === part
                    ? "bg-[#45368f] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => setActivePart(part)}
              >
                {part}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingReview;
