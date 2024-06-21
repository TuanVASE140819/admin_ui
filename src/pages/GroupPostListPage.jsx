import React from "react";
import { Table } from "antd";

const GroupPostListPage = () => {
  // Dữ liệu giả lập cho các bài viết trong nhóm
  const posts = [
    {
      id: 1,
      title: "Bài viết 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
      author: "Thành viên 1",
      createdAt: "2023-06-20",
    },
    {
      id: 2,
      title: "Bài viết 2",
      content:
        "Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
      author: "Thành viên 2",
      createdAt: "2023-06-19",
    },
    {
      id: 3,
      title: "Bài viết 3",
      content:
        "Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.",
      author: "Thành viên 3",
      createdAt: "2023-06-18",
    },
  ];

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (content) => content.substring(0, 50) + "...", // Hiển thị 50 ký tự đầu
    },
    { title: "Tác giả", dataIndex: "author", key: "author" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
  ];

  return (
    <div>
      <h2>Bài viết trong nhóm</h2>
      <Table columns={columns} dataSource={posts} />
    </div>
  );
};

export default GroupPostListPage;
