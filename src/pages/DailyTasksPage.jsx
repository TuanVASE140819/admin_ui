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

const DailyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  const taskData = [
    {
      id: 1,
      title: "Ngày 1",
      //   description: "Ôn tập các môn học trong ngày",
      dueDate: "2024-06-20",
      //   status: "pending",
      points: 100,
      type: "daily",
    },
    {
      id: 2,
      title: "Ngày 2",
      //   description: "Ôn tập các môn học trong ngày",
      dueDate: "2024-06-20",
      //   status: "pending",
      points: 100,
      type: "daily",
    },
    {
      id: 3,
      title: "Ngày 3",
      //   description: "Ôn tập các môn học trong ngày",
      dueDate: "2024-06-20",
      //   status: "pending",
      points: 100,
      type: "daily",
    },
    {
      id: 4,
      title: "Ngày 4",
      //   description: "Ôn tập các môn học trong ngày",
      dueDate: "2024-06-20",
      //   status: "pending",
      points: 100,
      type: "daily",
    },
    {
      id: 5,
      title: "Ngày 5",
      //   description: "Ôn tập các môn học trong ngày",
      dueDate: "2024-06-20",
      //   status: "pending",
      points: 100,
      type: "daily",
    },
    {
      id: 6,
      title: "Ngày 6",
      //   description: "Ôn tập các môn học trong ngày",
      dueDate: "2024-06-20",
      //   status: "pending",
      points: 100,
      type: "daily",
    },
    {
      id: 7,
      title: "Ngày 7",
      //   description: "Ôn tập các môn học trong ngày",
      dueDate: "2024-06-20",
      //   status: "pending",
      points: 100,
      type: "daily",
    },
  ];
  useEffect(() => {
    // Lọc ra các nhiệm vụ ngày từ ngày 1 đến ngày 7 trong tháng hiện tại
    const currentMonth = moment().month();
    const dailyTasks = taskData.filter(
      (task) =>
        task.type === "daily" &&
        moment(task.dueDate).month() === currentMonth &&
        moment(task.dueDate).date() >= 1 &&
        moment(task.dueDate).date() <= 7
    );
    setTasks(taskData);
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
        // Chỉ cập nhật số xu nếu đang chỉnh sửa
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id
              ? { ...task, points: values.points }
              : task
          )
        );
        message.success("Số xu đã được cập nhật thành công.");
      } else {
        // Thêm nhiệm vụ mới
        const newTask = {
          id: tasks.length + 1,
          ...values,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          status: "pending", // Mặc định trạng thái là "pending"
          type: "daily",
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
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            disabled={editingTask !== null}
          >
            <Input />
          </Form.Item>

          {/* Ngày hết hạn (disabled) */}
          <Form.Item name="dueDate" label="Ngày hết hạn" disabled>
            <DatePicker />
          </Form.Item>

          {/* Chỉ cho phép chỉnh sửa số xu nếu đang chỉnh sửa */}
          <Form.Item
            name="points"
            label="Số xu"
            rules={[{ required: true, message: "Vui lòng nhập số xu" }]}
          >
            <InputNumber min={0} disabled={editingTask === null} />
          </Form.Item>
          {/* Trạng thái (disabled) */}
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            disabled={editingTask !== null}
          >
            <Select
              options={[
                { value: "pending", label: "Chưa hoàn thành" },
                { value: "inprogress", label: "Đang thực hiện" },
                { value: "completed", label: "Hoàn thành" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DailyTasksPage;
