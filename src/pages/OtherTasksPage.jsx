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
  Tag,
  InputNumber,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
// import { taskData } from "./data";

const OtherTasksPage = () => {
  const [tasks, setTasks] = useState([]); // State để lưu trữ danh sách nhiệm vụ
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();
  const taskData = [
    {
      id: 1,
      title: "Nhiệm vụ 1",
      category: "Thể thao",
      description: "Mô tả nhiệm vụ 1...",
      dueDate: "2023-07-10",
      points: 100,
      //   status: "pending",
      type: "other",
    },
    {
      id: 2,
      title: "Nhiệm vụ 2",
      category: "Thể thao",
      description: "Mô tả nhiệm vụ 2...",
      dueDate: "2023-07-11",
      points: 200,
      //   status: "inprogress",
      type: "other",
    },
    {
      id: 3,
      title: "Nhiệm vụ 3",
      category: "Thể thao",
      description: "Mô tả nhiệm vụ 3...",
      dueDate: "2023-07-12",
      points: 300,
      //   status: "completed",
      type: "other",
    },
  ];
  useEffect(() => {
    // Lọc ra các nhiệm vụ khác (không phải nhiệm vụ ngày)
    const otherTasks = taskData.filter((task) => task.type !== "daily");
    setTasks(otherTasks);
  }, []);

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
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          status: "pending", // Mặc định trạng thái là "pending"
          type: "other", // Loại nhiệm vụ khác
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
    {
      title: "Loại nhiệm vụ",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return type === "daily" ? "Nhiệm vụ ngày" : "Nhiệm vụ khác";
      },
    },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Ngày hết hạn",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => dueDate, // Hiển thị ngày tháng dưới dạng chuỗi
    },
    {
      title: "Số xu",
      dataIndex: "points",
      key: "points",
    },

    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   filters: [
    //     { text: "Chưa hoàn thành", value: "pending" },
    //     { text: "Đang thực hiện", value: "inprogress" },
    //     { text: "Hoàn thành", value: "completed" },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    //   render: (status) => {
    //     let color = "";
    //     if (status === "pending") {
    //       color = "blue";
    //     } else if (status === "inprogress") {
    //       color = "orange";
    //     } else if (status === "completed") {
    //       color = "green";
    //     }
    //     return (
    //       <Tag color={color}>
    //         {status === "pending"
    //           ? "Chưa hoàn thành"
    //           : status === "inprogress"
    //           ? "Đang thực hiện"
    //           : "Hoàn thành"}
    //       </Tag>
    //     );
    //   },
    // },
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
          {/* Các trường input giống như trong DailyTasksPage, nhưng không có phần disabled */}
          {/* chọn loai nhiệm vụ */}
          <Form.Item
            name="type"
            label="Loại nhiệm vụ"
            rules={[{ required: true, message: "Vui lòng chọn loại nhiệm vụ" }]}
          >
            <Select>
              <Select.Option value="daily">Nhiệm vụ ngày</Select.Option>
              <Select.Option value="other">Nhiệm vụ khác</Select.Option>
            </Select>
          </Form.Item>
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
            name="points"
            label="Số xu"
            rules={[{ required: true, message: "Vui lòng nhập số xu" }]}
          >
            <InputNumber min={0} disabled={editingTask === null} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OtherTasksPage;
