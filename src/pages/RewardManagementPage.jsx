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
  InputNumber,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const RewardManagementPage = () => {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Voucher giảm giá 20%",
      description: "Voucher áp dụng cho tất cả các khóa học",
      pointCost: 500,
      quantity: 100,
    },
    {
      id: 2,
      name: "Bộ sách học tiếng Anh",
      description: "Bộ sách học tiếng Anh cho mọi trình độ",
      pointCost: 1000,
      quantity: 50,
    },
    // Thêm các phần thưởng khác tại đây
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingReward) {
      form.setFieldsValue(editingReward);
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

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tên phần thưởng", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Điểm cần đổi", dataIndex: "pointCost", key: "pointCost" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
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
      <Table columns={columns} dataSource={rewards} />

      <Modal
        title={editingReward ? "Chỉnh sửa phần thưởng" : "Thêm phần thưởng mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
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
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="pointCost"
            label="Điểm cần đổi"
            rules={[{ required: true, message: "Vui lòng nhập điểm cần đổi" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RewardManagementPage;
