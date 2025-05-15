import { CardProps } from "../../../../types";

export default function Card({ image, title, description }: CardProps) {
  return (
    <div className="p-7 border-b border-b-[#FFFFFF1A] lg:border-b-[0px] border-r border-r-[#FFFFFF1A] hover:-translate-y-5 hover:-translate-x-1 hover:bg-black hover:rounded-[15px] transition-transform duration-500 ease-in-out transform">
      <figure className="mb-2 sm:mb-4 sm:inline-block flex justify-center">
        <img src={image} alt={title} className="w-1/4 sm:w-[30%] object-cover" />
      </figure>
      <div className="text-white">
        <p className="text-lg font-semibold mb-1 sm:mb-3 sm:text-left text-center">{title}</p>
        <p className="text-base font-normal sm:text-left text-center">{description}</p>
      </div>
    </div>
  );
}
