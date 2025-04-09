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
        <Layout className="!h-screen flex flex-col">
          <Header className="flex justify-between items-center" style={{ background: "#f5f5f5" }}>
            <img onClick={() => navigate("/")} src={logo} alt="Logo" className="h-[80px] object-contain cursor-pointer" />
          </Header>

          <Content className='flex-1 overflow-y-auto' style={{ padding: "0 48px" }}>{children}</Content>

          <Footer style={{ background: colorBgContainer }} className="text-end flex justify-end !py-4">
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
        className="px-[15px] py-[7px] bg-white rounded hover:border-blue-500 hover:text-blue-500 transition-all duration-500 disabled:opacity-50 text-lg cursor-pointer border border-[#d9d9d9]"
      >
        Previous
      </button>
      <button
        disabled={activePart >= 5}
        onClick={() => setActivePart(activePart + 1)}
        className="px-[15px] py-[7px] bg-[#45368f] text-white rounded-lg hover:bg-[#372a73] disabled:opacity-50 text-lg cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};
