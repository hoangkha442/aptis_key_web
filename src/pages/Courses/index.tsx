import { Button, Table, Typography, Pagination, message } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readingService } from "../../config/readingServices";
import { listeningService } from "../../config/listeningServices";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Helmet } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
const { Title } = Typography;

interface TestModule {
  test_name: string;
  type: "reading" | "listening";
  test_id: number;
}

interface CombinedRow {
  key: string;
  index: number;
  reading?: TestModule;
  listening?: TestModule;
}

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState<CombinedRow[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const [readingRes, listeningRes] = await Promise.all([
          readingService.getAllReadingKeys(),
          listeningService.getAllListeningKeys(),
        ]);
        const readingData: TestModule[] = readingRes.data.map((item: any) => ({
          test_id: item.reading_test_id,
          test_name: "",
          type: "reading",
        }));

        const listeningData: TestModule[] = listeningRes.data.map(
          (item: any) => ({
            test_id: item.listening_test_id,
            test_name: "", 
            type: "listening",
          })
        );

        const maxLength = Math.max(readingData.length, listeningData.length);
        const merged: CombinedRow[] = [];

        for (let i = 0; i < maxLength; i++) {
          const row: CombinedRow = {
            key: `row-${i}`,
            index: i,
          };
          if (readingData[i])
            row.reading = { ...readingData[i], test_name: `Key test ${i + 1}` };
          if (listeningData[i])
            row.listening = {
              ...listeningData[i],
              test_name: `Key test ${i + 1}`,
            };
          merged.push(row);
        }

        setRows(merged);
      } catch (err) {
        message.error("Lỗi khi lấy dữ liệu key test cho Reading/Listening");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [token]);

  const handleTakeTest = (type: "reading" | "listening", id: number) => {
    
    if (type === "reading") {
      navigate(`/reading/take-test/intro`, { state: { keyTestId: id } });
    } else {
      if(id === 13){
      message.warning('Key mới không hỗ trợ tài khoản dùng thử')
    }else{
      localStorage.setItem("listening_key_test_id", String(id));
      navigate(`/listening/take-test/intro`);
    }
    }
  };
  const columns = [
    {
      title: (
        <p className="font-semibold sm:!text-lg !text-xs">Practice Modules</p>
      ),
      key: "index",
      dataIndex: "index",
      render: (index: number) => <span className="sm:!text-base !text-xs">Key test {index + 1}</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold sm:!text-lg !text-xs justify-center">
          <BookOutlined /> Reading
        </div>
      ),
      key: "reading",
      dataIndex: "reading",
      render: (reading: TestModule | undefined) =>
        reading ? (
          <div className="flex flex-col items-center w-full">
            <Button
              type="primary"
              className={`!bg-[#45368f] w-full sm:!text-base !text-xs ${isMobile ? "!py-0" : "py-2"}`}
              onClick={() => handleTakeTest("reading", reading.test_id)}
            >
              Take test
            </Button>
          </div>
        ) : null,
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold sm:!text-lg !text-xs justify-center">
          🎧 Listening
        </div>
      ),
      key: "listening",
      dataIndex: "listening",
      render: (listening: TestModule | undefined) =>
        listening ? (
          <div className="flex flex-col items-center w-full">
            <Button
              type="primary"
              className="!bg-[#45368f] w-full sm:!text-base !text-xs"
              onClick={() => handleTakeTest("listening", listening.test_id)}
            >
              Take test
            </Button>
          </div>
        ) : null,
    },
  ];

  const pageSize = 6;
  const paginatedData = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="flex flex-col">
      <Helmet>
        <title>Khóa học của tôi | PassKey Center</title>
        <meta
          name="description"
          content="Xem danh sách các Key-test chuẩn thi 100%. Cập nhật tiến độ học tập tại PassKey Center."
        />
      </Helmet>

      <div
        onClick={() =>
          window.open(
            "https://drive.google.com/drive/folders/1Z9mR9lVJKO4ixsrh4U_KWGkIkSZI_U-z?usp=sharing",
            "_blank"
          )
        }
        className="flex items-center justify-between mb-6 hover:shadow cursor-pointer transition border border-gray-100 sm:p-6 p-4 bg-white rounded-md shadow-sm"
      >
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-2 rounded-full">
            <span role="img" aria-label="megaphone">
              📣
            </span>
          </div>
          <span className="sm:text-xl text-xs font-semibold">
            Speaking and Writing Practice
          </span>
        </div>
        <span className="text-blue-700 font-semibold sm:text-xl text-xs hover:text-blue-800 transition-all duration-500">
          Start Practice →
        </span>
      </div>

      <div className="sm:p-6 p-3 bg-white rounded-md shadow-sm border border-gray-100">
        <div className="sm:mb-6 mb-0 flex items-center justify-between">
          <Title className="m-0 sm:!text-2xl !text-sm">
            Reading & Listening Practice
          </Title>
        </div>
        <div id={`${isMobile}`}>
          <Table
          dataSource={paginatedData}
          columns={columns}
          pagination={false}
          rowKey="key"
          loading={loading}
        />
        </div>
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            total={rows.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
}
