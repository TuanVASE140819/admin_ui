import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  message,
  Select,
  Row,
  Col,
  Image,
  Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import moment from "moment";

const EventFormPage = ({ schools }) => {
  // ... (các state, hàm và dữ liệu khác giữ nguyên)
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState(null); // State lưu URL ảnh bìa
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null); // State lưu URL ảnh đại diện

  const handleBannerChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.status === "done") {
        // Nếu tải lên thành công, đặt URL ảnh vào state
        setBannerPreviewUrl(file.response.url);
      } else if (file.originFileObj) {
        // Nếu chưa tải lên, tạo URL tạm thời để hiển thị preview
        const reader = new FileReader();
        reader.onload = (e) => setBannerPreviewUrl(e.target.result);
        reader.readAsDataURL(file.originFileObj);
      }
    }
  };

  const handleAvatarChange = ({ fileList }) => {
    // Tương tự như handleBannerChange, nhưng cho ảnh đại diện
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.status === "done") {
        setAvatarPreviewUrl(file.response.url);
      } else if (file.originFileObj) {
        const reader = new FileReader();
        reader.onload = (e) => setAvatarPreviewUrl(e.target.result);
        reader.readAsDataURL(file.originFileObj);
      }
    }
  };
  const { schoolId, eventId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [editingEvent, setEditingEvent] = useState(null);

  const eventTypes = [
    { value: "online", label: "Trực tuyến" },
    { value: "offline", label: "Trực tiếp" },
  ];

  const [selectedEventType, setSelectedEventType] = useState(null); // State to store the selected event type

  // Fetch event data when eventId changes
  //   useEffect(() => {
  //     if (eventId) {
  //       // Find the school and event based on their IDs
  //       const school = schools.find((s) => s.id === parseInt(schoolId));
  //       const event = school?.events?.find((e) => e.id === parseInt(eventId));

  //       if (event) {
  //         // Set the editing event and event type
  //         setEditingEvent(event);
  //         setSelectedEventType(event.type);

  //         // Initialize the form with event data
  //         form.setFieldsValue({
  //           ...event,
  //           startTime: moment(event.startTime),
  //           endTime: moment(event.endTime),
  //         });
  //       }
  //     } else {
  //       // Reset form for new event
  //       setEditingEvent(null);
  //       form.resetFields();
  //     }
  //   }, [eventId, schoolId, schools]); // Run this effect only when eventId, schoolId, or schools change

  // Handle form submission
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (moment(values.endTime).isBefore(values.startTime)) {
        throw new Error("Thời gian kết thúc phải sau thời gian bắt đầu");
      }

      // Update or add the event based on editingEvent
      if (editingEvent) {
        const updatedSchools = schools.map((school) => {
          if (school.id === parseInt(schoolId)) {
            return {
              ...school,
              events: school.events.map((event) =>
                event.id === editingEvent.id ? { ...event, ...values } : event
              ),
            };
          }
          return school;
        });
        // setSchools(updatedSchools);
        message.success("Sự kiện đã được cập nhật thành công.");
      } else {
        const newEvent = {
          id:
            Math.max(
              ...schools
                .find((school) => school.id === parseInt(schoolId))
                ?.events.map((event) => event.id)
            ) + 1,
          ...values,
          status: "upcoming",
        };
        const updatedSchools = schools.map((school) => {
          if (school.id === parseInt(schoolId)) {
            return { ...school, events: [...school.events, newEvent] };
          }
          return school;
        });
        // setSchools(updatedSchools);
        message.success("Sự kiện đã được thêm thành công.");
      }

      navigate(`/school/${schoolId}/events`);
    } catch (errorInfo) {
      if (errorInfo.errorFields) {
        message.error(errorInfo.errorFields[0].errors[0]);
      } else {
        console.log("Validate Failed:", errorInfo);
      }
    }
  };

  const [bannerFileList, setBannerFileList] = useState([]); // Khởi tạo state cho bannerFileList
  const [avatarFileList, setAvatarFileList] = useState([]); // Khởi tạo state cho avatarFileList

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Card
      title={editingEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
      style={{ margin: 24 }}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Row gutter={24}>
          <Col span={12}>
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
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="type"
              label="Loại sự kiện"
              initialValue={selectedEventType}
              rules={[
                { required: true, message: "Vui lòng chọn loại sự kiện" },
              ]}
            >
              <Select disabled={!!editingEvent} options={eventTypes} />
            </Form.Item>
            <Form.Item
              name="startTime"
              label="Thời gian bắt đầu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian bắt đầu",
                },
              ]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="Thời gian kết thúc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian kết thúc",
                },
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
          </Col>
          <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
            <Form.Item name="bannerUrl" label="Ảnh bìa">
              <ImgCrop rotate>
                <Upload
                  className="bannerUpload"
                  onChange={handleBannerChange}
                  listType="picture-card"
                  showUploadList={{
                    showRemoveIcon: true,
                    showPreviewIcon: false,
                    showDownloadIcon: false,
                  }}
                  maxCount={1}
                  style={{
                    width: "100%", // Chiều rộng 100% của container cha
                  }}
                >
                  {bannerFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.Item name="avatarUrl" label="Ảnh đại diện">
              <ImgCrop rotate>
                <Upload
                  onChange={handleAvatarChange}
                  listType="picture-card"
                  showUploadList={{
                    showRemoveIcon: true,
                    showPreviewIcon: false,
                    showDownloadIcon: false,
                  }}
                  maxCount={1}
                >
                  {avatarFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item style={{ marginTop: "auto" }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default EventFormPage;
