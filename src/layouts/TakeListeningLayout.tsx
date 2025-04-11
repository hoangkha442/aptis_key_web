import React, { ReactNode } from "react";
import { ConfigProvider, Layout, theme, Modal, message } from "antd";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setActiveListeningPart } from "../redux/slices/listeningUI.slice";

const { Header, Content, Footer } = Layout;

const ListeningPagination = ({ total }: { total: number }) => {
  const activePart = useSelector((state: RootState) => state.listeningUI.activePart);
  const answers = useSelector((state: RootState) => state.listeningUI.answers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    if (activePart < total) {
      dispatch(setActiveListeningPart(activePart + 1));
    }
  };

  const handlePrev = () => {
    if (activePart > 1) {
      dispatch(setActiveListeningPart(activePart - 1));
    }
  };

  const handleSubmit = () => {
    const isIncomplete = Object.values(answers).some(
      (value) => value === null || value === undefined || value === ""
    );

    if (isIncomplete) {
      Modal.confirm({
        title: "Bạn chưa hoàn thành tất cả các câu hỏi",
        content: "Bạn có chắc chắn muốn nộp bài không?",
        okText: "Vẫn nộp bài",
        cancelText: "Quay lại",
        okButtonProps: {
          className: "!bg-[#45368f] hover:bg-[#372a73] text-white",
        },
        onOk() {
          localStorage.setItem("listening_answers", JSON.stringify(answers));
          navigate("/listening/take-test/review");
          setTimeout(() => window.location.reload(), 500);
        },
      });
    } else {
      localStorage.setItem("listening_answers", JSON.stringify(answers));
      navigate("/listening/take-test/review");
      setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-2">
      <button
        disabled={activePart <= 1}
        onClick={handlePrev}
        className="px-[15px] py-[7px] bg-white border border-[#d9d9d9] rounded-lg hover:border-blue-500 hover:text-blue-500 text-lg cursor-pointer"
      >
        Previous
      </button>

      {activePart < total ? (
        <button
          onClick={handleNext}
          className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-lg cursor-pointer"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] text-lg cursor-pointer"
        >
          Submit
        </button>
      )}
    </div>
  );
};

const TakeListeningLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const totalQuestions = 17;

  const handleBackToHome = () => {
    localStorage.removeItem("listening_key_test_id");
    localStorage.removeItem("listening_answers");
    message.success("Chào mừng bạn trở về trang chủ");
    navigate("/");
  };

  const isIntroPage = location.pathname === "/listening/take-test/intro";

  return (
    <ConfigProvider componentSize="large">
      <Layout className="!h-screen flex flex-col">
        <Header className="flex justify-between items-center !bg-[#f9fafc] px-6">
          <img
            onClick={handleBackToHome}
            src={logo}
            alt="Logo"
            className="h-[80px] object-contain cursor-pointer"
          />
          <h1 className="text-lg font-semibold text-[#45368f]">Listening Test</h1>
        </Header>

        <Content className="flex-1 overflow-y-auto !px-12 !bg-[#f9fafc]">{children}</Content>

        <Footer
          style={{ background: colorBgContainer }}
          className="text-end flex flex-col items-center gap-2 !py-2 border-t border-[#e5e7eb]"
        >
          {isIntroPage ? (
            <div>
              Aptis key test ©{new Date().getFullYear()} Created by Hoàng Kha
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <ListeningPagination total={totalQuestions} />
            </div>
          )}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default TakeListeningLayout;
