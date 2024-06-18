import React, { useState } from "react";
import { Table, Button, Tag, Space, Popconfirm, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UserManagementPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      role: "teacher",
      status: "banned",
    },
    {
      id: 3,
      name: "Phạm Văn C",
      email: "phamvanc@example.com",
      role: "student",
      status: "active",
    },
    // Thêm người dùng khác tại đây
  ]);

  const handleBanUser = (record) => {
    setUsers(
      users.map((user) =>
        user.id === record.id ? { ...user, status: "banned" } : user
      )
    );
  };

  const handleUnbanUser = (record) => {
    setUsers(
      users.map((user) =>
        user.id === record.id ? { ...user, status: "active" } : user
      )
    );
  };

  const handleViewUserInfo = (record) => {
    navigate(`/user/${record.id}`); // Điều hướng đến trang chi tiết người dùng
  };

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => <Avatar icon={<UserOutlined />} />, // Hiển thị avatar
    },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={
            role === "admin" ? "gold" : role === "teacher" ? "blue" : "green"
          }
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Bị khóa"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleViewUserInfo(record)}>
            Xem thông tin
          </Button>
          {record.status === "active" ? (
            <Popconfirm
              title="Bạn có chắc chắn muốn khóa người dùng này?"
              onConfirm={() => handleBanUser(record)}
              okText="Khóa"
              cancelText="Hủy"
            >
              <Button type="link" danger>
                Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Button type="link" onClick={() => handleUnbanUser(record)}>
              Mở khóa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default UserManagementPage;
