import styled from "styled-components";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";

const CustomButton = styled(Button)`
  .custom-login-text {
    color: white;

    @media (max-width: 768px) {
      display: none; /* Menyembunyikan teks pada tampilan mobile */
    }
  }
`;

const LoginButton = () => {
  return (
    <CustomButton type="primary" size="large" icon={<LoginOutlined />}>
      <span className="custom-login-text">Login</span>
    </CustomButton>
  );
};

export default LoginButton;
