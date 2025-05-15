import { useState } from "react";

// Import hình ảnh từ assets
import tab1 from "../../../../assets/tab1.jpg";
import tab2 from "../../../../assets/tab2.jpg";
import tab3 from "../../../../assets/tab3.jpg";
import tab4 from "../../../../assets/tab4.jpg";
import tab5 from "../../../../assets/tab5.jpg";
import tab6 from "../../../../assets/tab6.jpg";

// Định nghĩa kiểu dữ liệu của Tab
type Tab = {
  title: string;
  image: string;
};

// Danh sách các tab
const tabs: Tab[] = [
  {
    title: "Rút ngắn thời gian ôn tập",
    image: tab1,
  },
  {
    title: "Tài liệu bài bản, cô đọng, dễ hiểu",
    image: tab2,
  },
  {
    title: "Hỗ trợ và giải đáp thắc mắc 1:1",
    image: tab3,
  },
  {
    title: "Học cùng giảng viên xuất sắc",
    image: tab4,
  },
  {
    title: "Nội dung ôn tập",
    image: tab5,
  },
  {
    title: "Đề thi thử",
    image: tab6,
  },
];

export default function TabsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
      {/* Danh sách tabs */}
      <div className="space-y-2 relative">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-full text-left sm:px-8 px-4 sm:py-6 py-3 rounded-lg sm:text-base text-sm font-medium sm:font-semibold transition-all duration-300 ${
              activeIndex === index
                ? "bg-[#430486] text-white md:after:content-[''] md:after:absolute md:after:top-1/2 md:after:ml-[2px] md:after:left-full md:after:border-l-[20px] md:after:border-l-[#430486] md:after:border-y-[12px] md:after:border-y-transparent md:after:mt-[-12px] md:after:opacity-100"
                : "bg-black/5 text-white md:after:opacity-0"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Hiển thị nội dung của tab */}
      <div className="rounded-xl flex flex-col items-center w-full">
        <img
            src={tabs[activeIndex].image}
            alt={tabs[activeIndex].title}
            className="w-full max-w-[585px] h-auto md:h-[585px] rounded-lg"
        />
      </div>

    </div>
  );
}
