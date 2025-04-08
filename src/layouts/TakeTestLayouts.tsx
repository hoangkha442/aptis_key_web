import React, { ReactNode } from 'react';
import {  ConfigProvider, Layout, theme } from 'antd';
import logo from "../assets/logo.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { ReadingProvider, useReadingContext } from '../pages/Reading/Context/ReadingContext';
const { Header, Content, Footer } = Layout;

// Bọc children bằng ReadingProvider
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
        <Layout className="!h-screen">
          <Header className="flex justify-between items-center" style={{ background: "#f5f5f5" }}>
            <img onClick={() => navigate("/")} src={logo} alt="Logo" className="h-[80px] object-contain cursor-pointer" />
          </Header>

          <Content style={{ padding: "0 48px" }}>{children}</Content>

          <Footer style={{ background: colorBgContainer }} className="text-center">
            {location === "/reading/take-test/intro" ? (
              <div>Aptis key test ©{new Date().getFullYear()} Created by Hoàng Kha</div>
            ) : isTestPage ? (
              <TestFooterPagination />
            ) : null}
          </Footer>
        </Layout>
      </ReadingProvider>
    </ConfigProvider>
  );
};

export default TakeTestLayouts;

const TestFooterPagination = () => {
  const { activePart, setActivePart } = useReadingContext();

  return (
    <div className="flex justify-center gap-4">
      <button
        disabled={activePart <= 1}
        onClick={() => setActivePart(activePart - 1)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        disabled={activePart >= 5}
        onClick={() => setActivePart(activePart + 1)}
        className="px-4 py-2 bg-[#45368f] text-white rounded hover:bg-[#372a73] disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
