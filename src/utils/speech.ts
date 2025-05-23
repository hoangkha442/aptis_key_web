export const speakText = (text: string, onEnd: () => void) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};
