// import { useLocation, useNavigate } from "react-router-dom";

// type Props = {};

// export default function ExamInfo({}: Props) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const keyTestId = location.state?.keyTestId;
//    const isSimulatedIntro = location.pathname === "/simulated-exam-room/reading/intro";
//   return (
//     <div className="p-6 space-y-4 mx-auto max-w-2xl font-medium items-center">
//       <div className="w-full">
//         <h1 className="text-[15px]">Aptis General Practice Test</h1>
//         <h2 className="text-[18px] my-3">Reading</h2>

//         <div className="flex flex-row justify-between w-[40%] text-[12.5px]">
//           <div>
//             <p className="font-semibold">Number of Questions:</p>
//             <p>5</p>
//           </div>
//           <div>
//             <p className="font-semibold">Time Allowed:</p>
//             <p>35 min</p>
//           </div>
//         </div>

//         <div className="my-3">
//           <p className="text-[13px] font-bold mb-3">Assessment Description:</p>
//           <p>Reading: 5 phần - 29 câu - 50 điểm.</p>
//         </div>

//         <div className="mb-6 mt-3">
//           <p className="text-[13px] font-bold mb-3">Form Description:</p>
//           <div className="flex flex-col gap-3">
//             <p>
//               <strong>Part 1,2,3,4:</strong> Đầy đủ đề bài, đọc dịch kỹ đề bài,
//               làm và suy luận ra đáp án để hiểu rõ đáp án.
//             </p>
//             <p>
//               <strong>Part 5:</strong> Học thuộc thứ tự các tiêu đề.
//             </p>
//             <p className="italic text-sm text-gray-700">
//               (Lưu ý: Các đáp án Key giống đề thi thật 100%, nhưng đề bài được
//               thiết kế dựa vào trí nhớ giảng viên, không thể giống từng chữ so
//               với đề thi thật, nhưng đại ý nội dung giữ nguyên).
//             </p>
//           </div>
//         </div>

//         <div className="text-start">
//           {!isSimulatedIntro ? (
//           <div className="text-start">
//             <button
//               onClick={() =>
//                 navigate("/reading/take-test", { state: { keyTestId } })
//               }
//               className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
//             >
//               Start Assessment
//             </button>
//           </div>
//         ) : <button
//             onClick={() =>
//               navigate("/simulated-exam-room/reading", { state: { keyTestId } })
//             }
//             className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
//           >
//             Start Assessment
//           </button>}
          
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

export default function ExamInfo({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const keyTestId = location.state?.keyTestId;
  const isSimulatedIntro = location.pathname === "/simulated-exam-room/reading/intro";

  // Modal state
  const [openTips, setOpenTips] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenTips(false);
    };
    if (openTips) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openTips]);

  // Close when clicking outside content
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === dialogRef.current) setOpenTips(false);
  };

  return (
    <div className="p-6 space-y-4 mx-auto max-w-2xl font-medium items-center">
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[15px]">Aptis General Practice Test</h1>
            <h2 className="text-[18px] my-3">Reading</h2>
          </div>

          
        </div>

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

        <div className="text-start flex gap-5 items-center">
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
          ) : (
            <button
              onClick={() =>
                navigate("/simulated-exam-room/reading", { state: { keyTestId } })
              }
              className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
            >
              Start Assessment
            </button>
          )}
          {/* Nút mở modal mẹo học */}
          <button
            onClick={() => setOpenTips(true)}
            className="cursor-pointer text-base text-[#45368f] bg-white hover:bg-[#ebe7fc] hover:text-[#372a73] transition-all px-6 py-2 rounded border border-[#45368f] hover:border-[#372a73] shadow-inner"
          >
            Mẹo học
          </button>
        </div>
      </div>

      {/* Modal MẸO HỌC */}
      {openTips && (
        <div
          ref={dialogRef}
          onClick={onOverlayClick}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">MẸO HỌC: CÁCH HỌC</h3>
              <button
                onClick={() => setOpenTips(false)}
                className="rounded px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4 text-[14px] leading-6">
              <div>
                <p className="font-semibold text-lg">Question 1,2,3,4</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Đầy đủ đề bài, <span className="font-semibold">đọc dịch kỹ đề bài</span>, làm và suy luận ra đáp án để hiểu rõ đáp án.{" "}
                    <span className="uppercase font-semibold">KHÔNG HỌC VẸT.</span>
                  </li>
                  <li>
                    <span className="font-semibold">Lưu ý Question 4 bị tráo:</span> tráo thứ tự của 4 đoạn văn của 4 người, dẫn tới thứ tự đáp án
                    cũng bị tráo theo. Cần suy luận kỹ từ đoạn văn ra đáp án, và khi đi thi <span className="font-semibold">đọc – dịch – chọn lại</span> nếu bị tráo.
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-lg">Question 5</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-semibold">Học thuộc thứ tự các tiêu đề.</span>
                  </li>
                  <li>
                    Keys mới sẽ <span className="font-semibold">không có đề bài</span>.
                    <span className="italic font-bold">{' '}Nên học luôn theo <span className="font-bold">thứ tự đáp án tiêu đề</span> vì nó <span className="font-bold">không bao giờ tráo</span>.</span>
                  </li>
                  <li>
                    Các đoạn văn mẫu public trên mạng <span className="font-semibold">không nên học theo</span>, vì không chuẩn câu từ và <span className="font-semibold">độ khó</span>.
                    Đề thi thật có từ vựng khó hơn nhiều. Học sai nguồn sẽ khiến bạn <span className="italic">underestimate</span> độ khó và hoang mang khi vào phòng thi.
                  </li>
                  <li>
                    Giảng viên khi đi thi lấy đề về chỉ có <span className="font-semibold">35 phút</span> để làm. Việc ghi nhớ đề đầy đủ các phần trước và
                    <span className="font-semibold"> toàn bộ key</span> đã hết thời gian; không đủ để mang về <span className="font-semibold">7 đoạn</span> của phần tiêu đề
                    một cách chuẩn xác. Vì vậy <span className="font-semibold">phần 5 không có đề (Với các key mới)</span>.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-yellow-50 p-3 text-yellow-900 border border-yellow-200">
                <p className="font-semibold">Tóm tắt nhanh</p>
                <ul className="list-disc pl-5">
                  <li>Q1–Q4: đọc – dịch – suy luận đáp án, không học vẹt; Q4 chú ý tráo thứ tự đoạn & đáp án.</li>
                  <li>Q5: chỉ học thứ tự tiêu đề (key cố định), không học “đoạn văn sưu tầm” trên mạng.</li>
                </ul>
              </div>
            </div>

            <div className="px-5 py-4 border-t flex items-center justify-end gap-2">
              <button
                onClick={() => setOpenTips(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setOpenTips(false);
                  if (!isSimulatedIntro) {
                    navigate("/reading/take-test", { state: { keyTestId } });
                  } else {
                    navigate("/simulated-exam-room/reading", { state: { keyTestId } });
                  }
                }}
                className="bg-[#45368f] hover:bg-[#372a73] text-white px-4 py-2 rounded cursor-pointer"
              >
                Bắt đầu làm bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
