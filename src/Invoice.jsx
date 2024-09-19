import { useEffect, useState, useCallback } from "react";
import { Card, Typography } from "antd";
import { useLocation } from "react-router-dom";

const { Title, Paragraph } = Typography;

export function InvoicePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const providerNumber = queryParams.get("providerNumber");
  const providerName = queryParams.get("providerName");
  const selectedPackage = queryParams.get("selectedPackage");
  const selectedPaymentMethod = queryParams.get("selectedPaymentMethod");
  const totalPrice = queryParams.get("totalPrice");

  const selectedPackageId = parseInt(selectedPackage);
  const totalPriceValue = parseFloat(totalPrice);

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInvoiceSaved, setIsInvoiceSaved] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/internetProvider")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const allPackages = data.flatMap((provider) => provider.packages);
        setPackages(allPackages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Menggunakan useCallback untuk menghindari penyimpanan ganda
  const saveInvoice = useCallback(() => {
    const invoiceData = {
      providerNumber,
      providerName,
      selectedPackage: selectedPackageId,
      selectedPaymentMethod,
      totalPrice: totalPriceValue,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Invoice saved:", data);
      })
      .catch((error) => {
        console.error("Error saving invoice:", error);
      });
  }, [providerNumber, providerName, selectedPackageId, selectedPaymentMethod, totalPriceValue]); // Tambahkan semua dependency yang digunakan dalam invoiceData

  useEffect(() => {
    if (!isInvoiceSaved) {
      saveInvoice();
      setIsInvoiceSaved(true);
    }
  }, [isInvoiceSaved, saveInvoice]); // Sertakan saveInvoice di sini

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const chosenPackage = packages.find((pkg) => pkg.packageId === selectedPackageId);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Invoice Pemesanan
      </Title>

      <Card style={{ marginBottom: "20px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Title level={4}>Detail Pemesanan</Title>
        <Paragraph>
          <strong>Nomor Provider:</strong> {providerNumber}
        </Paragraph>
        <Paragraph>
          <strong>Nama Provider:</strong> {providerName}
        </Paragraph>
        <Paragraph>
          <strong>Paket yang Dipilih:</strong> {chosenPackage ? chosenPackage.name : "Tidak ada paket yang dipilih"}
        </Paragraph>
        <Paragraph>
          <strong>Metode Pembayaran:</strong> {selectedPaymentMethod}
        </Paragraph>
        <Paragraph>
          <strong>Total Harga:</strong> Rp {totalPriceValue ? totalPriceValue.toLocaleString() : 0}
        </Paragraph>
      </Card>

      <Card style={{ padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Title level={4} style={{ textAlign: "center" }}>
          Terima Kasih!
        </Title>
        <Paragraph style={{ textAlign: "center" }}>Pesanan Anda telah berhasil diproses. Kami akan segera menghubungi Anda.</Paragraph>
      </Card>
    </div>
  );
}
