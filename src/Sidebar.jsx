import { UserOutlined, TransactionOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Menu, Layout, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const { Sider } = Layout;

// eslint-disable-next-line react/prop-types
const Sidebar = ({ collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Update state ketika ukuran jendela berubah
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Ganti 768 dengan breakpoint yang diinginkan
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call handler to set initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getKeyFromPath = (path) => {
    switch (path) {
      case "/":
        return "1";
      case "/transaksi":
        return "2";
      case "/profile":
        return "3";
      default:
        return "0"; // Default ke Home jika path tidak ditemukan
    }
  };

  return (
    <>
      {/* Sidebar untuk mode desktop */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "hidden",
            background: "linear-gradient(180deg, #6e8efb, #a777e3)",
          }}
        >
          <div className="demo-logo-vertical" />
          <div style={{ display: "flex", justifyContent: collapsed ? "center" : "flex-end", padding: "16px", maxHeight: "100vh" }}>
            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleCollapsed} style={{ fontSize: "16px", color: "white" }} />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getKeyFromPath(location.pathname)]}
            style={{ gap: "25px", background: "none" }}
            items={[
              { key: "1", icon: <HomeOutlined />, label: <Link to="/">Home </Link> },
              { key: "2", icon: <TransactionOutlined />, label: <Link to="/transaksi">Transaksi</Link> },
              { key: "3", icon: <UserOutlined />, label: <Link to="/profile">Costumer</Link> },
            ]}
          />
        </Sider>
      )}

      {/* Bottom bar untuk mode mobile */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "10px",
            background: "#6e8efb",
            position: "fixed", // Menjadikan posisi tetap
            bottom: 0, // Mengatur posisi di bagian bawah
            width: "100%", // Lebar penuh
            zIndex: 1000, // Menjaga agar tetap di atas konten lainnya
          }}
        >
          <Link to="/">
            <Button type="text" icon={<HomeOutlined />} />
          </Link>
          <Link to="/transaksi">
            <Button type="text" icon={<TransactionOutlined />} />
          </Link>
          <Link to="/profile">
            <Button type="text" icon={<UserOutlined />} />
          </Link>
        </div>
      )}
    </>
  );
};

export default Sidebar;
