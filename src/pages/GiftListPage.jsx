import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, List, Space, Table, Modal } from "antd";

const GiftListPage = () => {
  const user = {
    id: 1,
    name: "Nguyễn Văn A",
    gifts: [
      {
        name: "Quà 1",
        code: "ABC123",
        phone: "0123456789",
        address: "Quận 1, TP.HCM",
      },
      {
        name: "Quà 2",
        code: "DEF456",
        address: "",
      },
    ],
  };

  const handleViewAddress = (address, phone) => {
    Modal.info({
      title: "Địa chỉ nhận quà",
      content: (
        <div>
          <p>{phone}</p>
          <p>{address}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const columns = [
    { title: "STT", key: "index", render: (_, __, index) => index + 1 },
    { title: "Tên quà", dataIndex: "name", key: "name" },
    { title: "Mã quà tặng", dataIndex: "code", key: "code" },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (address) => address || "Chưa có địa chỉ",
    }, // Hiển thị địa chỉ nếu có, nếu không hiển thị "Chưa có địa chỉ"
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => handleViewAddress(record.address, record.phone)}
          >
            {" "}
            Xem địa chỉ
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Thông tin nhận quà của {user.name}</h2>
      <Table
        columns={columns}
        dataSource={user.gifts}
        bordered
        pagination={false} // Tắt phân trang nếu bạn không muốn hiển thị phân trang
        rowKey="code" // Đặt rowKey để tránh cảnh báo của antd
      />
    </div>
  );
};

export default GiftListPage;
