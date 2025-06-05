
// import { Collapse, message } from "antd";
// import type { CollapseProps } from "antd";
// import { DriveFile } from "../../../types";

// interface VideoCollapseProps {
//   groupedByBuoi: Record<string, DriveFile[]>;
//   onSelectVideo: (file: DriveFile) => void;
//   isVideoAllowed: boolean;
// }

// export const VideoCollapse = ({
//   groupedByBuoi,
//   onSelectVideo,
//   isVideoAllowed,
// }: VideoCollapseProps) => {

//   const videoTitles: Record<string, string> = {
//     "aptis_buoi_6.mkv": "Buổi 6: Listening 1-13 & 16-17",
//     "aptis_buoi_5.mkv": "Buổi 5: Writing Part 1 & 2",
//     "aptis_buoi_4.mkv": "Buổi 4: Reading Part 5",
//     "aptis_buoi_3.mkv": "Buổi 3: Reading Part 4",
//     "aptis_buoi_2.mkv": "Buổi 2: Reading Part 1, 2 & 3",
//     "aptis_buoi_1.2.mkv": "Buổi 1.2: Writing Part 2 & 4",
//     "aptis_buoi_1.1.mkv": "Buổi 1.1: Tổng quan Aptis",
//     "aptis_buoi_7.mkv": "Buổi 7: Writing Part 3",
//     "aptis_buoi_8.mkv": "Buổi 8: Listening question 14-15",
//     "aptis_buoi_9.mkv": "Buổi 9: Writing Part 4",
//     "aptis_buoi_10.mkv": "Buổi 10: Giải đề",
//   };

//   const collapseItems: CollapseProps["items"] = Object.entries(groupedByBuoi).map(
//     ([buoi, fileList], index) => {
//       const isBuoi1 = buoi.includes("Buổi 1");
//       const canViewBuoi = isVideoAllowed || isBuoi1;
//       return {
//         key: buoi,
//         showArrow: false,
//         label: (
//           <div className="flex items-center justify-center">
//             <div
//               className={`rounded-full hover:bg-gradient-to-br bg-gradient-to-br hover:from-[#261297] hover:to-indigo-500 from-[#45368f] to-indigo-500 !transition-all !duration-500 text-white flex items-center justify-center font-bold text-center `}
//               style={{
//                 width: "80px",
//                 height: "80px",
//                 fontSize: "14px",
//                 lineHeight: "1.2",
//               }}
//             >
//               Buổi <span className="ml-1"> {index + 1}</span>
//             </div>
//           </div>
//         ),
//         children: (
//           <div className="flex p-4">
//             <div className="w-1/2 pr-4">
//               <p className="font-semibold mb-2">Video</p>
//               <ul className="list-disc pl-5 space-y-1">
//                 {fileList.map((file) => {
//                   const isBuoi1_1 = file.name.includes("buoi_1.1");
//                   const canViewVideo = isVideoAllowed || isBuoi1_1;
//                   const videoTitle = videoTitles[file.name] || file.name; 
//                   return (
//                     <li className="!list-none" key={file.id}>
//                       <span
//                         onClick={() => canViewVideo && onSelectVideo(file)}
//                         className={`font-medium px-4 py-2 flex gap-3 items-center ${
//                           canViewVideo
//                             ? "text-blue-800 rounded-sm hover:bg-blue-100 transition-all duration-500 cursor-pointer"
//                             : "text-gray-400 cursor-not-allowed"
//                         }`}
//                       >
//                         {videoTitle}{" "}
//                         {canViewVideo && (
//                           <span className="relative flex w-3 h-3 pt-[1px]">
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
//                             <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
//                           </span>
//                         )}{" "}
//                         {!canViewVideo && " (Bị khóa)"}
//                       </span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             <div className="w-px bg-gray-300 mx-4" />

//             <div className="w-1/2 pl-4">
//               <p className="font-semibold mb-2">Tài liệu</p>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li className="list-none">
//                   {canViewBuoi ? (
//                     <button
//                       onClick={() => { message.info("Tài liệu chưa được upload.") }}
//                       className="font-medium px-4 py-2 rounded-sm hover:bg-blue-100 transition-all duration-500 !text-blue-800"
//                     >
//                       Tài liệu PDF
//                     </button>
//                   ) : (
//                     <span className="text-gray-400 cursor-not-allowed">
//                       Tài liệu bị khóa
//                     </span>
//                   )}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ),
//       };
//     }
//   );

//   return (
//     <Collapse accordion items={collapseItems} className="!border-none !bg-white" />
//   );
// };

import { Collapse} from "antd";
import type { CollapseProps } from "antd";
import { DriveFile } from "../../../types";

interface VideoCollapseProps {
  groupedByBuoi: Record<string, DriveFile[]>;
  isVideoAllowed: boolean;
}

