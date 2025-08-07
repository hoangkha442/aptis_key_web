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
  MenuOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, RefObject, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
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
  const location = useLocation()
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }, []);

  const generateBreadcrumbs = () => {
    const pathArray = location.pathname.split("/").filter(Boolean)
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
      const href = `/${pathArray.slice(0, index + 1).join("/")}`
      const title = breadcrumbTitleMap[path] || path;
      breadcrumbs.push({
        title: <Link to={href}>{title}</Link>,
      });
    });

    return breadcrumbs
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

  const sidebarMenuItems = [
    {
      key: "/",
      label: <span>Trang chủ</span>,
      onClick: () => navigate("/"),
    },
    {
      key: "/courses",
      label: <span>Khóa học của tôi</span>,
      onClick: () => navigate("/courses"),
    },
    {
      key: "/my-info",
      label: <span>Thông tin cá nhân</span>,
      onClick: () => navigate("/my-info"),
    },
    {
      key: "/simulated-exam-room",
      label: (
        <span className="relative pb-2 border-b border-gray-300 underline-animated">
          Phòng thi thực tế ảo
        </span>
      ),
      onClick: () => navigate("/simulated-exam-room"),
    },
    {
      key: "/auth/logout",
      label: "Đăng xuất",
      onClick: () => {
        localStorage.removeItem("USER_LOCAL");
        message.success("Đăng xuất thành công!");
        navigate("/auth/login");
      },
      danger: true,
    },
  ];
  return (
    <Header
      className={`!px-5 !bg-white !flex !items-center !border-b !border-[#f0f0f0] ${
        isMobile ? "justify-end" : "!justify-between"
      }`}
    >
      {isMobile ? (
        <div className="flex items-center justify-start w-full">
          <MenuOutlined
            className="text-2xl cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
          <Modal
            open={mobileMenuOpen}
            onCancel={() => setMobileMenuOpen(false)}
            footer={null}
            closable={false}
            width={"100%"}
            style={{ top: 0, left: 8, position: "fixed" }}
          >
            <div className="flex flex-col gap-4 justify-center">
              <p className="w-full flex justify-end">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-4 rounded-lg text-white font-medium bg-blue-800"
                >
                  X
                </button>
              </p>
              {sidebarMenuItems.map((item) =>
                item.key === "divider" ? (
                  <hr key={item.key} />
                ) : (
                  <button
                    key={item.key}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      item.onClick();
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-left justify-center 
                      ${
                        item.danger
                          ? "text-red-600 font-semibold"
                          : location.pathname === item.key
                          ? "text-[#45378f] font-medium"
                          : "text-gray-800"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </Modal>
        </div>
      ) : (
        <div ref={breadcrumbRef}>
          <Breadcrumb
            items={generateBreadcrumbs() ?? []}
            style={{ fontSize: "14px" }}
          />
        </div>
      )}

      <div
        className={`flex items-center gap-8 ${
          isMobile ? "justify-end w-full" : ""
        }`}
      >
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
        {isMobile ? (
          <></>
        ) : (
          <button
            ref={termsRef}
            onClick={showModal}
            className="cursor-pointer text-blue-800 font-medium"
          >
            Terms & Conditions
          </button>
        )}

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
        <ul style={{ paddingLeft: 0, listStyle: "none" }}>
      
          <li>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Học thuộc các key của
            Reading và Listening.
          </li>
        </ul>
        <p>
          Sau khi thi xong, tài khoản sẽ <strong>bị unactive</strong>.
        </p>
      </Modal>
    </Header>
  );
}
