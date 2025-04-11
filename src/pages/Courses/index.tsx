import { Button, Table, Typography, Pagination, message } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readingService } from "../../config/readingServices";
import { listeningService } from "../../config/listeningServices";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
          test_name: "", // Tạm thời, sẽ thêm sau
          type: "reading",
        }));

        const listeningData: TestModule[] = listeningRes.data.map((item: any) => ({
          test_id: item.listening_test_id,
          test_name: "", // Tạm thời, sẽ thêm sau
          type: "listening",
        }));

        const maxLength = Math.max(readingData.length, listeningData.length);
        const merged: CombinedRow[] = [];

        for (let i = 0; i < maxLength; i++) {
          const row: CombinedRow = {
            key: `row-${i}`,
            index: i,
          };
          if (readingData[i]) row.reading = { ...readingData[i], test_name: `Key test ${i + 1}` };
          if (listeningData[i]) row.listening = { ...listeningData[i], test_name: `Key test ${i + 1}` };
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
      localStorage.setItem("listening_key_test_id", String(id));
      navigate(`/listening/take-test/intro`);
    }
  };

  const columns = [
    {
      title: <p className="font-semibold text-lg">Practice Modules</p>,
      key: "index",
      dataIndex: "index",
      render: (index: number) => <span className="">Key test {index + 1}</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-lg justify-center">
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
              className="!bg-[#45368f] w-full"
              onClick={() => handleTakeTest("reading", reading.test_id)}
            >
              Take test
            </Button>
          </div>
        ) : null,
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-lg justify-center">
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
              className="!bg-[#45368f] w-full"
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
    <div className="p-6 bg-white rounded-md shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <Title level={4} className="m-0">
          Reading & Listening Practice
        </Title>
      </div>

      <Table
        dataSource={paginatedData}
        columns={columns}
        pagination={false}
        rowKey="key"
        loading={loading}
      />

      <div className="mt-4 flex justify-end">
        <Pagination
          current={currentPage}
          total={rows.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
