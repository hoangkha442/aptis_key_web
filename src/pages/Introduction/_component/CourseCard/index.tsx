type CourseCardProps = {
  name: string;
  price: string;
  image: string;
  description: string[];
  warranty: boolean;
  onClick: () => void;
  isActive: boolean;
};

export default function CourseCard({
  name,
  price,
  image,
  description,
  warranty,
  onClick,
  isActive,
}: CourseCardProps) {
  return (
    <div
      className={`cursor-pointer flex flex-col rounded-xl border transition-all duration-300 hover:shadow-md overflow-hidden ${
        isActive ? "bg-[#f3e8ff] border-[#a855f7]" : "bg-white border-gray-300"
      }`}
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-[160px] object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-purple-700">{name}</h3>
        <p className="text-xl font-bold mt-2 text-[#111]">{price}</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600 flex-1">
          {description.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
        <p
          className={`mt-3 font-medium text-sm ${
            warranty ? "text-green-600" : "text-red-500"
          }`}
        >
          {warranty
            ? "✔ Bảo hành đến khi đạt target"
            : "✖ Không bảo hành"}
        </p>
      </div>
    </div>
  );
}
