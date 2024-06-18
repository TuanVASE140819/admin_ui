import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";

const UserPostListPage = () => {
  const userPostsInSchool = [
    {
      id: 1,
      title: "Bài viết 1",
      content: "Nội dung bài viết 1...",
      createdAt: "2023-06-17",
    },
    {
      id: 2,
      title: "Bài viết 2",
      content: "Nội dung bài viết 2...",
      createdAt: "2023-06-16",
    },
  ];
  const handleToggleVisibility = (postId) => {
    // Xử lý ẩn/hiện bài viết với ID là postId
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    {
      title: "Nội dung tóm tắt",
      dataIndex: "content",
      key: "content",
      render: (content) => content.substring(0, 50) + "...",
    },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "visible" ? "green" : "red"}>
          {status === "visible" ? "Hiển thị" : "Đã ẩn"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleToggleVisibility(record.id)}>
            {record.status === "visible" ? "Ẩn" : "Hiện"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Bài viết của .... trong trường</h2>
      <Table columns={columns} dataSource={userPostsInSchool} />
    </div>
  );
};

export default UserPostListPage;