export const VideoCollapse = ({
  groupedByBuoi,
  isVideoAllowed,
}: VideoCollapseProps) => {
  console.log('groupedByBuoi: ', groupedByBuoi);

  const videoTitles: Record<string, string> = {
    "aptis_buoi_6.mkv": "Buổi 6: Listening 1-13 & 16-17",
    "aptis_buoi_5.mkv": "Buổi 5: Writing Part 1 & 2",
    "aptis_buoi_4.mkv": "Buổi 4: Reading Part 5",
    "aptis_buoi_3.mkv": "Buổi 3: Reading Part 4",
    "aptis_buoi_2.mkv": "Buổi 2: Reading Part 1, 2 & 3",
    "aptis_buoi_1.2.mkv": "Buổi 1.2: Writing Part 2 & 4",
    "aptis_buoi_1.1.mkv": "Buổi 1.1: Tổng quan Aptis",
    "aptis_buoi_7.mkv": "Buổi 7: Writing Part 3",
    "aptis_buoi_8.mkv": "Buổi 8: Listening question 14-15",
    "aptis_buoi_9.mkv": "Buổi 9: Writing Part 4",
    "aptis_buoi_10.mkv": "Buổi 10: Giải đề",
  };

  const documentTitles: Record<string, string> = {
    "aptis_buoi_6.mkv": "https://drive.google.com/drive/folders/1vYGzJjmCYA9XcUbbq-70Ua8K5iXahMyW?usp=drive_link",
    "aptis_buoi_5.mkv": "https://drive.google.com/drive/folders/1EEcRhapmaxBYwNkpdOD_dUWmsk-oCyTf?usp=drive_link",
    "aptis_buoi_4.mkv": "https://drive.google.com/drive/folders/1uXyATlzz3b6uIAlkOxQXQYkfGUzHRbkg?usp=drive_link",
    "aptis_buoi_3.mkv": "https://drive.google.com/drive/folders/18RY6ZOyWCCNbhcQgRu_3f34lIdho-Rt9?usp=drive_link",
    "aptis_buoi_2.mkv": "https://drive.google.com/drive/folders/1nLrKW-X9JdmtkDB0AQMXEw6TWF4LCvl_?usp=drive_link",
    "aptis_buoi_1.2.mkv": "https://drive.google.com/drive/folders/1EjJRrUBMBid6l5-6XAZ4uOAErwmqm8tY?usp=drive_link",
    "aptis_buoi_1.1.mkv": "https://drive.google.com/drive/folders/1EjJRrUBMBid6l5-6XAZ4uOAErwmqm8tY?usp=drive_link",
    "aptis_buoi_7.mkv": "https://drive.google.com/drive/folders/1uC0JrKSjvLDcmDfRLyCmQugZ8nWxEGa3?usp=drive_link",
    "aptis_buoi_8.mkv": "https://drive.google.com/drive/folders/1iHTLGpHifMJflBWsUWmbqn81KNyfaYuS?usp=drive_link",
    "aptis_buoi_9.mkv": "https://drive.google.com/drive/folders/12fRcVajhiDFHewvVNgXlfX9C749mrj6m?usp=drive_link",
    "aptis_buoi_10.mkv": "https://drive.google.com/drive/folders/1fc2MrPtcgiBCALc_GMYptWJ6m8CvQItw?usp=drive_link",
  };

  const collapseItems: CollapseProps["items"] = Object.entries(groupedByBuoi).map(
    ([buoi, fileList], index) => {
      const isBuoi1 = buoi.includes("Buổi 1");
      const canViewBuoi = isVideoAllowed || isBuoi1;
      return {
        key: buoi,
        showArrow: false,
        label: (
          <div className="flex items-center justify-center">
            <div
              className={`rounded-full hover:bg-gradient-to-br bg-gradient-to-br hover:from-[#261297] hover:to-indigo-500 from-[#45368f] to-indigo-500 !transition-all !duration-500 text-white flex items-center justify-center font-bold text-center `}
              style={{
                width: "80px",
                height: "80px",
                fontSize: "14px",
                lineHeight: "1.2",
              }}
            >
              Buổi <span className="ml-1"> {index + 1}</span>
            </div>
          </div>
        ),
        children: (
          <div className="flex p-4">
            <div className="w-1/2 pr-4">
              <p className="font-semibold mb-2">Video</p>
              <ul className="list-disc pl-5 space-y-1">
                {fileList.map((file) => {
                  const isBuoi1_1 = file.name.includes("buoi_1.1");
                  const canViewVideo = isVideoAllowed || isBuoi1_1;
                  const videoTitle = videoTitles[file.name] || file.name; 
                  return (
                    <li className="!list-none" key={file.id}>
                      <a
                        href={file?.url}
                        target="_blank"
                        onClick={() => canViewVideo}
                        className={`font-medium px-4 py-2 flex gap-3 items-center ${
                          canViewVideo
                            ? "text-blue-800 rounded-sm hover:bg-blue-100 transition-all duration-500 cursor-pointer"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {videoTitle}{" "}
                        {canViewVideo && (
                          <span className="relative flex w-3 h-3 pt-[1px]">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
                          </span>
                        )}{" "}
                        {!canViewVideo && " (Bị khóa)"}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-px bg-gray-300 mx-4" />

            <div className="w-1/2 pl-4">
              <p className="font-semibold mb-2">Tài liệu</p>
              <ul className="list-disc pl-5 space-y-1">
                <li className="list-none">
                  {fileList.map((file) => {
                    const documentTitle = documentTitles[file.name] || "Tài liệu chưa có tên";
                    return canViewBuoi ? (
                      <a
                        href={documentTitle}
                        target="_blank"
                        className="font-medium px-4 py-2 rounded-sm hover:bg-blue-100 transition-all duration-500 !text-blue-800"
                      >
                        Tài liệu PDF
                      </a>
                    ) : (
                      <span className="text-gray-400 cursor-not-allowed">
                        Tài liệu bị khóa
                      </span>
                    );
                  })}
                </li>
              </ul>
            </div>
          </div>
        ),
      };
    }
  );

  return (
    <Collapse accordion items={collapseItems} className="!border-none !bg-white" />
  );
};
