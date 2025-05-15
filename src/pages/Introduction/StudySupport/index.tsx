import TabsSection from "../_component/TabsSection"

type Props = {}

export default function StudySupport({}: Props) {
  return (
    <section className="relative z-10 bg-gradient-to-b from-[#9135DD42] to-[#43048694] sm:py-20 py-10 pb-28 h-full">
      <div className="text-center max-w-7xl mx-auto px-6">
        <p className="text-sm leading-5 md:leading-6 font-medium text-heading mb-4 inline-block px-5 py-2 rounded-full uppercase bg-[#430486] text-white">
          Kỹ năng nào khó, có aptis lo!
        </p>
        <p className="font-bold text-2xl md:text-[34px] leading-7 md:leading-9 xl:leading-[1.1] text-[#192335]">
          Với <span className="bg-gradient-to-r from-[#2f57ef] via-[#7f2fef] to-[#a048cf] text-transparent bg-clip-text">PassKey Center</span>, việc học của trở nên dễ dàng hơn
        </p>
        <TabsSection />
      </div>
    </section>
  )
}