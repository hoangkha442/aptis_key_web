import { Button, Card, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card
        className="w-full max-w-3xl !shadow-none"
        bordered={false}
        bodyStyle={{ padding: "2rem" }}
      >
        <div className="flex flex-col items-center text-center">
          <SmileOutlined style={{ fontSize: 48, color: "#4A3AFF" }} />
          <Title level={2} className="mt-4 text-[#4A3AFF] uppercase">
            Chào mừng bạn đến với khóa Aptis!
          </Title>
          <Paragraph className="text-gray-600 text-lg max-w-xl mt-2">
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
          </Button>
        </div>
      </Card>
    </div>
  );
}
