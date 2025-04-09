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

export const calculateScore = (
  user: Record<string, any>,
  correct: Record<string, any>
): number => {
  let score = 0;
  for (const [id, val] of Object.entries(correct.part1 || {})) {
    if (user.part1?.[id] === val) score += 2;
  }
  for (const [slot, id] of Object.entries(correct.part2 || {})) {
    if (user.part2?.[slot]?.reading_part_2_id === id) score += 1;
  }
  for (const [slot, id] of Object.entries(correct.part3 || {})) {
    if (user.part3?.[slot]?.reading_part_3_id === id) score += 1;
  }
  for (const [id, val] of Object.entries(correct.part4 || {})) {
    if (user.part4?.[id] === val) score += 1;
  }
  for (const [sort, val] of Object.entries(correct.part5 || {})) {
    if (user.part5?.[sort] === val) score += 2;
  }
  return score;
};

export const convertScoreToCEFR = (score: number): string => {
  if (score <= 15) return "A1";
  if (score <= 23) return "A2";
  if (score <= 33) return "B1";
  if (score <= 41) return "B2";
  return "C";
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
