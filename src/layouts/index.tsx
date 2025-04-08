import { ReactNode, useEffect, useState } from "react";
import { Layout, ConfigProvider, Spin } from "antd";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import '@ant-design/v5-patch-for-react-19'; 
import { authServices } from "../config/authServices";
import { userLocalStorage } from "../config/userLocal";

interface LayoutProps {
  children: ReactNode;
}
const { Content } = Layout;

const Layouts = ({ children }: LayoutProps) => {
  
  const [user, setUser] = useState< null>(null);
  const [loading, setLoading] = useState(false); 
  useEffect(() => { 
    const isLoggedIn = !! userLocalStorage.get()?.token
    const accessToken = userLocalStorage?.get()?.token
    if(isLoggedIn && accessToken){
      authServices.getUserInfo(accessToken).then((res) => { 
        setUser(res.data)
      }).catch((err) => { 
        console.log('err: ', err);
      })
    }
   }, [])
  return (
    <div>
      <ConfigProvider componentSize="large">
        <Layout className="!h-screen">
          <SideBar setLoading={setLoading} /> 
          <Layout>
            <Header user={user} />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: "#ffffff",
                borderRadius: 8,
                position: "relative",
                overflowY: "auto", 
              }}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-50">
                  <Spin size="large" />
                </div>
              )}
              {children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default Layouts;
