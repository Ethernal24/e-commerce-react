import { Layout } from "antd";
import "./style.css";
import { CarouselContent } from "./Carousel";
import { Database } from "./Database";

const { Content } = Layout;

// eslint-disable-next-line react/prop-types
const DashboardContent = ({ colorBgContainer, borderRadiusLG }) => (
  <Content
    className="dashboard-content"
    style={{
      //   padding: "0 16px",
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      //   display: "flex",
      //   justifyContent: "center", // Pusatkan konten secara horizontal
      //   alignItems: "flex-start", // Pusatkan secara vertikal dari atas
      //   minHeight: "100vh", // Isi layar penuh secara vertikal
    }}
  >
    <div
      className="content-container"
      style={{
        marginBottom: "40px",
        // maxWidth: "1200px", // Maksimal lebar konten 1200px
        // width: "100%", // Lebar penuh untuk layar kecil
        // display: "block", // Gunakan block agar elemen berada di bawah satu sama lain
        // padding: "24px", // Tambahkan padding untuk estetika
        // boxSizing: "border-box", // Pastikan padding dihitung dalam lebar elemen
      }}
    >
      <div style={{ marginBottom: "40px" }}>
        <CarouselContent />
      </div>
      <div>
        <Database />
      </div>
    </div>
  </Content>
);

export default DashboardContent;
