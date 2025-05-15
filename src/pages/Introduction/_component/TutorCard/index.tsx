import React from "react";

type TutorCardProps = {
  name: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
};

const TutorCard: React.FC<TutorCardProps> = ({ name, image, isActive, onClick }) => {
  return (
    <div
      className={`cursor-pointer flex flex-col items-center p-4 rounded-xl border transition-all duration-300 md:mt-8 mt-0 py-5 ${
        isActive ? "bg-[#FCECEC] border-[#F5B5B5] shadow-lg" : "bg-white border-gray-300"
      }`}
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-16 h-16 rounded-full mb-2 object-cover" />
      <p className="text-sm font-semibold text-center">{name}</p>
    </div>
  );
};

export default TutorCard;
