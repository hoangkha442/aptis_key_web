// import { ReactNode, useEffect, useRef, useState } from "react";
// import { Layout, ConfigProvider, Tour, TourProps } from "antd";
// import SideBar from "../components/SideBar";
// import Header from "../components/Header";
// import '@ant-design/v5-patch-for-react-19';
// import { authServices } from "../config/authServices";
// import { userLocalStorage } from "../config/userLocal";

// const { Content } = Layout;

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layouts = ({ children }: LayoutProps) => {
//   const [user, setUser] = useState<null | any>(null);
//   const [openTour, setOpenTour] = useState(false);

//   // Ref đúng kiểu: RefObject<T | null>
//   const breadcrumbRef = useRef<HTMLDivElement | null>(null);
//   const avatarRef = useRef<HTMLDivElement | null>(null);
//   const termsRef = useRef<HTMLButtonElement | null>(null);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const token = userLocalStorage.get()?.token;
//     if (token) {
//       authServices.getUserInfo(token)
//         .then((res) => setUser(res.data))
//         .catch(console.log);
//     }

//     const hasSeenTour = localStorage.getItem("hasSeenTour");
//     if (!hasSeenTour) {
//       setOpenTour(true);
//       localStorage.setItem("hasSeenTour", "true");
//     }
//   }, []);

//   const steps: TourProps["steps"] = [
//   {
//     title: "Thanh điều hướng",
//     description: "Đây là nơi bạn chọn truy cập các khu vực chính như Trang chủ, Khóa học...",
//     target: () => menuRef.current as HTMLElement,
//   },
//   {
//     title: "Vị trí hiện tại",
//     description: "Bạn đang ở đâu? Breadcrumb sẽ chỉ rõ cho bạn.",
//     target: () => breadcrumbRef.current as HTMLElement,
//   },
//   {
//     title: "Tài khoản người dùng",
//     description: "Thông tin cá nhân và tùy chọn như đổi mật khẩu, đăng xuất.",
//     target: () => avatarRef.current as HTMLElement,
//   },
//   {
//     title: "Chính sách học tập",
//     description: "Nhấn vào đây để xem cam kết và điều kiện hoàn học phí.",
//     target: () => termsRef.current as HTMLElement,
//   },
// ];

//   return (
//     <div>
//       <ConfigProvider componentSize="large">
//         <Layout className="!h-screen">
//           <SideBar menuRef={menuRef} />
//           <Layout>
//             <Header
//               user={user}
//               breadcrumbRef={breadcrumbRef}
//               avatarRef={avatarRef}
//               termsRef={termsRef}
//             />
//             <Content className="!m-[24px_16px] !p-6 !min-h-[280px] !bg-white !rounded-lg !relative !overflow-y-auto">
//               {children}
//               <Tour open={openTour} onClose={() => setOpenTour(false)} steps={steps} />
//             </Content>
//           </Layout>
//         </Layout>
//       </ConfigProvider>
//     </div>
//   );
// };

import { ReactNode, useEffect, useRef, useState } from "react";
import { Layout, ConfigProvider, Tour, TourProps, Modal, Button } from "antd";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import "@ant-design/v5-patch-for-react-19";
import { authServices } from "../config/authServices";
import { userLocalStorage } from "../config/userLocal";
import { useNavigate } from "react-router-dom";
import mascot from "../assets/welcome-passkey.png";
const { Content } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const Layouts = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<null | any>(null);
  const [openTour, setOpenTour] = useState(false);
  const breadcrumbRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const termsRef = useRef<HTMLButtonElement | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  // Ref gắn vào label <span> trong Menu items
  const homeRef = useRef<HTMLSpanElement | null>(null);
  const coursesRef = useRef<HTMLSpanElement | null>(null);
  const scheduleRef = useRef<HTMLSpanElement | null>(null);
  const myInfoRef = useRef<HTMLSpanElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const reopenWelcome = () => {
    setShowWelcome(true); // chỉ mở lại modal
  };
  useEffect(() => {
    const token = userLocalStorage.get()?.token;
    if (token) {
      authServices
        .getUserInfo(token)
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.log("err: ", err);
          localStorage.removeItem("USER_LOCAL");
          navigate("/auth/login");
        });
    }

    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setShowWelcome(true);
    }
  }, []);

  const steps: TourProps["steps"] = [
    {
      title: "Trang chủ",
      description: "Click để quay về giao diện chính.",
      target: () => homeRef.current as HTMLElement,
    },
    {
      title: "Khóa học",
      description: "Các key test được giảng viên đi thi lấy về.",
      target: () => coursesRef.current as HTMLElement,
    },
    {
      title: "Lịch học",
      description: "Xem thông tin khóa học",
      target: () => scheduleRef.current as HTMLElement,
    },
    {
      title: "Thông tin cá nhân",
      description: "Xem hoặc chỉnh sửa thông tin tài khoản.",
      target: () => myInfoRef.current as HTMLElement,
    },
    {
      title: "Thu gọn Sidebar",
      description: "Click để thu gọn hoặc mở rộng thanh điều hướng.",
      target: () => toggleRef.current as HTMLElement,
    },
    {
      title: "Breadcrumb",
      description: "Cho biết vị trí hiện tại trong hệ thống.",
      target: () => breadcrumbRef.current as HTMLElement,
    },
    
    {
      title: "Chính sách học tập",
      description: "Chính sách passkey Center với học viên.",
      target: () => termsRef.current as HTMLElement,
    },
    {
      title: "Tài khoản người dùng",
      description: "Đổi mật khẩu, xem hồ sơ hoặc đăng xuất.",
      target: () => avatarRef.current as HTMLElement,
    }
  ];

  return (
    <div>
      <ConfigProvider componentSize="large">
        <Modal
          open={showWelcome}
          footer={null}
          closable={false}
          centered
          width={1000}
          className="py-20"
        >
          <div className="flex items-center">
            <div className="w-[500px] h-[400px]">
              <img
              src={mascot} // thay đường dẫn đúng với ảnh bạn
              alt="Mascot"
              className="w-full h-full object-cover"
              style={{
                marginBottom: 24,
                borderRadius: 12,
              }}
            />
            </div>

            <div className="">
              <div className="mb-4 text-7xl">
                <h2 className="text-6xl font-bold">
                  Nền tảng{" "}
                  <span className="font-bold text-7xl text-blue-800">Học</span>{" "}
                  <br />
                  và{" "}
                  <span className="font-bold text-7xl text-blue-800">
                    Luyện thi
                  </span>{" "}
                  <br />
                  <span
                  className="font-bold text-7xl text-orange-700"
                    style={{
                      display: "inline-block",
                      marginTop: 4,
                    }}
                  >
                    Thông minh
                  </span>
                </h2>
              </div>

              <p style={{ fontSize: 17, color: "#555", marginBottom: 32, marginTop: 10 }}>
                Chào mừng bạn đến với <strong>PassKey Center</strong> – nơi bạn
                <strong> học gì, thi nấy</strong>.<br />
                Hệ thống sẽ hướng dẫn bạn sử dụng các chức năng nổi bật chỉ
                trong vài bước.
              </p>
            </div>

          </div>
            <div className="flex justify-center">
              <Button
              type="primary"
              size="large"
              style={{
                padding: "10px 32px",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 30,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onClick={() => {
    setShowWelcome(false);    
    setOpenTour(true);         
    localStorage.setItem("hasSeenTour", "true");
  }}
            >
              KHÁM PHÁ NGAY
            </Button>
            </div>
        </Modal>

        <Layout className="!h-screen">
          <SideBar
            homeRef={homeRef}
            coursesRef={coursesRef}
            scheduleRef={scheduleRef}
            myInfoRef={myInfoRef}
            toggleRef={toggleRef}
            setOpenTour={setOpenTour}
            reopenWelcome={reopenWelcome}
          />
          <Layout>
            <Header
              user={user}
              breadcrumbRef={breadcrumbRef}
              avatarRef={avatarRef}
              termsRef={termsRef}
            />
            <Content className="!m-[24px_16px] !p-6 !min-h-[280px] !bg-white !rounded-lg !relative !overflow-y-auto">
              {children}
              <Tour
                open={openTour}
                onClose={() => setOpenTour(false)}
                steps={steps}
              />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default Layouts;
