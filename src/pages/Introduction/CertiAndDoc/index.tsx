// import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export default function CertiAndDoc() {
  // const [isCooldown, setIsCooldown] = useState(false);



  return (
    <section className="pt-1 md:pt-6 pb-6 ">
      <div className="text-center max-w-7xl mx-auto px-6">
        <p className="text-sm leading-5 md:leading-6 font-medium text-heading mb-4 inline-block px-5 py-2 rounded-full uppercase bg-[#430486] text-white">
          Bạn không cần phải sợ những kỹ năng này nữa
        </p>
        <p className="font-bold text-2xl md:text-[34px] leading-7 md:leading-9 xl:leading-[1.1]  bg-gradient-to-r from-[#2f57ef] via-[#7f2fef] to-[#b966e7] text-transparent bg-clip-text">
          Các tài liệu tại PassKey Center
        </p>
      </div>

      <div className="pt-2 md:pt-6 lg:pt-10">
        <div className="overflow-hidden w-full">
          {/* ITEM 1: Scroll right to left */}
          <div className="flex items-center space-x-4 animate-scroll pt-5 whitespace-nowrap">
            {[
              "Tài liệu Reading - Bậc B2",
              "Tài liệu Listening - Bậc B2",
              "Tài liệu Writing - Bậc B2",
              "Tài liệu Grammar - Cơ bản",
              "Tài liệu Vocabulary - Bậc B2",
              "Practice Test - Bậc B2",
              "Tips & Tricks - Bậc B2",
            ].map((item, index) => (
              <a key={index} className="aptis-card cursor-pointer">
                <PlusOutlined className="mr-2" />
                {item}
              </a>
            ))}
          </div>

          {/* ITEM 2: Scroll left to right */}
          <div className="flex items-center space-x-4 py-5 animate-scroll-reverse whitespace-nowrap">
            {[
              "Tài liệu Reading - Bậc C1",
              "Tài liệu Listening - Bậc C1",
              "Tài liệu Writing - Bậc C1",
              "Tài liệu Speaking - Bậc C1",
              "Tài liệu Vocabulary - Bậc C1",
              "Practice Test - Bậc C1",
              "Advanced Tips & Tricks - Bậc C1",
            ].map((item, index) => (
              <a key={index} className="aptis-card cursor-pointer">
                <PlusOutlined className="mr-2" />
                {item}
              </a>
            ))}
          </div>

          {/* ITEM 3: Scroll right to left */}
          <div className="flex items-center space-x-4 pb-5 animate-scroll whitespace-nowrap">
            {[
              "Tổng hợp bài tập Grammar",
              "Bài tập ngữ pháp nâng cao",
              "Tài liệu phân tích lỗi sai",
              "Đề thi Aptis - Tổng hợp",
              "Mẹo làm bài Aptis",
              "Kỹ năng Speaking chuyên sâu",
            ].map((item, index) => (
              <a key={index} className="aptis-card cursor-pointer">
                <PlusOutlined className="mr-2" />
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
