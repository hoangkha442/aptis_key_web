import { TitleProps } from "../../types"

export default function TitleIntroduction({ title, description}: TitleProps) {
  return (
    <section className="relative z-10 bg-gradient-to-l from-[#430486] to-[#9135DD] py-16 mt-20 sm:mt-24 md:mt-32 lg:mt-36 xl:mt-44 h-full">
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-transparent bg-gradient-to-b from-white to-white/10 opacity-100 transition-all duration-300"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black">{title}</p>
        <p className="font-semibold text-sm sm:text-lg text-[#192335] mt-3">{description}</p>
      </div>
    </section>
  )
}