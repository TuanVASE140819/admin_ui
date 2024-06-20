import React, { useState } from "react";
import { Table, Button, Tag, Space, Popconfirm, Avatar, Input } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => <Avatar icon={<UserOutlined />} />, // Hiển thị avatar
    },
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
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
