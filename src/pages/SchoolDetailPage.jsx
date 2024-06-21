import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Image,
  Avatar,
  Descriptions,
  List,
  Button,
  Collapse,
  Tag,
  Card,
  message,
  Form,
  Input,
  Modal,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons"; // Import icon Upload

const { Panel } = Collapse;
const { Meta } = Card;

const SchoolDetailPage = ({ schools }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  // const { schoolId } = useParams();
  // const school = schools.find((school) => school.id === parseInt(schoolId));
  // const [showStudents, setShowStudents] = useState(false);

  // if (!school) {
  //   return <div>Không tìm thấy trường học</div>;
  // }
  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] =
    useState(false);
  const [createGroupForm] = Form.useForm();

  const showCreateGroupModal = () => {
    setIsCreateGroupModalVisible(true);
  };

  const handleCreateGroupCancel = () => {
    setIsCreateGroupModalVisible(false);
  };

  const [imageUrl, setImageUrl] = useState("");

  const handleCreateGroup = async () => {
    try {
      const values = await createGroupForm.validateFields();
      values.bannerUrl = imageUrl;
      // TODO: Xử lý logic tạo nhóm ở đây (ví dụ: gửi dữ liệu lên API)
      message.success("Tạo nhóm thành công!");
      setIsCreateGroupModalVisible(false);
      createGroupForm.resetFields();
    } catch (errorInfo) {
      console.log("Validate Failed:", errorInfo);
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      // Đang tải lên
      return;
    }
    if (info.file.status === "done") {
      // Tải lên thành công
      // Get this url from response in real world.
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <div style={{ padding: "24px" }}>
      {" "}
      {/* Thêm padding cho toàn bộ trang */}
      <Image
        src="https://via.placeholder.com/800x200"
        alt="Banner"
        width="100%"
      />
      <div style={{ marginTop: 16 }}>
        <Avatar
          size={128}
          src="https://via.placeholder.com/128"
          style={{
            display: "block",
            margin: "0 auto 16px",
          }}
        />
        <Descriptions
          title="Thông tin trường"
          bordered
          column={2}
          style={{ marginLeft: 16 }}
        >
          <Descriptions.Item label="Số lượng thành viên">
            <Button type="link" onClick={() => navigate(`/school/1/students`)}>
              555
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="Số lượt vote">
            <Button type="link">Danh sách vote</Button>
          </Descriptions.Item>
          <Descriptions.Item label="Tỉnh">Tỉnh</Descriptions.Item>
          <Descriptions.Item label="Quận/Huyện">Quận/Huyện</Descriptions.Item>
          <Descriptions.Item label="Cấp trường" span={2}>
            <Tag color="blue">
              {/* Hiển thị cấp trường */}
              Cấp 1
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>
            {/* Hiển thị mô tả */}
            Mô tả trường
          </Descriptions.Item>
        </Descriptions>
      </div>
      {/* nút danh sách thành viên */}
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={() => navigate(`/school/1/students`)}
      >
        Danh sách thành viên
      </Button>
      <Button
        type="primary"
        style={{ marginTop: 16, marginLeft: 16 }}
        onClick={() => navigate(`/school/1/postsNew`)}
      >
        Quản lý bài viết
      </Button>
      <Button
        type="primary"
        style={{ marginTop: 16, marginLeft: 16 }}
        onClick={showCreateGroupModal}
      >
        Tạo nhóm
      </Button>
      <Modal
        title="Tạo nhóm mới"
        open={isCreateGroupModalVisible}
        onCancel={handleCreateGroupCancel}
        onOk={handleCreateGroup}
      >
        <Form form={createGroupForm} layout="vertical">
          <Form.Item
            name="name"
            label="Tên nhóm"
            rules={[{ required: true, message: "Vui lòng nhập tên nhóm" }]}
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
          {/* Thêm Upload để chọn ảnh */}
          <Form.Item label="Ảnh nhóm">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Thay bằng API endpoint của bạn
              customRequest={dummyRequest} // Sử dụng dummyRequest để tải ảnh lên
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ marginTop: 16 }}>
        <h2>Danh sách các nhóm đã tạo</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* Ví dụ về nhóm: */}
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            onClick={() => navigate(`/school/1/groups/1`)}
          >
            <Meta title="Nhóm 1" description="Mô tả nhóm 1" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailPage;
