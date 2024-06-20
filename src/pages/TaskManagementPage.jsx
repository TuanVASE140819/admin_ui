import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  Popconfirm,
  message,
  Select,
  Tag, // Import Tag
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const TaskManagementPage = () => {
  //Dữ liệu mẫu
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Nhiệm vụ 1",
      description: "Mô tả nhiệm vụ 1...",
      assignee: "Nguyễn Văn A",
      dueDate: moment("2023-07-10"),
      status: "pending",
    },
    // ... thêm các nhiệm vụ khác
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue(editingTask);
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  const handleEdit = (record) => {
    setEditingTask(record);
    showModal();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa nhiệm vụ "${record.title}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        setTasks(tasks.filter((task) => task.id !== record.id));
        message.success("Nhiệm vụ đã được xóa thành công.");
      },
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        // Cập nhật nhiệm vụ
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id ? { ...task, ...values } : task
          )
        );
        message.success("Nhiệm vụ đã được cập nhật thành công.");
      } else {
        // Thêm nhiệm vụ mới
        const newTask = {
          id: tasks.length + 1,
          ...values,
        };
        setTasks([...tasks, newTask]);
        message.success("Nhiệm vụ đã được thêm thành công.");
      }
      setIsModalVisible(false);
      setEditingTask(null);
    } catch (errorInfo) {
      console.log("Validate Failed:", errorInfo);
    }
  };

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Người thực hiện", dataIndex: "assignee", key: "assignee" },
    {
      title: "Hạn chót",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => dueDate.format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "blue" : "green"}>
          {status === "pending" ? "Đang chờ" : "Hoàn thành"}
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
        Thêm nhiệm vụ
      </Button>
      <Table columns={columns} dataSource={tasks} />

      <Modal
        title={editingTask ? "Chỉnh sửa nhiệm vụ" : "Thêm nhiệm vụ mới"}
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
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="assignee"
            label="Người thực hiện"
            rules={[
              { required: true, message: "Vui lòng nhập người thực hiện" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Hạn chót"
            rules={[{ required: true, message: "Vui lòng chọn hạn chót" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Select
              options={[
                { value: "pending", label: "Đang chờ" },
                { value: "completed", label: "Hoàn thành" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManagementPage;
