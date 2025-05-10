import { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme, message } from "antd";
import logo from "../../assets/passkey_logo.png";
import smallLogo from "../../assets/smallLogo.png";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];



export default function Sidebar() {
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

    // if (key === "/schedule" || key === "/profile") {
    //   message.warning("Tính năng chưa phát triển!");
    //   return;
    // }

    navigate(key);
  };

  const studentMenu: MenuItem[] = [
    !collapsed
      ? { key: "group_student", label: "Khu vực học tập", type: "group" }
      : { type: "divider" },
    { key: "/", label: "Trang chủ", icon: <MailOutlined /> },
    { key: "/courses", label: "Khóa học của tôi", icon: <SettingOutlined /> },
    { key: "/schedule", label: "Lịch học", icon: <UserOutlined /> },
    { key: "/my-info", label: "Thông tin cá nhân", icon: <UserOutlined /> },
    {
      key: "/auth/logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
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
        {!collapsed ? (
          <img
            src={logo}
            alt="Logo"
            className="h-[100px] object-contain w-full cursor-pointer"
            onClick={() => {
              {
                localStorage.removeItem("reading_key_test_id");
                localStorage.removeItem("reading_answers");
                localStorage.removeItem("reading_correct");
                localStorage.removeItem("reading_timer_start");
                message.info('Bạn đã về trang chủ!')
              }
            }}
          />
        ) : (
          <img
            src={smallLogo}
            alt="Small Logo"
            className="h-[40px] object-contain cursor-pointer"
            onClick={() => {
              {
                localStorage.removeItem("reading_key_test_id");
                localStorage.removeItem("reading_answers");
                localStorage.removeItem("reading_correct");
                localStorage.removeItem("reading_timer_start");
                message.info('Bạn đã về trang chủ!')
              }
            }}
          />
        )}

        <Button
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
