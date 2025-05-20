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
import {
  Layout,
  ConfigProvider,
  Tour,
  TourProps,
  Modal,
  Button,
  Result,
  Table,
} from "antd";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import "@ant-design/v5-patch-for-react-19";
import { authServices } from "../config/authServices";
import { userLocalStorage } from "../config/userLocal";
import { useNavigate } from "react-router-dom";
import mascot from "../assets/welcome-passkey.png";
import {} from "antd";
import { useMediaQuery } from "react-responsive";
import wellcome from "../assets/welcome-passkey.png";
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
  const [showSessions, setShowSessions] = useState(false);
  // Ref gắn vào label <span> trong Menu items
  const homeRef = useRef<HTMLSpanElement | null>(null);
  const coursesRef = useRef<HTMLSpanElement | null>(null);
  const scheduleRef = useRef<HTMLSpanElement | null>(null);
  const myInfoRef = useRef<HTMLSpanElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const userSessionsRef = useRef<HTMLButtonElement | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const reopenWelcome = () => {
    setShowWelcome(true);
  };
  useEffect(() => {
    const token = userLocalStorage.get()?.token;
    if (token) {
      authServices
        .getUserInfo(token)
        .then((res) => {
          setUser(res.data);
          setSessions(res.data.user_sessions);
        })
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
      title: "Phiên bản hoạt động",
      description: "Xem các thiết bị đang đăng nhập vào tài khoản của bạn.",
      target: () => userSessionsRef.current as HTMLElement,
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
    },
  ];

  const isUnsupported = useMediaQuery({ maxWidth: 200 });
  if (isUnsupported) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <img src={wellcome} alt="macos" className="w-3/4" />
        <Result
          status="warning"
          title="Thiết bị không được hỗ trợ"
          subTitle="Vui lòng sử dụng máy tính với màn hình ≥ 900px để truy cập nền tảng PassKey Center."
        />
      </div>
    );
  }
  const columns = [
    {
      title: "Thời gian đăng nhập",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => {
        const date = new Date(value);
        return (
          <span>
            {date.toLocaleTimeString("vi-VN")}{" "}
            {date.toLocaleDateString("vi-VN")}
          </span>
        );
      },
    },
    {
      title: "Thông tin thiết bị",
      key: "device_info",
      render: (_: any, record: any) => {
        const ip = record.ip_address?.replace("::ffff:", "") || "Không rõ";

        const [osRaw, browserRaw] = record.device?.split(" - ") || [];

        // Chuẩn hóa OS
        const os = (() => {
          if (!osRaw) return "Không rõ";

          const lowered = osRaw.toLowerCase();

          if (lowered.includes("windows 10")) return "Windows";
          if (lowered.includes("windows 11")) return "Windows";
          if (lowered.includes("windows 7")) return "Windows";
          if (lowered.includes("mac os x")) return "macOS";
          if (lowered.includes("android")) return "Android";
          if (lowered.includes("ios")) return "iOS";

          return osRaw.split(" ")[0];
        })();

        const browser = browserRaw?.split(" ")[0] || "Không rõ";

        return (
          <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-800">
            <div>
              <strong>IP:</strong> {ip}
            </div>
            <div>
              <strong>OS:</strong> {os}
            </div>
            <div>
              <strong>Browser:</strong> {browser}
            </div>
            <div>
              <strong>Device:</strong> Desktop
            </div>
          </div>
        );
      },
    },
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
                src={mascot} 
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

              <p
                style={{
                  fontSize: 17,
                  color: "#555",
                  marginBottom: 32,
                  marginTop: 10,
                }}
              >
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
        {/* Phiên bản đăng nhập */}
        <Modal
          open={showSessions}
          title="Lịch sử đăng nhập"
          footer={null}
          onCancel={() => setShowSessions(false)}
          width={800}
        >
          <Table
            columns={columns}
            dataSource={sessions}
            rowKey="session_id"
            pagination={false}
            bordered
          />
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
              userSessionsRef={userSessionsRef}
              openSessionsModal={() => setShowSessions(true)}
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
