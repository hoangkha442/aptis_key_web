import { useNavigate, useLocation } from "react-router-dom";

type Props = {};

export default function ListeningExamInfo({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const keyTestId = localStorage?.getItem("listening_key_test_id");

  return (
    <div className="p-6 space-y-4 mx-auto max-w-2xl font-medium items-center">
      <div className="w-full">
        <h1 className="text-[15px]">Aptis General Practice Test</h1>
        <h2 className="text-[18px] my-3">Listening</h2>

        <div className="flex flex-row justify-between w-[40%] text-[12.5px]">
          <div>
            <p className="font-semibold">Number of Questions:</p>
            <p>17</p>
          </div>
          <div>
            <p className="font-semibold">Time Allowed:</p>
            <p>40 min</p>
          </div>
        </div>

        <div className="my-3">
          <p className="text-[13px] font-bold mb-3">Assessment Description:</p>
          <p>Listening: 4 phần - 25 câu - 50 điểm.</p>
        </div>

        <div className="mb-6 mt-3">
          <p className="text-[13px] font-bold mb-3">Form Description:</p>
          <div className="flex flex-col gap-1">
            <p>
              <strong>
                Part 1,4: Dịch kỹ câu hỏi, đáp án và đọc đi đọc lại để đi thi có
                nhận diện đáp án và khoanh theo.
              </strong>
            </p>
            <p>
              <strong>
                Part 2,3: Nghe cẩn thận theo audio và chọn đáp án. Sau đó check
                đáp án và soát lại kỹ theo đoạn transcript.
              </strong>
            </p>
            <p className="italic text-sm text-gray-700">
              (Lưu ý: Các đáp án Key giống đề thi thật 100%, nhưng đề bài được
              thiết kế dựa vào trí nhớ giảng viên, không thể giống từng chữ so
              với đề thi thật, nhưng đại ý nội dung giữ nguyên).
            </p>
          </div>
        </div>

        <div className="text-start">
          <button
            onClick={() => {
              if (
                location.pathname ===
                "/simulated-exam-room/listening/take-test/intro"
              ) {
                navigate("/simulated-exam-room/listening");
              } else {
                navigate("/listening/take-test", { state: { keyTestId } });
              }
            }}
            className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
