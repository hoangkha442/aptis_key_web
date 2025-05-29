import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import { ReadingPart3Question } from "../../../../types/reading";
import { useEffect, useState } from "react";



type Question = ReadingPart3Question;

type DragItem = {
  question: Question;
  from: "list" | number;
};

type Question3Props = {
  questions: Question[];
  slotAnswers: { [slotIndex: number]: Question | null };
  setSlotAnswers: (answers: { [slotIndex: number]: Question | null }) => void;
};

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Question3({ questions, slotAnswers, setSlotAnswers }: Question3Props) {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
  }, [questions]);
  const allSlotIndexes = shuffledQuestions.map((_, i) => i + 1);

  const initializedSlotAnswers = allSlotIndexes.reduce((acc, idx) => {
    acc[idx] = slotAnswers[idx] ?? null;
    return acc;
  }, {} as { [slotIndex: number]: Question | null });

  const placedIds = Object.values(initializedSlotAnswers)
    .filter((q): q is Question => !!q)
    .map((q) => q.reading_part_3_id);

  const unplacedQuestions = shuffledQuestions.filter(
    (q) => !placedIds.includes(q.reading_part_3_id)
  );

  const moveToSlot = (question: Question, from: "list" | number, to: number) => {
    const updated = { ...initializedSlotAnswers };

    if (typeof from === "number") {
      updated[from] = null;
    }

    Object.entries(updated).forEach(([key, val]) => {
      if (val?.reading_part_3_id === question.reading_part_3_id) {
        updated[parseInt(key)] = null;
      }
    });

    updated[to] = question;
    setSlotAnswers(updated);
  };

  const removeFromSlot = (from: number) => {
    const updated = { ...initializedSlotAnswers };
    updated[from] = null;
    setSlotAnswers(updated);
  };

  return (
    <div className="space-y-4">
      <p className="font-semibold text-base my-5">{shuffledQuestions[0]?.description}</p>
      <div className="flex sm:gap-8 gap-3">
        <div className="flex-1 space-y-2 border sm:p-4 p-2 bg-gray-50 border-[#e5e7eb]">
          <h3 className="text-sm mb-4 font-medium">{shuffledQuestions[0]?.name_of_test}</h3>
          {allSlotIndexes.map((idx) => (
            <DropSlot
              key={idx}
              index={idx}
              answer={initializedSlotAnswers[idx]}
              onDrop={(question, from) => moveToSlot(question, from, idx)}
            />
          ))}
        </div>
        <DropListArea
          unplacedQuestions={unplacedQuestions}
          onDrop={(question, from) => {
            console.log('question: ', question);
            if (typeof from === "number") {
              removeFromSlot(from);
            }
          }}
        />
      </div>
    </div>
  );
}

function DropListArea({
  unplacedQuestions,
  onDrop,
}: {
  unplacedQuestions: Question[];
  onDrop: (question: Question, from: "list" | number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop<DragItem, void, {}>({
    accept: "QUESTION",
    drop: (item) => {
      onDrop(item.question, item.from);
    },
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className="flex-1 space-y-2 border sm:p-4 p-2 bg-gray-50 border-[#e5e7eb]"
    >
      <div className=" mb-8"></div>
      {unplacedQuestions.map((q) => (
        <DraggableBlock key={q.reading_part_3_id} question={q} from="list" />
      ))}
      {unplacedQuestions.length === 0 && (
        <p className="italic text-sm text-gray-500">All the paragraphs have been assigned.</p>
      )}
    </div>
  );
}

function DraggableBlock({ question, from }: { question: Question; from: "list" | number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(
    {
      type: "QUESTION",
      item: { question, from },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }
  );

  drag(ref);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-1 p-3 border-1 bg-white border-dashed border-[#e5e7eb] cursor-move sm:!text-sm !text-xs ${isDragging ? "opacity-50" : ""
        }`}
    >
      {question.content}
    </div>
  );
}

function DropSlot({
  index,
  answer,
  onDrop,
}: {
  index: number;
  answer: Question | null;
  onDrop: (question: Question, from: "list" | number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: "QUESTION",
    drop: (item) => {
      onDrop(item.question, item.from);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-1 border-1 bg-gray-100 border-dashed border-[#e5e7eb]  ${isOver ? "bg-blue-100" : "bg-gray-50"
        } ${answer ? "py-0" : "py-2"}`}
    >
      <div className="flex-1">
        {answer ? (
          <DraggableBlock question={answer} from={index} />
        ) : (
          <span className="text-gray-400 italic p-2"></span>
        )}
      </div>
    </div>
  );
}
