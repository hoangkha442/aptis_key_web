import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import logo from "../../../assets/passkey_logo.png";
import mascot from "../../../assets/welcome-passkey.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center space-x-2 h-20 overflow-hidden">
            <img src={mascot} alt="mascot" className="h-20 w-20 object-cover" />
            <img src={logo} alt="PassKeyCenter" className="w-52 h-52" />
          </div>
          <p className="text-gray-600 mt-3">
            PassKey Center chuyên đào tạo và luyện thi chứng chỉ Aptis, giúp học
            viên nâng cao kỹ năng ngôn ngữ và đạt kết quả tốt nhất trong kỳ thi.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a className="text-gray-600 hover:text-purple-600 transition cursor-pointer">
              <FacebookOutlined className="text-xl" />
            </a>
            <a className="text-gray-600 hover:text-purple-600 transition cursor-pointer">
              <TwitterOutlined className="text-xl" />
            </a>
            <a className="text-gray-600 hover:text-purple-600 transition cursor-pointer">
              <YoutubeOutlined className="text-xl" />
            </a>
          </div>

          {/* CTA Button */}
          <button className="mt-5 px-6 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-500 flex items-center space-x-2">
            <a
              href="https://www.facebook.com/profile.php?id=61575505517802"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Liên hệ ngay</span> <ArrowRightOutlined />
            </a>
          </button>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-800 relative pb-2 border-b border-gray-300 underline-animated">
            Liên kết
          </h3>
          <ul className="mt-4 space-y-2">
            {[
              { label: "Tài liệu", href: "#tai_lieu" },
              { label: "Khoá học", href: "#khoa_hoc" },
              { label: "Câu hỏi thường gặp", href: "#cau_hoi_thuong_gap" },
              {
                label: "Đăng ký học",
                href: "https://www.facebook.com/profile.php?id=61575505517802",
                external: true,
              },
            ].map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-gray-600 hover:text-purple-600 transition cursor-pointer"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-purple-800 relative pb-2 border-b border-gray-300 underline-animated">
            Khoá học Aptis
          </h3>
          <ul className="mt-4 space-y-2">
            {[
              "Aptis Pro Pack",
              "Aptis Express Pack",
              "Aptis Premium Plus",
              "Aptis B1 Guaranteed",
              "Aptis B2 Guaranteed",
            ].map((item) => (
              <li key={item}>
                <a
                  href="https://www.facebook.com/profile.php?id=61575505517802"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition cursor-pointer"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-purple-800 relative pb-2 border-b border-gray-300 underline-animated">
            Liên hệ
          </h3>
          <p className="text-gray-600 mt-4">
            <strong>Phone:</strong> 0981 044 225
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> passkeycenter@gmail.com
          </p>

          <h3 className="text-lg font-semibold text-purple-800 relative pb-2 border-b border-gray-300 underline-animated">
            Địa chỉ
          </h3>
          <p className="text-gray-600 mt-4">
            80 Hồ Tùng Mậu, Dĩ An, TP Bình Dương
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
