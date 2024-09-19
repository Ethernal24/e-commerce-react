import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        color: "black",
        borderTop: "1px solid #d9d9d9",
        padding: "10px 20px", // Padding responsif
        paddingBottom: "60px", // Tambahkan padding bottom untuk menghindari overlap dengan bottom bar
        width: "100%",
      }}
    >
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 10px",
            color: "black",
            textDecoration: "none",
            fontSize: "14px", // Ukuran font responsif
          }}
        >
          Facebook
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 10px",
            color: "black",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Twitter
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            margin: "0 10px",
            color: "black",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Instagram
        </a>
      </div>
      <div style={{ fontSize: "12px" }}>© 2024 Your Company. All Rights Reserved.</div>
    </Footer>
  );
};

export default AppFooter;
