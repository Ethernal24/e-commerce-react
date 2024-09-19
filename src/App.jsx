import { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import DashboardHeader from "./Header"; // Ubah dari "./Header" ke "DashboardHeader" agar sesuai
import DashboardContent from "./Content"; // Ubah dari "./Content" ke "DashboardContent" agar sesuai
import Page1 from "./Login";
import Register from "./Register";
import Transaksi from "./Transaksi";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProfilePage } from "./Profile";
import AppFooter from "./Footer";
import { useLayoutEffect } from "react";
import { ProviderDetail } from "./ProviderDetail";
import { InvoicePage } from "./Invoice";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const location = useLocation();
  const [sidebarHeight, setSidebarHeight] = useState("100vh");
  useLayoutEffect(() => {
    const contentElement = document.getElementById("main-content");
    if (contentElement) {
      const contentHeight = contentElement.offsetHeight;
      console.log("Content Height:", contentHeight); // Log tinggi konten
      const newSidebarHeight = Math.max(contentHeight, window.innerHeight) + "px";
      setSidebarHeight(newSidebarHeight);
      console.log("Sidebar Height Set To:", newSidebarHeight); // Log tinggi sidebar yang baru
    }
  }, [location]);

  // Jika user berada di "/login", tampilkan hanya halaman login
  if (location.pathname === "/login") {
    return <Page1 />;
  } else if (location.pathname === "/register") {
    return <Register />;
  } else {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <DashboardHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <div id="main-content" style={{ padding: "24px", flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/transaksi" element={<Transaksi />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/provider/:id" element={<ProviderDetail />} />
              <Route path="/invoice" element={<InvoicePage />} />
            </Routes>
          </div>
          <AppFooter />
        </Layout>
        <Sidebar
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          style={{ height: sidebarHeight }} // Sidebar height based on content height
        />
      </Layout>
    );
  }
}

export default App;
