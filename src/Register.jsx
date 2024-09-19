import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";

const Register = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div
          style={{
            padding: "0px",
            margin: "0px",
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
            }}
          >
            Register
          </h1>

          <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your Email" }]}>
              <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Link to="/login">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  Register
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
