import React from "react";
import { testimonials } from "./data";


const Testimonials: React.FC = () => {
  return (
    <section className="sm:py-20 py-10 pb-28 h-full">
      <div className="text-center max-w-7xl mx-auto px-6">
      <p className="text-sm leading-5 md:leading-6 font-medium text-heading mb-4 inline-block px-5 py-2 rounded-full uppercase bg-[#430486] text-white">
          Phản hồi từ học viên
        </p>
        <p className="font-bold text-2xl md:text-[34px] leading-7 md:leading-9 xl:leading-[1.1] text-[#192335]">
          Học viên nói gì về <span className="bg-gradient-to-r from-[#2f57ef] via-[#7f2fef] to-[#a048cf] text-transparent bg-clip-text">PassKey Center</span>
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-lg transition-transform duration-300 ${
                testimonial.gradient
                  ? "bg-gradient-to-b from-[#520ba5] to-[#8935d4] text-white"
                  : "bg-white text-black border border-gray-200"
              }`}
            >
              {/* Star Ratings */}
              <div className="flex justify-center mb-4 !border-none">
                {"⭐".repeat(5)}
              </div>

              {/* Review Text */}
              <p className="text-sm text-center">{testimonial.review}</p>

              {/* User Info */}
              <div className="flex items-center justify-center mt-6 gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-[#FF7779] object-cover" />
                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
