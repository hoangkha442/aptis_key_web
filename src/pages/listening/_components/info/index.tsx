// import { useNavigate, useLocation } from "react-router-dom";

// type Props = {};

// export default function ListeningExamInfo({}: Props) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const keyTestId = localStorage?.getItem("listening_key_test_id");

//   return (
//     <div className="p-6 space-y-4 mx-auto max-w-2xl font-medium items-center">
//       <div className="w-full">
//         <h1 className="text-[15px]">Aptis General Practice Test</h1>
//         <h2 className="text-[18px] my-3">Listening</h2>

//         <div className="flex flex-row justify-between w-[40%] text-[12.5px]">
//           <div>
//             <p className="font-semibold">Number of Questions:</p>
//             <p>17</p>
//           </div>
//           <div>
//             <p className="font-semibold">Time Allowed:</p>
//             <p>40 min</p>
//           </div>
//         </div>

//         <div className="my-3">
//           <p className="text-[13px] font-bold mb-3">Assessment Description:</p>
//           <p>Listening: 4 phần - 25 câu - 50 điểm.</p>
//         </div>

//         <div className="mb-6 mt-3">
//           <p className="text-[13px] font-bold mb-3">Form Description:</p>
//           <div className="flex flex-col gap-1">
//             <p>
//               <strong>
//                 Part 1,4: Dịch kỹ câu hỏi, đáp án và đọc đi đọc lại để đi thi có
//                 nhận diện đáp án và khoanh theo.
//               </strong>
//             </p>
//             <p>
//               <strong>
//                 Part 2,3: Nghe cẩn thận theo audio và chọn đáp án. Sau đó check
//                 đáp án và soát lại kỹ theo đoạn transcript.
//               </strong>
//             </p>
//             <p className="italic text-sm text-gray-700">
//               (Lưu ý: Các đáp án Key giống đề thi thật 100%, nhưng đề bài được
//               thiết kế dựa vào trí nhớ giảng viên, không thể giống từng chữ so
//               với đề thi thật, nhưng đại ý nội dung giữ nguyên).
//             </p>
//           </div>
//         </div>

//         <div className="text-start">
//           <button
//             onClick={() => {
//               if (
//                 location.pathname ===
//                 "/simulated-exam-room/listening/take-test/intro"
//               ) {
//                 navigate("/simulated-exam-room/listening");
//               } else {
//                 navigate("/listening/take-test", { state: { keyTestId } });
//               }
//             }}
//             className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
//           >
//             Start Assessment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type Props = {};

export default function ListeningExamInfo({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const keyTestId = localStorage?.getItem("listening_key_test_id");

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

  const isSimulatedIntro =
    location.pathname === "/simulated-exam-room/listening/take-test/intro";

  const handleStart = () => {
    if (isSimulatedIntro) {
      navigate("/simulated-exam-room/listening");
    } else {
      navigate("/listening/take-test", { state: { keyTestId } });
    }
  };

  return (
    <div className="p-6 space-y-4 mx-auto max-w-2xl font-medium items-center">
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[15px]">Aptis General Practice Test</h1>
            <h2 className="text-[18px] my-3">Listening</h2>
          </div>

        {/* Nút mở modal mẹo học */}
          
        </div>

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

        <div className="flex items-center gap-5">
          <button
            onClick={handleStart}
            className="bg-[#45368f] cursor-pointer text-base hover:bg-[#372a73] text-white px-6 py-2 rounded"
          >
            Start Assessment
          </button>
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
              {/* Part 1,4 */}
              <div>
                <p className="font-semibold text-lg">
                  Part 1, 4 (Question 1-13 &amp; 16,17)
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-semibold">
                      Dịch kỹ câu hỏi, đáp án và đọc đi đọc lại khoảng 30-40 lần
                      đến khi thuộc
                    </span>
                    , để đi thi có nhận diện đáp án và khoanh theo.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Lưu ý: Question 1-13 &amp; 16,17 sẽ không kèm băng ghi âm và transcript.
                    </span>{" "}
                    Bạn học thuộc theo đáp án đúng luôn vì đáp án đúng chỉ có duy
                    nhất một, và các câu này không bao giờ bị tráo.
                  </li>
                
                </ul>
              </div>

              {/* Part 2,3 */}
              <div>
                <p className="font-semibold text-lg">Part 2,3 (Question 14,15)</p>
                <ul className="list-disc pl-5">
                  <li>
                    <span className="font-semibold">Question 14:</span> tráo thứ
                    tự nói của 4 người trong băng ghi âm ⇒ thứ tự đáp án bị tráo
                    theo.
                  </li>
                  <li>
                    <span className="font-semibold">Question 15:</span> tráo
                    giọng nói của nam/nữ ⇒ đáp án W/M bị đổi chỗ lẫn nhau.
                  </li>
                  <div className="flex flex-col pl-10">
                    <li>
                    Vì vậy, key Nghe cho Part 2,3 cần phải{" "}
                    <span className="font-semibold">
                      học từ audio (băng ghi âm) và transcript
                    </span>{" "}
                    để đọc dịch từ vựng và hiểu rõ lý do chọn đáp án.
                  </li>
                  <li>
                    Băng ghi âm được giảng viên mang về và thiết kế lại bằng trí
                    nhớ ⇒ chỉ giống về{" "}
                    <span className="font-semibold">nội dung chính</span>, không
                    thể giống từng từ.
                  </li>
                  </div>
                  <li>
                    Cách học: Nghe cẩn thận theo audio và chọn đáp án →{" "}
                    <span className="font-semibold">check đáp án</span> và{" "}
                    <span className="font-semibold">soát lại kỹ transcript</span>
                    , nghe lại nhiều lần, để khi đi thi có thể nghe lại và chọn
                    lại nếu đề có tráo.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-yellow-50 p-3 text-yellow-900 border border-yellow-200">
                <p className="font-semibold">Tóm tắt nhanh</p>
                <ul className="list-disc pl-5">
                  <li>
                    Q1–13 &amp; 16–17: học thuộc đáp án đúng (không audio/transcript), đọc-dịch 30–40 lần.
                  </li>
                  <li>
                    Q14–15: học thực chất từ audio + transcript vì có tráo nội tại; luyện nghe – soát transcript – kiểm tra lại key.
                  </li>
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
                  handleStart();
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
