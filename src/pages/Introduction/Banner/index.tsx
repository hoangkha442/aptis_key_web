import { useEffect, useState } from "react";
import banner from "../../../assets/bannerMonaAcademy.png";
import { StarFilled } from "@ant-design/icons";
import icon1 from "../../../assets/icon1.png";
import icon2 from "../../../assets/icon2.png";
import icon3 from "../../../assets/icon3.png";
import icon4 from "../../../assets/icon4.png";
import Card from "../_component/Card";
import { cardData } from "../_component/Card/CardData";

type Props = {};

export default function Banner({}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const words = [
    "Giảng viên xuất sắc.",
    "Tài liệu đa dạng.",
    "Bài giảng dễ hiểu.",
    "Nội dung bài bản.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative z-10 bg-gradient-to-l from-[#9135DD] to-[#9135DD] py-36 pb-28 h-full">
      {/* Last Image */}
      <div
          className="absolute bottom-[-2px] left-0 w-full h-[145px] bg-cover bg-no-repeat z-[9] "
          style={{ background: `url(https://monaacademy.monamedia.net/wp-content/themes/edumall-child/images/banner-bg-shape-1.svg)`, backgroundPosition: "center center",}}
      ></div>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-white/10"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col md:flex-row">
        <div className="md:pt-10 pt-0">
          <div className="flex space-x-1">
            <StarFilled className="!text-yellow-500" />
            <StarFilled className="!text-yellow-500" />
            <StarFilled className="!text-yellow-500" />
            <StarFilled className="!text-yellow-500" />
            <StarFilled className="!text-yellow-500" />
          </div>
          <p className="text-[#192335] sm:text-lg text-[15px] leading-normal font-semibold">
            200+ sinh viên tin tưởng và yêu quý
          </p>
          <p className="text-[#192335] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[56px] xl:leading-[1.1] font-bold leading-tight mt-2 lg:mt-8">
            Chinh phục mục tiêu học tập APTIS của bạn với
          <span className="relative inline-block h-10 md:h-14 lg:h-[45px] xl:h-[75px] overflow-hidden w-full">
            {words.map((word, index) => (
              <b
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-all xl:pt-1 sm:pt-2 pt-0 duration-[1000ms] ease-[cubic-bezier(.25,.8,.25,1)] ${
                  activeIndex === index
                    ? "translate-y-0 opacity-100"
                    : activeIndex === (index - 1 + words.length) % words.length
                    ? "translate-y-[-100%] opacity-0"
                    : "translate-y-[100%] opacity-0"
                }`}
              >
                <span className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[56px] xl:leading-[1.1]  bg-gradient-to-r from-[#2f57ef] to-[#b966e7] text-transparent bg-clip-text">
                  {word}
                </span>
              </b>
            ))}
          </span>
          </p>
          <p className="mt-1 lg:mt-4 sm:text-lg text-base">
            Sự <span className="underline">thành công</span> của bạn là{" "}
            <span className="underline">niềm vui</span> của chúng tôi
          </p>
        </div>

        <div className="relative w-full z-10">
            <img
                src={banner}
                alt=""
                className="w-full h-full object-cover relative z-10"
            />
            <img
                src={icon1}
                alt="icon1"
                className="absolute top-1/3 left-[3%] w-8 h-8 animate-float"
            />
            <img
                src={icon2}
                alt="icon2"
                className="absolute top-[10%] right-1/2 w-8 h-8 animate-float"
            />
            <img
                src={icon3}
                alt="icon3"
                className="absolute bottom-[20%] left-[8%] w-8 h-8 animate-float"
            />
            <img
                src={icon4}
                alt="icon4"
                className="absolute bottom-1/3 right-[3%] w-8 h-8 animate-float"
            />
        </div>
      </div>

        {/* Card */}
      <div className="max-w-7xl mx-auto px-8 pt-4">
          <div className="relative z-[45] mt-0 mb-0 bg-[#430486] rounded-[10px] transition-[background ,border-radius,box-shadow] duration-300">
            {/* Background Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(145,53,221,0.63)] via-[rgba(145,53,221,0.63)] to-[rgba(200,50,180,0.5)] backdrop-blur-[15px] rounded-[10px] pointer-events-none"></div>
            {/* Content Card */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  image={card.image}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
      </div>

    </section>
  );
}
