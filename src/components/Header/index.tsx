import {
  Layout,
  Breadcrumb,
  Avatar,
  Dropdown,
  MenuProps,
  Typography,
  Divider,
  Space,
  message,
  Modal,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, RefObject, useEffect } from "react";

const { Header } = Layout;
const { Text } = Typography;

interface UserProps {
  user: {
    username: string;
    full_name: string;
    avatar: string | null;
    role: string;
  } | null;
  breadcrumbRef: RefObject<HTMLDivElement | null>;
  avatarRef: RefObject<HTMLDivElement | null>;
  termsRef: RefObject<HTMLButtonElement | null>;
  userSessionsRef: RefObject<HTMLButtonElement | null>;
  openSessionsModal: () => void;
}

export default function CustomHeader({
  user,
  breadcrumbRef,
  avatarRef,
  termsRef,
  openSessionsModal,
  userSessionsRef,
}: UserProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("USER_LOCAL");
      message.success("Đăng xuất thành công!");
      navigate("/auth/login");
    } else if (key === "avatar" || key === "profile" || key === "my-info") {
      navigate("/my-info");
    } else {
      message.info("Tính năng chưa phát triển!");
    }
  };
  useEffect(() => { 
      localStorage.removeItem("writingUI");
                      localStorage.removeItem("listening_key_test_id");
                      localStorage.removeItem("reading_key_test_id");
                      localStorage.removeItem("reading_answers");
                      localStorage.removeItem("simulated_listening_answers");
                      localStorage.removeItem("simulated_reading_answers");
                      localStorage.removeItem("speakingUI");
                      
     },[])

  const generateBreadcrumbs = () => {
    const pathArray = location.pathname.split("/").filter(Boolean);

    const breadcrumbs: { title: React.ReactNode }[] = [
      { title: <Link to="/">Trang chủ</Link> },
    ];

    const breadcrumbTitleMap: Record<string, string> = {
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
          <Space
            direction="horizontal"
            size="small"
            style={{ display: "flex" }}
          >
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
    {
      key: "profile",
      label: "Thông tin",
      icon: <InfoCircleOutlined />,
    },
    {
      key: "my-info",
      label: "Đổi mật khẩu",
      icon: <LockOutlined />,
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
    },
    { type: "divider" },
    {
      key: "version",
      label: "PassKey Center - 2025",
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
      <div ref={breadcrumbRef}>
        <Breadcrumb
          items={generateBreadcrumbs() ?? []}
          style={{ fontSize: "14px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Tooltip
          title="PassKeyCenter chỉ cho phép 1 tài khoản được đăng nhập vào Website với tối đa 3 địa chỉ Wifi/4G (tính trên mọi thiết bị đăng nhập)"
          placement="bottomRight"
          className="text-sm leading-5 max-w-[300px]"
          color="#45368f"
        >
          <button
            ref={userSessionsRef}
            onClick={openSessionsModal}
            className="cursor-pointer text-blue-800 font-medium"
          >
            Login History
          </button>
        </Tooltip>
        <button
          ref={termsRef}
          onClick={showModal}
          className="cursor-pointer text-blue-800 font-medium"
        >
          Terms & Conditions
        </button>

        <div ref={avatarRef}>
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleMenuClick }}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <Avatar
              size="default"
              src={avatarSrc}
              icon={!avatarSrc ? <UserOutlined /> : undefined}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </div>
      <Modal
        title={
          <span>
            <ExclamationCircleOutlined style={{ marginRight: 8 }} />
            Terms & Conditions
          </span>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Tôi đã hiểu"
        cancelText="Đóng"
      >
        <p>
          <strong>Trung tâm cam kết hoàn 100% học phí cho học viên</strong> nếu
          không đạt yêu cầu đầu ra.
        </p>
        <p>
          <strong>Điều kiện:</strong>
        </p>
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
          <li>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Tham gia ít nhất{" "}
            <strong>6/8 buổi học</strong>.
          </li>
          <li>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Học thuộc các key của
            Reading và Listening.
          </li>
          <li>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Reading đạt tối thiểu{" "}
            <strong>46/50</strong>, Listening đạt tối thiểu{" "}
            <strong>42/50</strong>.
          </li>
          <li>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Làm đầy đủ bài tập
            được giao.
          </li>
        </ul>
        <p>
          Sau khi thi xong, tài khoản sẽ <strong>bị unactive</strong>.
        </p>
      </Modal>
    </Header>
  );
}
