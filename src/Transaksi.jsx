import { Layout, Card, Typography, Row, Col, Spin } from "antd";
import { useState, useEffect } from "react";

const { Content } = Layout;
const { Title } = Typography;

const Transaksi = ({ colorBgContainer, borderRadiusLG }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transactions
    fetch("http://localhost:3000/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout style={{ background: colorBgContainer }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ maxWidth: 1200, width: "100%" }}>
          <Card
            bordered={true}
            style={{
              borderRadius: borderRadiusLG,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              margin: "15px 0",
            }}
          >
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
              Riwayat Transaksi
            </Title>
            <Row gutter={[16, 16]} justify="center">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={transaction.id}>
                    <Card
                      title={`Transaksi #${transaction.id}`}
                      style={{
                        margin: "15px 0",
                        border: "2px solid #d9d9d9",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p>Tanggal: {new Date(transaction.date).toLocaleDateString()}</p>
                      <p>Provider: {transaction.providerName}</p>
                      <p>Paket: {transaction.selectedPackage || "Tidak ada paket yang dipilih"}</p>
                      <p>Jumlah: Rp {transaction.totalPrice.toLocaleString()}</p>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Card style={{ textAlign: "center" }}>
                    <Title level={4}>Tidak ada transaksi yang ditemukan.</Title>
                  </Card>
                </Col>
              )}
            </Row>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Transaksi;
