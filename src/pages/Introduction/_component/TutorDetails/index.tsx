
import React from "react";
import iconZalo from "../../../../assets/Icon_of_Zalo.svg"
import facebook from "../../../../assets/facebook-messenger-icon.svg"
type TutorDetailsProps = {
  name: string;
  price: string;
  description: string[];
  image: string;
  warranty?: boolean;
};

const TutorDetails: React.FC<TutorDetailsProps> = ({
  name,
  price,
  description,
  image,
  warranty,
}) => {
  return (
    // <div className="mt-8 flex flex-col md:flex-row gap-6">
    //   {/* Hình ảnh lớn */}
    //   <div className="w-full md:w-1/3 flex">
    //     <img
    //       src={image}
    //       alt={name}
    //       className="w-full md:w-[385px] h-[215px] rounded-xl object-cover"
    //     />
    //   </div>

    //   {/* Thông tin giảng viên */}
    //   <div className="flex-1">
    //     <div className="text-start">
    //       <h2 className="text-2xl font-bold">{name}</h2>
    //       <p className="text-gray-800 font-medium">{title}</p>
    //     </div>

    //     {/* Chia thành 2 cột */}
    //     <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    //       {/* Cột 1 */}
    //       <div className="space-y-4">
    //         <div className="flex gap-4 items-start">
    //           <img src={hat} alt="bachelor" className="w-8 h-8 object-cover" />
    //           <div className="text-start">
    //             <span className="font-semibold text-[#333333] text-base">
    //               Bằng cử nhân:
    //             </span>
    //             <p className="text-[#333333]">{bachelor}</p>
    //           </div>
    //         </div>

    //         <div className="flex gap-4 items-start">
    //           <img
    //             src={book}
    //             alt="teaching method"
    //             className="w-8 h-8 object-cover"
    //           />
    //           <div className="text-start">
    //             <span className="font-semibold text-[#333333] text-base">
    //               Phương pháp giảng dạy:
    //             </span>
    //             <p className="text-[#333333]">{method}</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Cột 2 */}
    //       <div className="space-y-4">
    //         <div className="flex gap-4 items-start">
    //           <img
    //             src={course}
    //             alt="ielts course"
    //             className="w-8 h-8 object-cover"
    //           />
    //           <div className="text-start">
    //             <span className="font-semibold text-[#333333] text-base">
    //               IELTS Course:
    //             </span>
    //             <p className="text-[#333333]">{ieltsCourse}</p>
    //           </div>
    //         </div>

    //         <div className="flex gap-4 items-start">
    //           <img
    //             src={hat}
    //             alt="ielts score"
    //             className="w-8 h-8 object-cover"
    //           />
    //           <div className="text-start">
    //             <span className="font-semibold text-[#333333] text-base">
    //               IELTS Overall:
    //             </span>
    //             <p className="text-[#333333]">{score}</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="mt-8 flex flex-col md:flex-row gap-6">
      {/* Hình ảnh khóa học */}
      <div className="w-full md:w-1/3 flex">
        <div className="w-[385px] h-[285px]">
          <img
          src={image}
          alt={name}
          className="w-full h-full rounded-xl"
        />
        </div>
      </div>
      {/* Thông tin khóa học */}
      <div className="flex-1">
        <div className="text-start">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-800 font-semibold text-lg">{price}</p>
        </div>

        <div className="mt-4">
          <ul className=" grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
            {description.map((line, idx) => (
              <div className="flex gap-2">
                <span>✔</span>
                <li key={idx}>{line}</li>
              </div>
            ))}
          </ul>

          <p
            className={`text-sm font-medium mt-3 text-start ${
              warranty ? "text-green-600" : "text-red-500"
            }`}
          >
            {warranty
              ? "✔ Bảo hành: Hỗ trợ tài khoản Web đến khi thi đạt target."
              : "✖ Không bảo hành: Hỗ trợ 1 lần thi duy nhất."}
          </p>
          <div className="flex items-center gap-4 mt-4">
            {/* Zalo */}
            <a
              href="https://zalo.me/0981044204"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-[#0068FF] hover:bg-gray-50 transition"
            >
              <img src={iconZalo} alt="Zalo" className="w-5 h-5" />
              Zalo
            </a>

            {/* Facebook Messenger */}
            <a
              href="https://www.facebook.com/profile.php?id=61575505517802"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-[#1877F2] hover:bg-gray-50 transition"
            >
              <img
                src={facebook}
                alt="Messenger"
                className="w-5 h-5"
              />
              Messenger
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
