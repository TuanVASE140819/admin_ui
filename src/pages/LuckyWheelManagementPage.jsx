import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Space,
  Popconfirm,
  message,
  Image,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const LuckyWheelManagementPage = () => {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      type: "Voucher",
      name: "Giảm giá 20%",
      probability: 0.2, // Tỷ lệ trúng 20%
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      type: "Sản phẩm",
      name: "Tai nghe Bluetooth",
      probability: 0.1, // Tỷ lệ trúng 10%
    },
    // Thêm các phần thưởng khác tại đây
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingReward) {
      form.setFieldsValue({
        ...editingReward,
        probability: (editingReward.probability * 100).toFixed(0),
      });
    } else {
      form.resetFields();
    }
  }, [editingReward, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingReward(null);
  };

  const handleEdit = (record) => {
    setEditingReward(record);
    showModal();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa phần thưởng "${record.name}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        setRewards(rewards.filter((reward) => reward.id !== record.id));
        message.success("Phần thưởng đã được xóa thành công.");
      },
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      values.probability = values.probability / 100; // Chuyển đổi tỷ lệ trúng về dạng thập phân
      if (editingReward) {
        // Cập nhật phần thưởng
        setRewards(
          rewards.map((reward) =>
            reward.id === editingReward.id ? { ...reward, ...values } : reward
          )
        );
        message.success("Phần thưởng đã được cập nhật thành công.");
      } else {
        // Thêm phần thưởng mới
        const newReward = {
          id: rewards.length + 1,
          ...values,
        };
        setRewards([...rewards, newReward]);
        message.success("Phần thưởng đã được thêm thành công.");
      }
      setIsModalVisible(false);
      setEditingReward(null);
    } catch (errorInfo) {
      console.log("Validate Failed:", errorInfo);
    }
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
            icon={<PlusOutlined />}
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
      <PlusOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        // Handle focus on the input
      }
    },
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
    { title: "STT", dataIndex: "id", key: "id" },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={50} />,
    },
    {
      title: "Loại quà",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Phần thưởng",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Tỷ lệ trúng (%)",
      dataIndex: "probability",
      key: "probability",
      render: (probability) => (probability * 100).toFixed(0),
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
        Thêm phần thưởng
      </Button>
      <Table columns={columns} dataSource={rewards} rowKey="id" />

      <Modal
        title={editingReward ? "Chỉnh sửa phần thưởng" : "Thêm phần thưởng mới"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                form.setFieldsValue({ image: URL.createObjectURL(file) });
                return false;
              }}
            >
              {form.getFieldValue("image") ? (
                <img
                  src={form.getFieldValue("image")}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại quà"
            rules={[{ required: true, message: "Vui lòng nhập loại quà" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên phần thưởng"
            rules={[
              { required: true, message: "Vui lòng nhập tên phần thưởng" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="probability"
            label="Tỷ lệ trúng (%)"
            rules={[
              { required: true, message: "Vui lòng nhập tỷ lệ trúng" },
              {
                validator: (_, value) => {
                  if (value >= 0 && value <= 100) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Tỷ lệ trúng phải từ 0 đến 100")
                  );
                },
              },
            ]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LuckyWheelManagementPage;
