import React, { ReactNode } from "react";
import { ConfigProvider, Layout, theme, Modal, message } from "antd";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ReadingProvider,
  useReadingContext,
} from "../pages/Reading/Context/ReadingContext";

const { Header, Content, Footer } = Layout;

const TakeTestLayouts: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isTestPage = location === "/reading/take-test";

  return (
    <ConfigProvider componentSize="large">
      <ReadingProvider>
        <Layout className="!h-screen flex flex-col">
          <Header
            className="flex justify-between items-center !bg-[#f9fafc]"
          >
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Logo"
              className="h-[80px] object-contain cursor-pointer"
            />
          </Header>
          <Content
            className="flex-1 overflow-y-auto !p-x-12 !bg-[#f9fafc]"
          >
            {children}
          </Content>
          <Footer
            style={{ background: colorBgContainer }}
            className="text-end flex justify-end !py-2 border-t border-[#e5e7eb]"
          >
            {location === "/reading/take-test/intro" ? (
              <div>
                Aptis key test ©{new Date().getFullYear()} Created by Hoàng Kha
              </div>
            ) : isTestPage ? (
              <TestFooterPagination />
            ) : <div>
              <button
          onClick={() => {
            localStorage.removeItem('reading_key_test_id')
            localStorage.removeItem('reading_answers')
            navigate('/')
            message.success('Chào mừng bạn trở về trang chủ')
          }}
          className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] disabled:opacity-50 text-lg cursor-pointer"
        >
          Trở về
        </button>
               </div>}
          </Footer>
        </Layout>
      </ReadingProvider>
    </ConfigProvider>
  );
};

export default TakeTestLayouts;

const TestFooterPagination = () => {
  const { activePart, setActivePart, answers } = useReadingContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const isIncomplete = () => {
      const isEmptyString = (v: any) =>
        v === "" || v === null || v === undefined;

      const checkPart1 = Object.values(answers.part1).some(isEmptyString);
      const checkPart2 = Object.values(answers.part2).some(isEmptyString);
      const checkPart3 = Object.values(answers.part3).some(isEmptyString);
      const checkPart4 = Object.values(answers.part4).some(isEmptyString);
      const checkPart5 = Object.values(answers.part5).some(isEmptyString);

      return checkPart1 || checkPart2 || checkPart3 || checkPart4 || checkPart5;
    };

    if (isIncomplete()) {
      Modal.confirm({
        title: "Bạn chưa hoàn thành tất cả các câu hỏi",
        content: "Bạn có chắc chắn muốn nộp bài không?",
        okText:  "Vẫn nộp bài",
        cancelText: "Quay lại",
        okButtonProps: {
          className: "!bg-[#45368f] hover:bg-[#372a73] text-white",
        },
        
        onOk() {
          localStorage.setItem("reading_answers", JSON.stringify(answers));
      navigate("/reading/take-test/review");

        },
      });
    } else {
      localStorage.setItem("reading_answers", JSON.stringify(answers));
      navigate("/reading/take-test/review");
    }
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        disabled={activePart <= 1}
        onClick={() => setActivePart(activePart - 1)}
        className="px-[15px] py-[7px] bg-white rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all duration-500 disabled:opacity-50 text-lg cursor-pointer border border-[#d9d9d9]"
      >
        Previous
      </button>

      {activePart < 5 ? (
        <button
          onClick={() => setActivePart(activePart + 1)}
          className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] disabled:opacity-50 text-lg cursor-pointer"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-lg cursor-pointer"
        >
          Submit Exam
        </button>
      )}
    </div>
  );
};
