import { Helmet } from "react-helmet-async";

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1fKjjymGhhcoq3Cj_P9XA8WVgP0muPD9x?usp=sharing";

const SchedulePage = () => {
  const handleRedirect = () => {
    window.open(DRIVE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Helmet>
        <title>Bài giảng | PassKey Center</title>
        <meta
          name="description"
          content="Theo dõi lịch học chi tiết, thời gian và phòng học của các khóa luyện thi APTIS bạn đã đăng ký tại PassKey Center."
        />
      </Helmet>

      <div className="flex flex-col items-center justify-center py-16">
        <p className="mb-6 text-lg text-gray-700 text-center">
          Nhấn nút bên dưới để chuyển tới video bài giảng trên Google Drive.
        </p>
        <button
          className="px-6 py-3 bg-[#45378f] hover:bg-[#403969] text-white font-bold rounded-lg shadow-lg transition cursor-pointer"
          onClick={handleRedirect}
        >
          Xem video bài giảng
        </button>
      </div>
    </div>
  );
};

export default SchedulePage;
