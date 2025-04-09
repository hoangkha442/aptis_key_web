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
import { Button, Layout, Menu, theme } from "antd";
import logo from "../../assets/logo.png";
import smallLogo from "../../assets/smallLogo.png";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

interface SidebarProps {
  setLoading: (value: boolean) => void;
}

export default function Sidebar({ setLoading }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "/auth/logout") {
      navigate(key);
      return;
    }

    setLoading(true);
    navigate(key);
    setTimeout(() => setLoading(false), 500);
  };

  const studentMenu: MenuItem[] = [
    !collapsed
      ? { key: "group_student", label: "Khu vực học tập", type: "group" }
      : { type: "divider" },
    { key: "/", label: "Trang chủ", icon: <MailOutlined /> },
    { key: "/courses", label: "Khóa học của tôi", icon: <SettingOutlined /> },
    { key: "/schedule", label: "Lịch học", icon: <UserOutlined /> },
    { key: "/profile", label: "Hồ sơ cá nhân", icon: <UserOutlined /> },
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
      <div className="flex items-center justify-between px-4 h-16">
        {!collapsed ? (
          <img src={logo} alt="Logo" className="h-[60px] object-contain w-full" />
        ) : (
          <img src={smallLogo} alt="Small Logo" className="h-[40px] object-contain" />
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
