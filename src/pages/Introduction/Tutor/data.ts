import tutor1 from "../../../assets/1.png";
import tutor2 from "../../../assets/2.png";
import tutor3 from "../../../assets/3.png";
import tutor4 from "../../../assets/4.png";
import tutor5 from "../../../assets/5.png";

export const tutors = [
  {
    name: "Aptis Express Pack",
    price: "400.000 ₫",
    image: tutor2,
    description: [
      "Tương tự gói Pro nhưng chỉ kích hoạt tài khoản trước ngày thi 14 ngày.",
      "Phù hợp với người cần ôn gấp, còn rất ít thời gian học.",
      "Không bảo hành: hỗ trợ tài khoản trong 1 lần thi duy nhất.",
    ],
    warranty: false,
  },
  {
    name: "Aptis Pro Pack",
    price: "800.000 ₫",
    image: tutor1,
    description: [
      "Tài khoản luyện thi mô phỏng 100% bài thi thật trên nền tảng Passkey Center.",
      "Truy cập trọn bộ đề chuyên sâu theo từng kỹ năng",
      "Tặng giáo án học Nói & Viết: cấu trúc, từ vựng, chiến thuật theo từng dạng câu hỏi.",
      "Hỗ trợ tài khoản đến khi bạn đạt band điểm mục tiêu.",
    ],
    warranty: true,
  },
  {
    name: "Aptis Premium Plus",
    price: "1.200.000 ₫",
    image: tutor3,
    description: [
      "Gói học toàn diện: Bao gồm tài khoản Pro + 8 video bài giảng lý thuyết & chiến lược.",
      "Video phân tích kỹ từng dạng đề trong 4 kỹ năng, kèm mẫu bài chi tiết.",
      "Hỗ trợ liên tục đến khi đạt mục tiêu thi cử.",
    ],
    warranty: true,
  },
  {
    name: "Aptis B1 Guaranteed",
    price: "1.700.000 ₫",
    image: tutor4,
    description: [
      "Khóa học B1 cam kết đầu ra: sát đề, có hệ thống, lộ trình rõ ràng.",
      "Học với bộ đề trúng đích cao, giảng viên đồng hành đến ngày thi.",
      "Bảo hành đến khi bạn đạt chứng chỉ B1 theo đúng mục tiêu.",
    ],
    warranty: true,
  },
  {
    name: "Aptis B2 Guaranteed",
    price: "2.000.000 ₫",
    image: tutor5,
    description: [
      "Khóa học dành riêng cho mục tiêu B2 với hệ thống đề chuyên biệt.",
      "Giảng viên hướng dẫn chiến lược xử lý từng kỹ năng hiệu quả nhất.",
      "Cam kết đồng hành và hỗ trợ tài khoản đến khi đạt chứng chỉ B2.",
    ],
    warranty: true,
  },
];
