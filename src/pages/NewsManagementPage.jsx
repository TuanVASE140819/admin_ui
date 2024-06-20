import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Space,
  Popconfirm,
  message,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // Sử dụng CKEditor 5
import Parser from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Option } from "antd/es/mentions";

const NewsManagementPage = () => {
  // state news
  ClassicEditor.create(document.querySelector("#editor"), {
    toolbar: ["heading", "|", "bold", "italic", "|", "link"],
  })
    .then((editor) => {
      console.log("Editor was initialized", editor);
    })
    .catch((error) => {
      console.error(error.stack);
    });
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Tin tức 1",
      content: "<p>Nội dung tin tức 1...</p>",
      category: "Thể thao",
      createdAt: "2023-06-19",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Tin tức 2",
      content: "<p>Nội dung tin tức 2...</p>",
      category: "Giáo dục",
      createdAt: "2023-06-18",
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ]);

  // State cho modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // Form instance
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingNews) {
      form.setFieldsValue(editingNews);
    } else {
      form.resetFields();
    }
  }, [editingNews, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingNews(null);
  };

  const handleEdit = (record) => {
    setEditingNews(record);
    showModal();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa tin tức "${record.title}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        setNews(news.filter((newsItem) => newsItem.id !== record.id));
        message.success("Tin tức đã được xóa thành công.");
      },
    });
  };
  const handleEditorChange = (evt) => {
    const newContent = evt.editor.getData();
    form.setFieldsValue({ content: newContent });
  };
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingNews) {
        // Cập nhật tin tức
        setNews(
          news.map((newsItem) =>
            newsItem.id === editingNews.id
              ? { ...newsItem, ...values }
              : newsItem
          )
        );
        message.success("Tin tức đã được cập nhật thành công.");
      } else {
        // Thêm tin tức mới
        const newNews = {
          id: news.length + 1,
          ...values,
          createdAt: new Date().toLocaleDateString(), // Lấy ngày hiện tại
        };
        setNews([...news, newNews]);
        message.success("Tin tức đã được thêm thành công.");
      }
      setIsModalVisible(false);
      setEditingNews(null);
    } catch (errorInfo) {
      console.log("Validate Failed:", errorInfo);
    }
  };

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    {
      title: "Nội dung tóm tắt",
      dataIndex: "content",
      key: "content",
      render: (content) => (
        <div>{Parser(content?.substring(0, 50) || "") + "..."}</div>
      ),
    },
    // loại tin tức
    { title: "Nhóm tin tức", dataIndex: "category", key: "category" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Thêm tin tức
      </Button>
      <Table columns={columns} dataSource={news} />

      {/* Modal để thêm hoặc chỉnh sửa tin tức */}
      <Modal
        title={editingNews ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          {/* Select nhóm tin tức */}
          <Form.Item
            name="category"
            label="Nhóm tin tức"
            rules={[{ required: true, message: "Vui lòng chọn nhóm tin tức" }]}
          >
            <Select>
              <Option value="1">Thể thao</Option>
              <Option value="2">Giáo dục</Option>
              <Option value="3">Công nghệ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <CKEditor
              editor={ClassicEditor}
              data={editingNews?.content || ""}
              onChange={(event, editor) => {
                const data = editor.getData();
                form.setFieldsValue({ content: data });
              }}
              config={{
                // Cấu hình CKEditor 5
                toolbar: {
                  items: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "imageUpload",
                    "mediaEmbed",
                    "|",
                    "undo",
                    "redo",
                  ],
                },
                image: {
                  // Cấu hình đường dẫn lưu trữ hình ảnh
                  toolbar: [
                    "imageStyle:inline",
                    "imageStyle:block",
                    "imageStyle:side",
                    "|",
                    "toggleImageCaption",
                    "imageTextAlternative",
                  ],
                },
              }}
            />
          </Form.Item>

          <Form.Item
            name="author"
            label="Tác giả"
            rules={[{ required: true, message: "Vui lòng nhập tác giả" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Ảnh"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload>
              <Button>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewsManagementPage;
