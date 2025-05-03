import { Card, Button, Tag, message, Typography, Divider } from "antd";
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.locale("vi");

const classTimeStart = dayjs().hour(9).minute(30).second(0);
const classTimeEnd = dayjs().hour(11).minute(0).second(0);

const classSchedule = {
  name: "Aptis – Khóa 05",
  teacher: "Nguyễn Phúc Bảo Danh",
  startDate: dayjs("2025-05-03"),
  endDate: dayjs("2025-05-25"),
  totalSessions: 8,
  sessionTime: "09:30 – 11:00",
  days: [6, 0], // 6 = Saturday, 0 = Sunday
};

const SchedulePage = () => {
  const today = dayjs();
  const isTodayClassDay = classSchedule.days.includes(today.day());
  const isClassTime = today.isBetween(classTimeStart, classTimeEnd);
  const isWithinCourse = today.isBetween(classSchedule.startDate.startOf("day"), classSchedule.endDate.endOf("day"));

  const handleJoin = () => {
    if (!isWithinCourse || !isTodayClassDay || !isClassTime) {
      message.warning("Hiện tại chưa đến giờ học!");
    } else {
      window.open("https://meet.google.com/bke-yady-rmo", "_blank");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Card
        title={<span className="text-xl font-semibold text-blue-600 flex justify-center">{classSchedule.name}</span>}
        className="shadow-lg"
      >
        <Typography.Paragraph>
          <b>Giảng viên:</b> <span className="text-[15px]">{classSchedule.teacher}</span>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <b>Thời gian học:</b>{" "}
          <Tag color="green"><span className="text-[15px]">{classSchedule.sessionTime}</span></Tag> vào{" "}
          <Tag color="blue"><span className="text-[15px]">Thứ bảy</span></Tag> và <Tag color="blue"><span className="text-[15px]">Chủ nhật</span></Tag>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <b>Khai giảng:</b> {classSchedule.startDate.format("DD/MM/YYYY")} &nbsp;
          <b>Kết thúc:</b> {classSchedule.endDate.format("DD/MM/YYYY")}
        </Typography.Paragraph>

        <Typography.Paragraph>
          <b>Tổng số buổi học:</b> {classSchedule.totalSessions} buổi (mỗi buổi 1 tiếng 30 phút)
        </Typography.Paragraph>

        <Divider />

        <div className="text-center">
          <Button type="primary" size="large" onClick={handleJoin}>
            Tham gia buổi học
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SchedulePage;
