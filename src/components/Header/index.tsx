import {
  Layout,
  Breadcrumb,
  Avatar,
  Dropdown,
  MenuProps,
  Typography,
  Divider,
  Space,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

interface UserProps {
  user: {
    username: string;
    full_name: string;
    avatar: string | null;
    role: string;
  } | null;
}

export default function CustomHeader({ user }: UserProps) {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathArray = location.pathname.split("/").filter((x) => x);
    const breadcrumbs = [
      {
        title: (
          <Link to="/">
            Trang chủ
          </Link>
        ),
      },
    ];

    const breadcrumbTitleMap: { [key: string]: string } = {
      dashboard: "Dashboard",
      student: "Học viên",
      courses: "Khóa học của tôi",
      schedule: "Lịch học",
      profile: "Hồ sơ cá nhân",
    };

    pathArray.forEach((path, index) => {
      const href = `/${pathArray.slice(0, index + 1).join("/")}`;
      const title = breadcrumbTitleMap[path] || path;

      breadcrumbs.push({
        title: <Link to={href}>{title}</Link>,
      });
    });

    return breadcrumbs;
  };

  const avatarSrc = user?.avatar && user.avatar !== "" ? user.avatar : null;

  const userMenuItems: MenuProps["items"] = [
    {
      key: "avatar",
      label: (
        <div className="w-44">
          <Space direction="horizontal" size="small" style={{ display: "flex" }}>
            <Avatar
              size={50}
              src={avatarSrc}
              icon={!avatarSrc ? <UserOutlined /> : undefined}
            />
            <div className="flex flex-col">
              <Text strong>{user?.full_name || "Người dùng"}</Text>
              <Text type="secondary">{user?.role || "Vai trò"}</Text>
            </div>
          </Space>
          <Divider style={{ margin: "10px 0" }} />
        </div>
      ),
    },
    { key: "profile", label: "Thông tin", icon: <InfoCircleOutlined /> },
    { key: "change-password", label: "Đổi mật khẩu", icon: <LockOutlined /> },
    { type: "divider" },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      // onClick: handleLogout,
    },
    { type: "divider" },
    {
      key: "version",
      label: "Aptis - 2025",
      disabled: true,
      style: { textAlign: "center" },
    },
  ];

  return (
    <Header
      style={{
        padding: "0 20px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Breadcrumb
        items={generateBreadcrumbs()}
        style={{ marginLeft: "10px", fontSize: "14px" }}
      />

      <Dropdown
        menu={{ items: userMenuItems }}
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <Avatar
            size="default"
            src={avatarSrc}
            icon={!avatarSrc ? <UserOutlined /> : undefined}
          />
        </div>
      </Dropdown>
    </Header>
  );
}
