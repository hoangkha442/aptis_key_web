import { createContext, useContext, useState } from "react";

type ReadingContextType = {
  activePart: number;
  setActivePart: (part: number) => void;
  answers: {
    part1: { [id: number]: string };
    part2: { [slotIndex: number]: any };
    part3: { [slotIndex: number]: any };
    part4: { [id: number]: string };
    part5: { [sortOrder: number]: string };
  };
  setAnswers: React.Dispatch<React.SetStateAction<ReadingContextType["answers"]>>;
};

const ReadingContext = createContext<ReadingContextType | null>(null);

export const ReadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePart, setActivePart] = useState(1);
  const [answers, setAnswers] = useState<ReadingContextType["answers"]>({
    part1: {},
    part2: {},
    part3: {},
    part4: {},
    part5: {},
  });

  return (
    <ReadingContext.Provider value={{ activePart, setActivePart, answers, setAnswers }}>
      {children}
    </ReadingContext.Provider>
  );
};

export const useReadingContext = () => {
  const context = useContext(ReadingContext);
  if (!context) throw new Error("useReadingContext must be used inside <ReadingProvider>");
  return context;
};
