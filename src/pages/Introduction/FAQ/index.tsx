import { useState } from "react";
import { faqs } from "./data";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";


const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#430486] text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <p className="text-sm font-medium text-white inline-block px-5 py-2 rounded-full uppercase bg-[#6d1fa0]">
          Bạn hỏi - PassKey Center trả lời!
        </p>
        <h2 className="font-semibold text-2xl md:text-[32px] leading-9 py-3 text-[#FFFFFFAB]">
          Câu hỏi thường gặp
        </h2>

        {/* FAQ List */}
        <div className="sm:mt-8 mt-2 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full flex justify-between items-center py-4 text-left text-sm sm:text-lg font-medium sm:gap-0 gap-1"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <MinusOutlined className="text-white text-xl" />
                ) : (
                  <PlusOutlined className="text-white text-xl" />
                )}
              </button>
              {/* Answer with animation */}
              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openIndex === index ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#D3D3D3] pb-4 text-start">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
