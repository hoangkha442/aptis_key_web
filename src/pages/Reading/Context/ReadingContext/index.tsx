import { createContext, useContext, useState } from "react";

type ReadingContextType = {
  activePart: number;
  setActivePart: (part: number) => void;
};

const ReadingContext = createContext<ReadingContextType | null>(null);

export const ReadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePart, setActivePart] = useState(1);
  return (
    <ReadingContext.Provider value={{ activePart, setActivePart }}>
      {children}
    </ReadingContext.Provider>
  );
};

export const useReadingContext = () => {
  const context = useContext(ReadingContext);
  if (!context) throw new Error("useReadingContext must be used inside <ReadingProvider>");
  return context;
};
