import { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons"; // Ant Design icon, replace if needed

type Props = {
  scrollThreshold?: number; // Customize how far the user has to scroll before showing the button
};

export default function BackToTop({ scrollThreshold = 300 }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-[#5a05a566] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      } hover:bg-[#5a05a5]`}
      aria-label="Back to top"
    >
      <ArrowUpOutlined className="text-xl" />
    </button>
  );
}
