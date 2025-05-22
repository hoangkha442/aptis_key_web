import { Typography, Divider, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;

const TOTAL_LISTENING_EXAMS = 12;
// const TOTAL_READING_EXAMS = 14;
const MAX_ATTEMPTS = 5;

export default function SimulatedExamRoom() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const attemptsLeft = MAX_ATTEMPTS;

  const handleStartConfirm = () => {
    if (attemptsLeft <= 0) {
      message.warning("Bạn đã hết lượt làm bài.");
      return;
    }
    setIsModalOpen(true); 
  };

  const handleStartConfirmed = () => {
    const listeningId = Math.floor(Math.random() * TOTAL_LISTENING_EXAMS) + 1;
    localStorage.setItem("listening_key_test_id", String(listeningId));
    navigate("/simulated-exam-room/listening/take-test/intro");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
      <div className="rounded-2xl p-6">
        <div className="text-center">
          <Title level={2} className="text-[#45368f] font-bold">
            Phòng Thi Mô Phỏng - <span className="text-purple-600">(ĐANG THỬ NGHIỆM)</span>
          </Title>
          <Paragraph className="text-gray-600 max-w-2xl mx-auto mt-2">
            Luyện tập toàn diện 4 kỹ năng theo định dạng bài thi thực tế. Mỗi
            lần làm bài sẽ được hệ thống chọn ngẫu nhiên 1 đề từ ngân hàng đề đã
            cung cấp.
          </Paragraph>
        </div>
        <Divider className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 mb-6">
          <SkillItem
            title="Reading"
            desc="Kiểm tra khả năng đọc hiểu và phân tích thông tin."
          />
          <SkillItem
            title="Listening"
            desc="Đo lường kỹ năng nghe và hiểu ngữ cảnh hội thoại."
          />
          <SkillItem
            title="Writing"
            desc="Phát triển ý tưởng và trình bày rõ ràng qua văn bản."
          />
          <SkillItem
            title="Speaking"
            desc="Trình bày quan điểm và tương tác tự nhiên bằng tiếng Anh."
          />
        </div>
        <Divider />
        <div className="text-center">
          <Paragraph className="text-base text-gray-700 mb-2">
            Bạn còn{" "}
            <Text strong className="!text-base">
              {attemptsLeft}
            </Text>{" "}
            lượt làm bài.
          </Paragraph>
          <Paragraph className="text-sm text-gray-600 mb-6">
            Mỗi kỹ năng sẽ được chọn ngẫu nhiên từ ngân hàng đề hiện có.
          </Paragraph>
          <button
            className="px-6 py-3 bg-[#45368f] text-white rounded-lg cursor-pointer hover:bg-[#372a73] text-base font-medium"
            onClick={handleStartConfirm}
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>

      {/* Xác nhận đã sẵn sàng */}
      <Modal
        title="Xác nhận bắt đầu"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          setIsModalOpen(false);
          handleStartConfirmed();
        }}
        okText="Bắt đầu ngay"
        cancelText="Hủy"
        okButtonProps={{
          className: "bg-[#45368f] hover:bg-[#372a73] text-white",
        }}
      >
        <div className="space-y-3 text-gray-700 text-[15px]">
          {/* <p>Bạn đã sẵn sàng bắt đầu bài thi mô phỏng chưa?</p> */}
          <p>Bài thi sẽ bao gồm các kỹ năng, theo thứ tự sau:</p>
          <ul className="list-decimal list-inside ml-2">
            <li>
              <strong>Listening</strong> – Nghe hiểu
            </li>
            <li>
              <strong>Reading</strong> – Đọc hiểu
            </li>
            <li>
              <strong>Writing</strong> – Viết
            </li>
            <li>
              <strong>Speaking</strong> – Nói
            </li>
          </ul>
          <p>
            <strong className="text-purple-700">Lưu ý:</strong> Đề thi sẽ được
            hệ thống
            <strong> chọn ngẫu nhiên </strong>
            dựa trên <strong>key trung tâm đã cung cấp</strong>. Hãy đảm bảo bạn
            đã sẵn sàng!
          </p>
        </div>
      </Modal>
    </div>
  );
}

// Subcomponent
function SkillItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div>
        <Text strong className="!text-base">
          {title}
        </Text>
        <Paragraph className="text-sm text-gray-600 m-0">{desc}</Paragraph>
      </div>
    </div>
  );
}
