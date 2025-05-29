import { Card } from "antd";
import welcomeAnimation from "../assets/animate_lottie.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";

// const { Title, Paragraph } = Typography;

export default function HomePage() {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  
  return (
    <div className="flex justify-center items-center h-full overflow-hidden">
      <Helmet>
        <title>Trang chủ | PassKey Center</title>
        <meta
          name="description"
          content="Nền tảng luyện thi APTIS chuyên nghiệp. Truy cập nhanh các khóa học, lịch học và thông tin cá nhân tại PassKey Center."
        />
      </Helmet>
      <Card className="w-full max-w-3xl !shadow-none p-[2rem] !border-none">
        <div className="flex flex-col items-center text-center">
          <div className="w-full flex justify-center">
            {isMobile ? <div style={{ width: 800, height: 1000 }}>
              <Lottie
                animationData={welcomeAnimation}
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </div>:
            <div style={{ width: 2000, height: 2500 }}>
              <Lottie
                animationData={welcomeAnimation}
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </div>}
          </div>
          {/* <Paragraph className="text-gray-600 text-lg max-w-xl mt-2">
            Chúng tôi rất vui được đồng hành cùng bạn trong hành trình chinh phục kỳ thi Aptis.
            Hệ thống học tập trực tuyến của chúng tôi giúp bạn luyện tập kỹ năng Nghe, Nói, Đọc, Viết một cách hiệu quả và bài bản.
          </Paragraph>

          <Paragraph className="text-gray-600 text-lg max-w-xl">
            Hãy khám phá các khóa học, lịch học, và tài liệu đã được cá nhân hóa cho bạn. Chúc bạn học tập tốt và đạt kết quả cao!
          </Paragraph>

          <Button
            type="primary"
            size="large"
            className="mt-6 px-6"
            href="/courses"
          >
            Bắt đầu học ngay
          </Button> */}
        </div>
      </Card>
    </div>
  );
}
