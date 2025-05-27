// import { useState, useEffect, RefObject } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   MailOutlined,
//   SettingOutlined,
//   UserOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Button, Layout, Menu, theme, message } from "antd";
// import logo from "../../assets/passkey_logo.png";
// import smallLogo from "../../assets/smallLogo.png";
// import { useLocation, useNavigate } from "react-router-dom";

// const { Sider } = Layout;

// type MenuItem = Required<MenuProps>["items"][number];

// //  Sửa kiểu RefObject<HTMLDivElement | null>
// export default function Sidebar({ menuRef }: { menuRef: RefObject<HTMLDivElement | null> }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

//   useEffect(() => {
//     setSelectedKey(location.pathname);
//   }, [location.pathname]);

//   const handleMenuClick = ({ key }: { key: string }) => {
//     if (key === "/auth/logout") {
//       localStorage.removeItem("USER_LOCAL");
//       message.success("Đăng xuất thành công!");
//       navigate("/auth/login");
//       return;
//     }
//     navigate(key);
//   };

//   const studentMenu: MenuItem[] = [
//     !collapsed
//       ? { key: "group_student", label: "Khu vực học tập", type: "group" }
//       : { type: "divider" },
//     { key: "/", label: "Trang chủ", icon: <MailOutlined /> },
//     { key: "/courses", label: "Khóa học của tôi", icon: <SettingOutlined /> },
//     { key: "/schedule", label: "Lịch học", icon: <UserOutlined /> },
//     { key: "/my-info", label: "Thông tin cá nhân", icon: <UserOutlined /> },
//     {
//       key: "/auth/logout",
//       label: "Đăng xuất",
//       icon: <LogoutOutlined />,
//       danger: true,
//     },
//   ];

//   const {
//     token: { colorBgBase, colorTextBase },
//   } = theme.useToken();

//   return (
//     <Sider
//       trigger={null}
//       collapsible
//       collapsed={collapsed}
//       width={250}
//       style={{ background: colorBgBase }}
//     >
//       <div className="flex items-center justify-between px-4 h-16 overflow-hidden">
//         <img
//           src={collapsed ? smallLogo : logo}
//           alt="Logo"
//           className={collapsed ? "h-[40px]" : "h-[100px] w-3/5"}
//           onClick={() => {
//             localStorage.removeItem("reading_key_test_id");
//             localStorage.removeItem("reading_answers");
//             localStorage.removeItem("reading_correct");
//             localStorage.removeItem("reading_timer_start");
//             message.info("Bạn đã về trang chủ!");
//           }}
//         />
//         <Button
//           type="text"
//           icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//           onClick={() => setCollapsed(!collapsed)}
//           style={{
//             fontSize: "16px",
//             color: colorTextBase,
//             background: "transparent",
//           }}
//         />
//       </div>

//       <div ref={menuRef} style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
//         <Menu
//           theme="light"
//           mode="inline"
//           selectedKeys={[selectedKey]}
//           style={{ background: colorBgBase, color: colorTextBase }}
//           items={studentMenu}
//           onClick={handleMenuClick}
//         />
//       </div>
//     </Sider>
//   );
// }
import { useState, useEffect, RefObject } from "react";
import {
  HomeOutlined,
  BookOutlined,
  CalendarOutlined,
  IdcardOutlined,
  ExperimentOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/passkey_logo.png";
import smallLogo from "../../assets/smallLogo.png";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;

interface SidebarProps {
  homeRef: RefObject<HTMLSpanElement | null>;
  coursesRef: RefObject<HTMLSpanElement | null>;
  scheduleRef: RefObject<HTMLSpanElement | null>;
  myInfoRef: RefObject<HTMLSpanElement | null>;
  toggleRef: RefObject<HTMLButtonElement | null>;
  simulatedExamRoom: RefObject<HTMLSpanElement | null>;
  setOpenTour: (val: boolean) => void;
  reopenWelcome: () => void;
}

export default function Sidebar({
  homeRef,
  coursesRef,
  scheduleRef,
  myInfoRef,
  toggleRef,
  simulatedExamRoom,
  reopenWelcome,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "/auth/logout") {
      localStorage.removeItem("USER_LOCAL");
      message.success("Đăng xuất thành công!");
      navigate("/auth/login");
      return;
    }

    if (key === "reopen-tour") {
  reopenWelcome(); // chỉ mở lại Modal
  return;
}


    navigate(key);
  };

  const studentMenu: MenuItem[] = [
  !collapsed
    ? { key: "group_student", label: "Khu vực học tập", type: "group" }
    : { type: "divider" },
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <span ref={homeRef}>Trang chủ</span>,
  },
  {
    key: "/courses",
    icon: <BookOutlined />,
    label: <span ref={coursesRef}>Khóa học của tôi</span>,
  },
  {
    key: "/schedule",
    icon: <CalendarOutlined />,
    label: <span ref={scheduleRef}>Lịch học</span>,
  },
  {
    key: "/my-info",
    icon: <IdcardOutlined />,
    label: <span ref={myInfoRef}>Thông tin cá nhân</span>,
  },
  {
    key: "/simulated-exam-room",
    icon: <ExperimentOutlined />,
    label: <span className="relative pb-2 border-b border-gray-300 underline-animated" ref={simulatedExamRoom}>Phòng thi thực tế ảo</span>,
  },
  {
    key: "reopen-tour",
    icon: <QuestionCircleOutlined />,
    label: "Xem lại hướng dẫn",
  },
  {
    key: "/auth/logout",
    icon: <LogoutOutlined />,
    label: "Đăng xuất",
    danger: true,
  },
];

  const {
    token: { colorBgBase, colorTextBase },
  } = theme.useToken();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{ background: colorBgBase }}
    >
      <div className="flex items-center justify-between px-4 h-16 overflow-hidden">
        <img
          src={collapsed ? smallLogo : logo}
          alt="Logo"
          className={collapsed ? "h-[40px]" : "h-[100px] w-3/5"}
          onClick={() => {
            localStorage.removeItem("reading_key_test_id");
            localStorage.removeItem("reading_answers");
            localStorage.removeItem("reading_correct");
            localStorage.removeItem("reading_timer_start");
            message.info("Bạn đã về trang chủ!");
          }}
        />
        <Button
          ref={toggleRef}
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            color: colorTextBase,
            background: "transparent",
          }}
        />
      </div>
      <div style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ background: colorBgBase, color: colorTextBase }}
          items={studentMenu}
          onClick={handleMenuClick}
        />
      </div>
    </Sider>
  );
}
