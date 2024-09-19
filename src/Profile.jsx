import { useState, useEffect } from "react";
import { Layout, Avatar, Card, Button, Modal, Form, Input, message, Col, Row } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import "./style.css";
import "antd/dist/reset.css";

const { Content } = Layout;

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch("http://localhost:3000/profile")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue(profile);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setProfile(values);
        setIsModalVisible(false);

        fetch("http://localhost:3000/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then(() => {
            message.success("Profil berhasil diperbarui!");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            message.error("Gagal memperbarui profil.");
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <Content className="profile-content">
        <Card
          className="profile-card"
          bordered={true} // Menambahkan border pada card
          style={{
            maxWidth: 800,
            margin: "15px auto",
            border: "2px solid #d9d9d9", // Atur border sesuai kebutuhan
            borderRadius: "10px", // Membuat ujung-ujung card menjadi melengkung
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Menambahkan bayangan untuk efek frame yang lebih jelas
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
            }}
          >
            Profile
          </h1>
          <Row gutter={[16, 16]} justify="center" align="middle">
            <Col
              xs={24} // Mengambil 24 kolom (1 baris penuh) di layar kecil
              sm={24}
              md={12} // Mengambil setengah layar di perangkat medium (tablet ke atas)
              lg={12}
              className="profile-avatar"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card
                className="my-card"
                bordered={true} // Menambahkan border pada Card
                style={{
                  width: 200, // Atur lebar card sesuai kebutuhan
                  textAlign: "center",
                  borderRadius: "10px", // Membuat ujung-ujung card melengkung
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Menambahkan bayangan untuk efek frame
                  padding: "15", // Menambahkan padding agar konten tidak terlalu mepet
                }}
              >
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  style={{
                    marginBottom: "25px",
                  }}
                />
                <Button icon={<EditOutlined />} onClick={showModal}>
                  Edit Profil
                </Button>
              </Card>
            </Col>
            {/* Col untuk Detail Profil (kiri di layar besar, atas di layar kecil) */}
            <Col
              xs={24} // Mengambil 24 kolom (1 baris penuh) di layar kecil
              sm={24}
              md={12} // Mengambil setengah layar di perangkat medium (tablet ke atas)
              lg={12}
              className="profile-details"
              style={{ paddingRight: "20px" }}
            >
              <h2>{profile.name}</h2>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Nomor Telepon:</strong> {profile.phone}
              </p>
              <p>
                <strong>Alamat:</strong> {profile.address}
              </p>
            </Col>

            {/* Col untuk Gambar Profil (kanan di layar besar, bawah di layar kecil) */}
          </Row>
        </Card>

        {/* Modal Edit Profile */}
        <Modal title="Edit Profil" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical" name="profileForm">
            <Form.Item label="Nama" name="name" rules={[{ required: true, message: "Nama tidak boleh kosong!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email tidak boleh kosong!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Nomor Telepon" name="phone" rules={[{ required: true, message: "Nomor telepon tidak boleh kosong!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Alamat" name="address">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};
