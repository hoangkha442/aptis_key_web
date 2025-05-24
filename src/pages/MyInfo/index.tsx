import { useEffect, useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { authServices } from "../../config/authServices";
import { userServices } from "../../config/userServices";
import { userLocalStorage } from "../../config/userLocal";
import { Helmet } from "react-helmet-async";

export default function MyInfo() {
  const [infoForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [userId, setUserId] = useState<number | null>(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = userLocalStorage.get()?.token;
        if (!token) {
          message.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
          return;
        }

        const res = await authServices.getUserInfo(token);
        const user = res.data;
        setUserId(user.user_id);

        setTimeout(() => {
          infoForm.setFieldsValue({
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
          });
        }, 0);
      } catch (err) {
        message.error("Lỗi khi lấy thông tin người dùng");
      }
    };

    fetchInfo();
  }, [infoForm]);

  const handleUpdateInfo = async () => {
    try {
      setInfoLoading(true);
      const values = await infoForm.validateFields();
      if (!userId) return;

      await userServices.updateUser(userId, values);
      message.success("Cập nhật thông tin thành công");
    } catch (err) {
      message.error("Cập nhật thông tin thất bại");
    } finally {
      setInfoLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setPasswordLoading(true);
      const values = await passwordForm.validateFields();
      if (!userId) return;

      await userServices.updateUser(userId, {
        password: values.password,
      });

      message.success("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        localStorage.removeItem("USER_LOCAL");
        window.location.href = "/auth/login";
      }, 300);
    } catch {
      message.error("Đổi mật khẩu thất bại");
    } finally {
      setPasswordLoading(false);
    }
  };

  // if (loading) return <Spin className="block mx-auto mt-10" />;

  return (
    <div className="max-w-4xl mx-auto p-4 flex gap-5">
      <Helmet>
        <title>Thông tin cá nhân | PassKey Center</title>
        <meta
          name="description"
          content="Xem và cập nhật hồ sơ cá nhân của bạn: tên, email, tài khoản học viên và lịch sử học tập tại PassKey Center."
        />
      </Helmet>

      <Card title="Thông tin cá nhân" className="w-1/2">
        <Form layout="vertical" form={infoForm} onFinish={handleUpdateInfo}>
          <Form.Item
            label="Họ tên"
            name="full_name"
            rules={[
              { required: true, message: "Họ tên không được để trống" },
              { max: 16, message: "Họ tên không quá 16 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Email không hợp lệ" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[
              { required: true, message: "Số điện thoại không được để trống" },
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại phải bắt đầu bằng 0 và đủ 10 số",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={infoLoading}>
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Đổi mật khẩu" className="w-1/2">
        <Form
          layout="vertical"
          form={passwordForm}
          onFinish={handleUpdatePassword}
        >
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { max: 20, message: "Mật khẩu không được quá 20 ký tự" },
              {
                pattern: /^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).*$/,
                message:
                  "Mật khẩu phải có ít nhất 1 chữ in hoa, 1 ký tự đặc biệt và không chứa khoảng trắng",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={passwordLoading}>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
