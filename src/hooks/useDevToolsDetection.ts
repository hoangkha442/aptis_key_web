import { useEffect, useState } from "react";

const useDevToolsDetection = (): boolean => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const isMobileDevice = () => {
      // Kiểm tra userAgent
      const userAgentCheck = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
      // Kiểm tra độ rộng màn hình (ví dụ < 768px là mobile)
      const screenWidthCheck = window.innerWidth <= 768;
      return userAgentCheck || screenWidthCheck;
    };

    if (isMobileDevice()) {
      setIsDevToolsOpen(false);
      return; // Không cần detect trên mobile
    }

    const detect = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      const isOpen = widthDiff > threshold || heightDiff > threshold;
      setIsDevToolsOpen(isOpen);
    };

    detect(); // Kiểm tra ngay khi mount
    const interval = setInterval(detect, 1000);

    return () => clearInterval(interval);
  }, []);

  return isDevToolsOpen;
};

export default useDevToolsDetection;
