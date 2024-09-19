import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col, Input, Form } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export function ProviderDetail() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [providerName, setProviderName] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [providerNumber, setProviderNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/internetProvider/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProvider(data);
        setProviderName(data.name); // Ambil nama provider dari data
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (selectedPackage) {
      const selectedPkg = provider.packages.find((pkg) => pkg.packageId === selectedPackage);
      if (selectedPkg) {
        setTotalPrice(selectedPkg.price);
      }
    } else {
      setTotalPrice(0);
    }
  }, [selectedPackage, provider]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const imageUrl = `/${provider.image}`;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Card
        className="internet-provider-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "225px",
          height: "225px",
          margin: "0 auto",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          marginBottom: "25px",
        }}
      >
        <img src={imageUrl} alt={provider.name} style={{ maxWidth: "150px", alignSelf: "center" }} />
        <Title level={4}>{provider.name}</Title>
      </Card>

      <Card style={{ marginBottom: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Paragraph style={{ textAlign: "center" }}>{provider.description}</Paragraph>

        <Title level={2} style={{ textAlign: "center", marginTop: "0px", marginBottom: "20px" }}>
          Paket yang Tersedia
        </Title>
        <Row gutter={16} justify="center">
          {provider.packages.map((pkg) => (
            <Col key={pkg.packageId} xs={24} sm={12} md={8} lg={6}>
              <Card
                className="internet-provider-card"
                title={pkg.name}
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  backgroundColor: selectedPackage === pkg.packageId ? "#e6f7ff" : "white",
                }}
                hoverable
                onClick={() => setSelectedPackage(pkg.packageId)}
              >
                <Paragraph>Harga: Rp {pkg.price}</Paragraph>
                <Button type="primary">Pilih Paket</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Form untuk memasukkan nomor provider */}
      <Card style={{ width: "100%", marginBottom: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Title level={3} style={{ textAlign: "center", marginTop: "0px", marginBottom: "20px" }}>
          Masukkan Nomor
        </Title>
        <Form style={{ marginTop: "20px", textAlign: "center" }}>
          <Form.Item>
            <Input placeholder="Masukkan Nomor Provider" value={providerNumber} onChange={(e) => setProviderNumber(e.target.value)} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Card>

      {/* Kartu untuk memilih metode pembayaran */}
      <Card style={{ width: "100%", marginBottom: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Title level={3} style={{ textAlign: "center", marginTop: "0px", marginBottom: "20px" }}>
          Pilih Metode Pembayaran
        </Title>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              onClick={() => setSelectedPaymentMethod("QRIS")}
              style={{
                marginBottom: "15px",
                cursor: "pointer",
                border: selectedPaymentMethod === "QRIS" ? "2px solid #1890ff" : "1px solid #ccc",
                transition: "all 0.3s",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="/src/image/qris.png" alt="QRIS" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              onClick={() => setSelectedPaymentMethod("OVO")}
              style={{
                marginBottom: "15px",
                cursor: "pointer",
                border: selectedPaymentMethod === "OVO" ? "2px solid #1890ff" : "1px solid #ccc",
                transition: "all 0.3s",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="/src/image/ovo.png" alt="OVO" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              onClick={() => setSelectedPaymentMethod("DANA")}
              style={{
                marginBottom: "15px",
                cursor: "pointer",
                border: selectedPaymentMethod === "DANA" ? "2px solid #1890ff" : "1px solid #ccc",
                transition: "all 0.3s",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="/src/image/dana.png" alt="DANA" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Bottom bar untuk menampilkan total pemesanan */}
      <Card style={{ width: "100%", marginTop: "20px", padding: "10px", textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Title level={4}>Total Pemesanan</Title>
        <Paragraph>Rp {totalPrice.toLocaleString()}</Paragraph>
        <Link to={`/invoice?providerNumber=${providerNumber}&providerName=${providerName}&selectedPackage=${selectedPackage}&selectedPaymentMethod=${selectedPaymentMethod}&totalPrice=${totalPrice}`}>
          <Button type="primary" disabled={!selectedPackage || !selectedPaymentMethod || !providerNumber}>
            Konfirmasi Pemesanan
          </Button>
        </Link>
      </Card>
    </div>
  );
}
