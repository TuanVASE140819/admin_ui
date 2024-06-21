import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Tag,
  Modal,
  Input,
  Row,
  Col,
  DatePicker,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SearchOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PostManagementPage = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Bài viết 1",
      content: "Nội dung bài viết 1...",
      author: "Admin",
      createdAt: "2023-06-17",
      comments: 5,
      status: "visible", // Trạng thái bài viết: visible hoặc hidden
      createdAt: new Date("2023-06-17"),
    },
    {
      id: 2,
      title: "Bài viết 2",
      content: "Nội dung bài viết 2...",
      author: "Nguyễn Văn A",
      createdAt: "2023-06-16",
      comments: 12,
      status: "hidden",
      createdAt: new Date("2023-06-17"),
    },
    {
      id: 3,
      title: "Bài viết 3",
      content: "Nội dung bài viết 3...",
    },
    // ... thêm các bài viết khác
  ]);

  const handleApprove = (record) => {
    setPosts(
      posts.map((post) =>
        post.id === record.id ? { ...post, approved: !post.approved } : post
      )
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleViewContent = (record) => {
    setSelectedPost(record);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa bài viết "${record.title}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        setPosts(posts.filter((post) => post.id !== record.id));
        message.success("Bài viết đã được xóa thành công.");
      },
    });
  };

  const handleToggleVisibility = (record) => {
    setPosts(
      posts.map((post) =>
        post.id === record.id
          ? {
              ...post,
              status: post.status === "visible" ? "hidden" : "visible",
            }
          : post
      )
    );
  };

  const handleEdit = (record) => {
    // ... (Hiển thị modal để chỉnh sửa bài viết)
  };

  const [searchFilters, setSearchFilters] = useState({
    author: "",
    content: "",
    createdAt: null,
  });

  const handleSearchInputChange = (field, value) => {
    setSearchFilters({ ...searchFilters, [field]: value });
  };

  const handleSearch = () => {
    const filtered = posts.filter((post) => {
      const matchesAuthor = post.author
        .toLowerCase()
        .includes(searchFilters.author.toLowerCase());
      const matchesContent = post.content
        .toLowerCase()
        .includes(searchFilters.content.toLowerCase());
      const matchesDate =
        !searchFilters.createdAt ||
        post.createdAt.toLocaleDateString() ===
          searchFilters.createdAt.toLocaleDateString();
      return matchesAuthor && matchesContent && matchesDate;
    });
    setPosts(filtered);
  };

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Người đăng", dataIndex: "author", key: "author" },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Nội dung tóm tắt",
      dataIndex: "content",
      key: "content",
      render: (content) => content.substring(0, 50) + "...", // Hiển thị 50 ký tự đầu
    },
    { title: "Số lượng bình luận", dataIndex: "comments", key: "comments" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "visible" ? "green" : "red"}>
          {status === "visible" ? "Hiển thị" : "Ẩn"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái duyệt",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => (
        <Tag color={approved ? "green" : "volcano"}>
          {approved ? "Đã duyệt" : "Chưa duyệt"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/post/1`)}>
            Xem nội dung
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button type="link" onClick={() => handleToggleVisibility(record)}>
            {record.status === "visible" ? (
              <EyeInvisibleOutlined />
            ) : (
              <EyeOutlined />
            )}
          </Button>
          <Button
            type="link"
            onClick={() => handleApprove(record)}
            disabled={record.status === "hidden"} // Vô hiệu hóa nút duyệt nếu bài viết đang ẩn
          >
            <CheckOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            placeholder="Tên người đăng"
            value={searchFilters.author}
            onChange={(e) => handleSearchInputChange("author", e.target.value)}
          />
        </Col>

        <Col span={8}>
          <Input
            placeholder="Nội dung bài viết"
            value={searchFilters.content}
            onChange={(e) => handleSearchInputChange("content", e.target.value)}
          />
        </Col>
        <Col span={8}>
          <DatePicker
            placeholder="Ngày đăng"
            value={searchFilters.createdAt}
            onChange={(date) => handleSearchInputChange("createdAt", date)}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={posts} />
      {/* ... (Modal thêm/chỉnh sửa bài viết - giống như trước) */}
      <Modal
        title={selectedPost?.title}
        open={!!selectedPost} // Hiển thị modal khi selectedPost khác null
        onCancel={handleCloseModal}
        footer={null} // Không hiển thị footer mặc định của Modal
      >
        <p>{selectedPost?.content}</p>
      </Modal>
    </div>
  );
};

export default PostManagementPage;
