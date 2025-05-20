import { useEffect, useState } from "react";

const useDevToolsDetection = (): boolean => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const detect = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      const isOpen = widthDiff > threshold || heightDiff > threshold;
      setIsDevToolsOpen(isOpen);
    };

    const interval = setInterval(detect, 1000);
    return () => clearInterval(interval);
  }, []);

  return isDevToolsOpen;
};

export default useDevToolsDetection;
