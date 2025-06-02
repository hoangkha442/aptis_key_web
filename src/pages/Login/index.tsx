"use client";
import { useEffect, useState } from "react";
import { Button, Input, Spin, Form, Card, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { authServices } from "../../config/authServices";
import { useNavigate } from "react-router-dom";
import { userLocalStorage } from "../../config/userLocal";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Helmet } from "react-helmet-async";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Nếu đã đăng nhập thì chuyển hướng về trang chủ
  useEffect(() => {
    const isLoggedIn = !!userLocalStorage.get()?.token;
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    await authServices
      .login(values)
      .then((res) => {
        const userData = res.data;
        setLoading(false);

        // Lưu localStorage và dispatch Redux
        userLocalStorage.set(userData);
        dispatch(loginSuccess(userData));
        message.success("Đăng nhập thành công");
        navigate("/");
      })
      .catch((err) => {
        console.error("err:", err?.response?.data?.message);
        const message = err?.response?.data.message;
        setError(message);
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <title>Đăng nhập | PassKey Center</title>
        <meta
          name="description"
          content="Đăng nhập tài khoản tại PassKey Center."
        />
      </Helmet>
      <div className="!w-96 shadow-xl rounded-lg">
        <Card>
          <Typography.Title level={2} className="text-center mb-4">
            Đăng nhập
          </Typography.Title>

          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được bỏ trống!" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Mật khẩu không được bỏ trống!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
              />
            </Form.Item>

            {/* <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
                size="large"
              >
                {loading ? <Spin /> : "Đăng nhập"}
              </Button>
            </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
                size="large"
              >
                {loading ? <Spin /> : "Đăng nhập"}
              </Button>
              {/* <Button
                type="default"
                className="w-full mt-2"
                onClick={() =>
                  (window.location.href = "https://aptisapi-production.up.railway.app/auth/google")
                }
              >
                Đăng nhập bằng Google Drive
              </Button> */}
            </Form.Item>
          </Form>

          {error && (
            <Typography.Text type="danger" className="block text-center">
              {error}
            </Typography.Text>
          )}
        </Card>
      </div>
    </div>
  );
}
