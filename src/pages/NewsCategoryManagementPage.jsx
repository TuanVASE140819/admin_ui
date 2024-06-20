import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  DatePicker,
  Select,
  Row,
  Col,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const NewsCategoryManagementPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Thể thao",
      createdAt: moment("2023-06-19"),
      status: "active",
    },
    {
      id: 2,
      name: "Giáo dục",
      createdAt: moment("2023-06-18"),
      status: "inactive",
    },
    {
      id: 3,
      name: "Công nghệ",
      createdAt: moment("2023-06-17"),
      status: "active",
    },
    // ... thêm các nhóm tin tức khác
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    status: null,
    fromDate: null,
    toDate: null,
  });
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue(editingCategory);
    } else {
      form.resetFields();
    }
  }, [editingCategory, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    showModal();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa nhóm tin tức "${record.name}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        setCategories(
          categories.filter((category) => category.id !== record.id)
        );
        message.success("Nhóm tin tức đã được xóa thành công.");
      },
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        // Cập nhật nhóm tin tức
        setCategories(
          categories.map((category) =>
            category.id === editingCategory.id
              ? { ...category, ...values }
              : category
          )
        );
        message.success("Nhóm tin tức đã được cập nhật thành công.");
      } else {
        // Thêm nhóm tin tức mới
        const newCategory = {
          id: categories.length + 1,
          ...values,
          createdAt: new Date().toLocaleDateString(), // Lấy ngày hiện tại
        };
        setCategories([...categories, newCategory]);
        message.success("Nhóm tin tức đã được thêm thành công.");
      }
      setIsModalVisible(false);
      setEditingCategory(null);
    } catch (errorInfo) {
      console.log("Validate Failed:", errorInfo);
    }
  };
  const handleSearch = () => {
    const { name, status, fromDate, toDate } = searchFilters;
    const filtered = categories.filter((category) => {
      const nameMatch = category.name
        .toLowerCase()
        .includes(name.toLowerCase());
      const statusMatch = !status || category.status === status;
      const fromDateMatch =
        !fromDate || moment(category.createdAt).isSameOrAfter(fromDate, "day");
      const toDateMatch =
        !toDate || moment(category.createdAt).isSameOrBefore(toDate, "day");
      return nameMatch && statusMatch && fromDateMatch && toDateMatch;
    });
    setFilteredCategories(filtered);
  };

  const handleSearchInputChange = (field, value) => {
    setSearchFilters({ ...searchFilters, [field]: value });
  };

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tên nhóm tin tức", dataIndex: "name", key: "name" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Hoạt động", value: "active" },
        { text: "Không hoạt động", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
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
        Thêm nhóm tin tức
      </Button>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Tên nhóm tin tức"
            value={searchFilters.name}
            onChange={(e) => handleSearchInputChange("name", e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Trạng thái"
            options={[
              { value: "active", label: "Hoạt động" },
              { value: "inactive", label: "Không hoạt động" },
            ]}
            value={searchFilters.status}
            onChange={(value) => handleSearchInputChange("status", value)}
          />
        </Col>
        <Col span={5}>
          <DatePicker
            placeholder="Từ ngày"
            value={searchFilters.fromDate}
            onChange={(date) => handleSearchInputChange("fromDate", date)}
          />
        </Col>
        <Col span={5}>
          <DatePicker
            placeholder="Đến ngày"
            value={searchFilters.toDate}
            onChange={(date) => handleSearchInputChange("toDate", date)}
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
      <Table columns={columns} dataSource={filteredCategories} />

      <Modal
        title={
          editingCategory ? "Chỉnh sửa nhóm tin tức" : "Thêm nhóm tin tức mới"
        }
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên nhóm tin tức"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhóm tin tức" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewsCategoryManagementPage;
