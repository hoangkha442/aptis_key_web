// src/pages/Reading/_components/question3.tsx

import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import { ReadingPart3Question } from "../../../../types/reading";


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

export default function Question3({ questions, slotAnswers, setSlotAnswers }: Question3Props) {
  const allSlotIndexes = questions.map((_, i) => i + 1);

  const initializedSlotAnswers = allSlotIndexes.reduce((acc, idx) => {
    acc[idx] = slotAnswers[idx] ?? null;
    return acc;
  }, {} as { [slotIndex: number]: Question | null });

  const placedIds = Object.values(initializedSlotAnswers)
    .filter((q): q is Question => !!q)
    .map((q) => q.reading_part_3_id);

  const unplacedQuestions = questions.filter(
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
      <p className="font-semibold text-lg">Sắp xếp các đoạn sau theo thứ tự hợp lý:</p>
      <div className="flex gap-8">
        <DropListArea
          unplacedQuestions={unplacedQuestions}
          onDrop={(question, from) => {
              if (typeof from === "number") {
                  removeFromSlot(from);
                  console.log('question: ', question);
            }
          }}
        />
        <div className="flex-1 space-y-3 border rounded p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Thứ tự cần sắp xếp</h3>
          {allSlotIndexes.map((idx) => (
            <DropSlot
              key={idx}
              index={idx}
              answer={initializedSlotAnswers[idx]}
              onDrop={(question, from) => moveToSlot(question, from, idx)}
            />
          ))}
        </div>
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
      className="flex-1 space-y-2 border rounded p-4 bg-gray-50 min-h-[150px]"
    >
      <h3 className="font-semibold mb-2">Danh sách đoạn văn</h3>
      {unplacedQuestions.map((q) => (
        <DraggableBlock key={q.reading_part_3_id} question={q} from="list" />
      ))}
      {unplacedQuestions.length === 0 && (
        <p className="italic text-sm text-gray-500">Tất cả đoạn đã được đặt</p>
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
      className={`p-2 border rounded bg-white shadow-sm cursor-move transition ${
        isDragging ? "opacity-50" : ""
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
      className={`min-h-[60px] bg-white transition flex items-start ${
        isOver ? "bg-blue-100" : "bg-gray-50"
      }`}
    >
      <div className="flex-1">
        {answer ? (
          <DraggableBlock question={answer} from={index} />
        ) : (
          <span className="text-gray-400 italic p-2">Kéo đoạn văn vào đây</span>
        )}
      </div>
    </div>
  );
}
