import { Button, Table, Typography, Pagination, message } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readingService } from "../../config/readingServices";

const { Title } = Typography;

interface TestModule {
  key: string;
  test_name: string;
  description: string;
  created_at: string;
}

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const [readingModules, setReadingModules] = useState<TestModule[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReadingModules = async () => {
      setLoading(true);
      try {
        const res = await readingService.getAllReadingKeys();
        setReadingModules(
          res.data.slice(0, 14).map((item: any) => ({
            ...item,
            key: String(item.reading_test_id), // đảm bảo key duy nhất
            test_name: item.tittle,
            description: item.description,
            created_at: new Date().toISOString(),
          }))
        );
      } catch (err) {
        message.error("Lỗi khi lấy dữ liệu key test cho Reading");
      } finally {
        setLoading(false);
      }
    };
    fetchReadingModules();
  }, []);

  const handleTakeTest = (keyTestId: number) => {
    navigate(`/reading/take-test/intro`, { state: { keyTestId } });
  };


  const columns = [
    {
      title: <p className="font-semibold text-lg">Practice Modules</p>,
      dataIndex: "test_name",
      key: "test_name",
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-lg justify-center">
          <BookOutlined /> Reading
        </div>
      ),
      key: "reading",
      render: (_: string, record: TestModule) => (
        <Button
          type="primary"
          className="!bg-[#45368f] w-full"
          onClick={() => handleTakeTest(Number(record.key))}
        >
          Bắt đầu
        </Button>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-lg justify-center">
           <span className="!text-[#45368f]">🎧</span> Listening
        </div>
      ),
      key: "listening",
      render: () => (
        <Button type="primary" className="w-full" disabled>
          Coming soon
        </Button>
      ),
    },
  ];

  const pageSize = 5;
  const paginatedData = readingModules.slice(
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
          total={readingModules.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
