import { useEffect, useState } from "react";
import { readingService } from "../../../config/readingServices";
import { listeningService } from "../../../config/listeningServices";

export default function ReviewPage() {
  const [readingData, setReadingData] = useState<any>(null);
  const [listeningData, setListeningData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState<any>({});

  useEffect(() => {
    const readingId = Number(localStorage.getItem("reading_key_test_id"));
    const listeningId = Number(localStorage.getItem("listening_key_test_id"));
    const simulatedListeningAnswers = JSON.parse(localStorage.getItem("simulated_listening_answers") || "{}");
    const simulatedReadingAnswers = JSON.parse(localStorage.getItem("simulated_reading_answers") || "{}");

    const fetchData = async () => {
      try {
        const [readingRes, listeningRes] = await Promise.all([
          readingService.getReadingKeyTest({ reading_test_id: readingId }),
          listeningService.getListeningTestById({ listening_test_id: listeningId }),
        ]);

        setReadingData(readingRes.data);
        setListeningData(listeningRes.data);

        const newResults: any = {};

        // Listening Part 1
        newResults.listeningP1 = listeningRes.data?.listening_test_items?.["Question 1"]
          .map((q: any) => {
            const qid = q.listening_test_items_id.toString();
            const userAnswer = simulatedListeningAnswers[qid] || "";
            return {
              part: "Listening Part 1",
              question: q.content,
              correctAnswer: q.correct_answer,
              userAnswer,
              isCorrect: userAnswer === q.correct_answer,
            };
          })
          .filter((q: any) => !q.isCorrect);

        // Listening Part 4
        newResults.listeningP4 = listeningRes.data?.listening_test_items?.["Question 14"]
          ?.map((q: any) => {
            const qid = q.listening_test_items_id.toString();
            const userAnswer = simulatedListeningAnswers[qid] || "";
            return {
              part: "Listening Part 4",
              question: q.content,
              correctAnswer: q.correct_answer,
              userAnswer,
              isCorrect: userAnswer === q.correct_answer,
            };
          })
          .filter((q: any) => !q.isCorrect);

        // Listening Part 5
        newResults.listeningP5 = listeningRes.data?.listening_test_items?.["Question 15"]
          ?.map((q: any) => {
            const qid = q.listening_test_items_id.toString();
            const userAnswer = simulatedListeningAnswers[qid] || "";
            return {
              part: "Listening Part 5",
              question: q.content,
              correctAnswer: q.correct_answer,
              userAnswer,
              isCorrect: userAnswer === q.correct_answer,
            };
          })
          .filter((q: any) => !q.isCorrect);

        // Reading Part 1
        newResults.readingP1 = readingRes.data?.reading_part_1.map((q: any) => {
          const qid = q.reading_part_1_id.toString();
          const userAnswer = simulatedReadingAnswers?.part1?.[qid] || "";
          return {
            part: "Reading Part 1",
            question: q.content,
            correctAnswer: q.correct_answer,
            userAnswer,
            isCorrect: userAnswer === q.correct_answer,
          };
        }).filter((q: any) => !q.isCorrect);

        // Reading Part 4
        newResults.readingP4 = readingRes.data?.reading_part_4.map((q: any) => {
          const qid = q.reading_part_4_id.toString();
          const userAnswer = simulatedReadingAnswers?.part4?.[qid] || "";
          return {
            part: "Reading Part 4",
            question: q.paragraph_text,
            userAnswer,
            isCorrect: !!userAnswer
          };
        }).filter((q: any) => !q.isCorrect);

        // Reading Part 5
        newResults.readingP5 = Object.entries(simulatedReadingAnswers?.part5 || {})
          .map(([key, val]: [string, any]) => ({
            part: "Reading Part 5",
            question: `Question ${key}`,
            userAnswer: val,
          }));

        setResults(newResults);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Review - Incorrect or Unanswered Only</h1>
      {Object.keys(results).map((sectionKey) => (
        <div key={sectionKey} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{results[sectionKey][0]?.part}</h2>
          <div className="space-y-4">
            {results[sectionKey].map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-red-50 border-l-4 border-red-400 p-4 shadow rounded"
              >
                <p className="font-medium">Question:</p>
                <p className="mb-2">{item.question}</p>
                <p><span className="font-semibold">Your Answer:</span> {item.userAnswer || <span className="italic text-gray-500">No answer</span>}</p>
                {item.correctAnswer && (
                  <p><span className="font-semibold">Correct Answer:</span> {item.correctAnswer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}