import { SearchOutlined } from "@ant-design/icons";
import { Layout, Input } from "antd";
import { Link } from "react-router-dom";

import "./style.css"; // Menggunakan CSS tambahan untuk responsivitas
import LoginButton from "./ButtonLogin";

const { Header } = Layout;
const { Search } = Input;

const DashboardHeader = () => {
  return (
    <>
      <Header className="dashboard-header">
        <div className="header-container">
          {/* Logo or Title */}
          <h1 className="header-title">E-Commerce</h1>

          {/* Search Bar */}
          <Search placeholder="Search products" enterButton={<SearchOutlined />} size="large" className="search-bar" />

          {/* Button Group for Login */}
          <Link to="/login">
            <LoginButton />
          </Link>
        </div>
      </Header>
    </>
  );
};

export default DashboardHeader;
