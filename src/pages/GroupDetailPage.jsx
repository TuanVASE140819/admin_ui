import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Tag, Space } from "antd";
import { TeamOutlined, FileTextOutlined, EyeOutlined } from "@ant-design/icons";

const GroupDetailPage = ({ schools }) => {
  // ... (lấy schoolId từ useParams như trước)

  const school = {
    id: 1,
    name: "Trường A",
    groups: [
      {
        id: 1, // Thêm ID cho mỗi nhóm
        name: "Nhóm Toán",
        description: "Nhóm học tập và thảo luận về môn Toán.",
        // numMembers: 25,
        numPosts: 12,
        bannerUrl: "https://via.placeholder.com/800x300",
      },
      {
        id: 2,
        name: "Nhóm Văn",
        description: "Nhóm yêu thích môn Văn học.",
        // numMembers: 30,
        numPosts: 8,
        bannerUrl: "https://via.placeholder.com/800x300",
      },
      // ... (Thêm các nhóm khác tương tự)
    ],
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên nhóm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Số thành viên",
    //   dataIndex: "numMembers",
    //   key: "numMembers",
    // },
    {
      title: "Số bài viết",
      dataIndex: "numPosts",
      key: "numPosts",
    },
    // {
    //   title: "Hành động",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button type="link" icon={<EyeOutlined />}>
    //         Xem chi tiết
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div>
      <h2>Danh sách nhóm của trường {school.name}</h2>
      <Table columns={columns} dataSource={school.groups} />
    </div>
  );
};

export default GroupDetailPage;
