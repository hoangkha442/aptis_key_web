import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

export default function ExamInfo({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const keyTestId = location.state?.keyTestId;
   const isSimulatedIntro = location.pathname === "/simulated-exam-room/reading/intro";
  return (
    <div className="p-6 space-y-4 mx-auto max-w-2xl font-medium items-center">
      <div className="w-full">
        <h1 className="text-[15px]">Aptis General Practice Test</h1>
        <h2 className="text-[18px] my-3">Reading</h2>

        <div className="flex flex-row justify-between w-[40%] text-[12.5px]">
          <div>
            <p className="font-semibold">Number of Questions:</p>
            <p>5</p>
          </div>
          <div>
            <p className="font-semibold">Time Allowed:</p>
            <p>35 min</p>
          </div>
        </div>

        <div className="my-3">
          <p className="text-[13px] font-bold mb-3">Assessment Description:</p>
          <p>Reading: 5 phần - 29 câu - 50 điểm.</p>
        </div>

        <div className="mb-6 mt-3">
          <p className="text-[13px] font-bold mb-3">Form Description:</p>
          <div className="flex flex-col gap-3">
            <p>
              <strong>Part 1,2,3,4:</strong> Đầy đủ đề bài, đọc dịch kỹ đề bài,
              làm và suy luận ra đáp án để hiểu rõ đáp án.
            </p>
            <p>
              <strong>Part 5:</strong> Học thuộc thứ tự các tiêu đề.
            </p>
            <p className="italic text-sm text-gray-700">
              (Lưu ý: Các đáp án Key giống đề thi thật 100%, nhưng đề bài được
              thiết kế dựa vào trí nhớ giảng viên, không thể giống từng chữ so
              với đề thi thật, nhưng đại ý nội dung giữ nguyên).
            </p>
          </div>
        </div>

        <div className="text-start">
          {!isSimulatedIntro ? (
          <div className="text-start">
            <button
              onClick={() =>
                navigate("/reading/take-test", { state: { keyTestId } })
              }
              className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
            >
              Start Assessment
            </button>
          </div>
        ) : <button
            onClick={() =>
              navigate("/simulated-exam-room/reading", { state: { keyTestId } })
            }
            className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
          >
            Start Assessment
          </button>}
          
        </div>
      </div>
    </div>
  );
}
