import { ReactNode, useEffect, useState } from "react";
import { Layout, ConfigProvider} from "antd";
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
          <SideBar  /> 
          <Layout>
            <Header user={user} />
            <Content
              className="!m-[24px_16px] !p-6 !min-h-[280px] !bg-white !rounded-lg !relative !overflow-y-auto"
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default Layouts;
