import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";

const Page1 = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
            }}
          >
            Login
          </h1>

          <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
                alignContent: "space-around",
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Link to="/">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    marginTop: "0px",
                  }}
                >
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button type="primary" className="login-form-button" style={{ width: "100%" }}>
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

export default Page1;
