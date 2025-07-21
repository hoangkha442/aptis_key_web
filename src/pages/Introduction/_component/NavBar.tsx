import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/passkey_logo.png";
import mascot from "../../../assets/welcome-passkey.png";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

type Props = {};

export default function NavBar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const location = useLocation().pathname;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setScrollDirection("down");
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setIsScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderButton = () => {
    return (
      <div className="p-1 rou">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-[#2f57ef] hover:bg-blue-700 transition-all duration-500 text-white text-lg font-semibold px-6 py-3 rounded-lg cursor-pointer"
        >
          Bắt đầu
        </button>
      </div>
    );
  };

  return (
    <section
      className={`fixed top-0 w-full z-20 transition-transform duration-500 ${
        isScrolled
          ? scrollDirection === "up"
            ? "translate-y-0 bg-white shadow-md"
            : "-translate-y-full bg-white shadow-md"
          : "translate-y-0 bg-transparent"
      }`}
    >
      <nav>
        <div className="flex px-8 pl-0 xl:px-[50px] items-center py-6 justify-between">
          {/* Logo */}
          <a href="/introduction" className="flex items-center">
            <img src={mascot} alt="mascot" className="h-16 w-16 object-cover" />
            <img
              src={logo}
              alt="Logo"
              className="w-[100px] h-[40px] md:w-[150px] md:h-[80px] object-cover"
            />
          </a>
          {/* Button Group */}
          <div className="xl:hidden sm:inline-block hidden">
            {renderButton()}
          </div>

          {/* Hamburger Icon */}
          <div className="xl:hidden z-50">
            <button
              onClick={toggleMenu}
              className="text-2xl text-[#111] focus:outline-none"
            >
              {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
          {/* Menu Links */}
          <div
            className={`fixed top-0 right-0 w-1/2 sm:w-1/4 bg-white shadow-lg z-40 transform transition-transform duration-500 xl:pt-0 pt-16 ${
              isMenuOpen ? "translate-x-0 h-screen" : "translate-x-full h-full"
            } xl:relative xl:translate-x-0 xl:w-auto xl:bg-transparent xl:shadow-none`}
          >
            <ul className="flex flex-col xl:flex-row items-start xl:items-center gap-8 p-8 xl:p-0 text-[#111] font-bold text-[15px] leading-[1.6]">
              <li className="py-[10px] relative overflow-hidden group cursor-pointer">
                <a href="#tai_lieu">
                  <span
                    className={`relative text-black pb-[6px] transition-all duration-300 ${
                      location === "/gioi-thieu"
                        ? "text-[#430486]"
                        : "hover:text-[#430486]"
                        // #430486
                    }`}
                  >
                    Tài liệu
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#430486] transition-all duration-300  ${
                        location === "/gioi-thieu"
                          ? "w-full"
                          : "group-hover:w-full"
                      }`}
                    ></span>
                  </span>
                </a>
              </li>

              <li className="py-[10px] relative overflow-hidden group cursor-pointer">
                <a href="#khoa_hoc">
                  <span
                    className={`relative text-black pb-[6px] transition-all duration-300  ${
                      location === "/khoa-hoc"
                        ? "text-[#430486]"
                        : "hover:text-[#430486]"
                    }`}
                  >
                    Khóa học
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#430486] transition-all duration-300  ${
                        location === "/khoa-hoc"
                          ? "w-full"
                          : "group-hover:w-full"
                      }`}
                    ></span>
                  </span>
                </a>
              </li>

              <li className="py-[10px] relative overflow-hidden group cursor-pointer">
                <a href="#cau_hoi_thuong_gap">
                  <span className="relative text-black pb-[6px] transition-all duration-300 hover:text-[#430486]">
                    Câu hỏi thường gặp
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#430486] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>

              <li className="py-[10px] relative overflow-hidden group cursor-pointer">
                <a
                  href="https://www.facebook.com/profile.php?id=61575505517802"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    className={`relative text-black pb-[6px] transition-all duration-300`}
                  >
                    Đăng ký học
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-0 bg-[#430486] transition-all duration-300  ${
                        location === "/lien-he"
                          ? "w-full"
                          : "group-hover:w-full"
                      }`}
                    ></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="hidden xl:inline-block">{renderButton()}</div>
        </div>
      </nav>
    </section>
  );
}
