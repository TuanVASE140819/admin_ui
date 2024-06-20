import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  Space,
  Tag,
  Popconfirm,
  message,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const EventManagementPage = ({ schools }) => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const [eventTypes, setEventTypes] = useState([
    { value: "online", label: "Trực tuyến" },
    { value: "offline", label: "Trực tiếp" },
  ]);
  const [events, setEvents] = useState(
    schoolId ? schools.find((school) => school.id === schoolId).events : []
  );
  const [filteredEvents, setFilteredEvents] = useState(events);

  const [selectedEventType, setSelectedEventType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();
  const [searchKeyword, setSearchKeyword] = useState("");

  const eventData = [
    {
      id: 1,
      name: "Ngày hội văn hóa",
      description: "Sự kiện giao lưu văn hóa giữa các trường trong thành phố.",
      startTime: moment("2023-07-01 08:00:00"),
      endTime: moment("2023-07-01 17:00:00"),
      bannerUrl: "https://example.com/banner1.jpg",
      avatarUrl: "https://example.com/avatar1.jpg",
      status: "upcoming",
      type: "offline",
    },
    {
      id: 2,
      name: "Hội thảo trực tuyến về giáo dục STEM",
      description: "Hội thảo trực tuyến về giáo dục STEM cho học sinh.",
      startTime: moment("2023-08-15 10:00:00"),
      endTime: moment("2023-08-15 12:00:00"),
      bannerUrl: "https://example.com/banner2.jpg",
      avatarUrl: "https://example.com/avatar2.jpg",
      status: "upcoming",
      type: "online",
    },
    {
      id: 3,
      name: "Ngày hội thể thao",
      description: "Sự kiện thể thao dành cho học sinh toàn trường.",
      startTime: moment("2023-09-20 09:00:00"),
      endTime: moment("2023-09-20 16:00:00"),
      bannerUrl: "https://example.com/banner3.jpg",
      avatarUrl: "https://example.com/avatar3.jpg",
      status: "finished",
      type: "offline",
    },
    {
      id: 4,
      name: "Cuộc thi sáng tạo khoa học",
      description: "Cuộc thi sáng tạo khoa học dành cho học sinh khối 10-12.",
      startTime: moment("2023-10-10 08:30:00"),
      endTime: moment("2023-10-10 16:30:00"),
      bannerUrl: "https://example.com/banner4.jpg",
      avatarUrl: "https://example.com/avatar4.jpg",
      status: "upcoming",
      type: "offline",
    },
  ];

  useEffect(() => {
    setEvents(eventData);
    setFilteredEvents(eventData);
  }, []);

  useEffect(() => {
    if (editingEvent) {
      form.setFieldsValue({
        ...editingEvent,
        startTime: moment(editingEvent.startTime),
        endTime: moment(editingEvent.endTime),
      });
    } else {
      form.resetFields();
    }
  }, [editingEvent, form]);

  const showModal = (type = null, record = null) => {
    setSelectedEventType(type);
    setEditingEvent(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEvent(null);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa sự kiện "${record.name}" không?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        setEvents(events.filter((event) => event.id !== record.id));
        setFilteredEvents(
          filteredEvents.filter((event) => event.id !== record.id)
        );
        message.success("Sự kiện đã được xóa thành công.");
      },
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (moment(values.endTime).isBefore(values.startTime)) {
        throw new Error("Thời gian kết thúc phải sau thời gian bắt đầu");
      }

      if (editingEvent) {
        // Cập nhật sự kiện
        setEvents(
          events.map((event) =>
            event.id === editingEvent.id ? { ...event, ...values } : event
          )
        );
        setFilteredEvents(
          filteredEvents.map((event) =>
            event.id === editingEvent.id ? { ...event, ...values } : event
          )
        );
        message.success("Sự kiện đã được cập nhật thành công.");
      } else {
        // Thêm sự kiện mới
        const newEvent = {
          id: events.length + 1,
          ...values,
          status: "upcoming",
        };
        setEvents([...events, newEvent]);
        setFilteredEvents([...filteredEvents, newEvent]);
        message.success("Sự kiện đã được thêm thành công.");
      }
      setIsModalVisible(false);
      setEditingEvent(null);
    } catch (errorInfo) {
      if (errorInfo.errorFields) {
        message.error(errorInfo.errorFields[0].errors[0]);
      } else {
        console.log("Validate Failed:", errorInfo);
      }
    }
  };

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tên sự kiện", dataIndex: "name", key: "name" },
    {
      title: "Loại sự kiện",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "online" ? "blue" : "green"}>
          {type === "online" ? "Trực tuyến" : "Trực tiếp"}
        </Tag>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime, record) => (
        <>
          {startTime.format("DD/MM/YYYY HH:mm")} -{" "}
          {record.endTime.format("DD/MM/YYYY HH:mm")}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "upcoming" ? "blue" : "green"}>
          {status === "upcoming" ? "Sắp diễn ra" : "Đã diễn ra"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() =>
              navigate(`/school/${schoolId}/event/${record.id}/stats`)
            }
          >
            Thống kê
          </Button>
          <Button
            type="link"
            // onClick={() => handleEdit(record)} // Đã sửa lại tại đây
          >
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

  const handleSearch = (value) => {
    setSearchKeyword(value);
    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(value.toLowerCase()) ||
        event.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <div>
      <Button.Group>
        <Button type="primary" onClick={() => showModal()}>
          Thêm sự kiện
        </Button>
        <Select
          style={{ width: 200 }}
          placeholder="Chọn loại sự kiện"
          options={eventTypes}
          value={selectedEventType}
          onChange={(value) => showModal(value)}
        />
        <Input.Search
          placeholder="Tìm kiếm sự kiện"
          allowClear
          onSearch={handleSearch}
          style={{ width: 200, marginLeft: 10 }}
        />
      </Button.Group>

      <Table columns={columns} dataSource={filteredEvents} />

      <Modal
        title={editingEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sự kiện"
            rules={[{ required: true, message: "Vui lòng nhập tên sự kiện" }]}
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
            name="type"
            label="Loại sự kiện"
            initialValue={selectedEventType}
            rules={[{ required: true, message: "Vui lòng chọn loại sự kiện" }]}
          >
            <Select disabled={!!editingEvent} options={eventTypes} />
          </Form.Item>
          <Form.Item name="startTime" label="Thời gian bắt đầu">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="Thời gian kết thúc"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian kết thúc" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("startTime") < value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Thời gian kết thúc phải sau thời gian bắt đầu")
                  );
                },
              }),
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="bannerUrl"
            label="Ảnh bìa"
            rules={[{ required: true, message: "Vui lòng chọn ảnh bìa" }]}
          >
            <Upload>
              <Button>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="avatarUrl"
            label="Ảnh đại diện"
            rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện" }]}
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

export default EventManagementPage;
