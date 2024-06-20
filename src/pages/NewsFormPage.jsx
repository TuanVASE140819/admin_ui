import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Button, message, Select } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import CKEditor from "ckeditor4-react";

import { UploadOutlined } from "@ant-design/icons";

const NewsFormPage = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const location = useLocation();
  const { category } = location.state || {};

  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  const [SchoolData, setSchoolData] = useState();
  const handleEditorChange = (evt) => {
    const newContent = evt.editor.getData();
    form.setFieldsValue({ content: newContent });
  };

  //   const handleSave = async () => {
  //     try {
  //       const values = await form.validateFields();

  //       // Tìm trường học và nhóm tin tức tương ứng
  //       const school = schoolData.find((s) => s.id === parseInt(schoolId));
  //       const categoryIndex = school?.newsCategories?.findIndex(
  //         (c) => c.id === category.id
  //       );

  //       if (school && categoryIndex !== -1) {
  //         // Tạo tin tức mới
  //         const newNews = {
  //           id: school.news.length + 1,
  //           ...values,
  //           createdAt: new Date().toLocaleDateString(),
  //           category: category.name, // Thêm trường category
  //         };

  //         // Cập nhật lại state của school
  //         const updatedSchool = {
  //           ...school,
  //           news: [...school.news, newNews],
  //         };
  //         const updatedSchools = schoolData.map((s) =>
  //           s.id === school.id ? updatedSchool : s
  //         );
  //         setSchoolData(updatedSchools); // Giả sử bạn có hàm setSchoolData để cập nhật state schools trong App.jsx

  //         message.success("Tin tức đã được thêm thành công.");
  //         navigate(`/news-management`); // Chuyển hướng về trang quản lý tin tức
  //       } else {
  //         message.error("Không tìm thấy trường học hoặc nhóm tin tức.");
  //       }
  //     } catch (errorInfo) {
  //       console.log("Validate Failed:", errorInfo);
  //     }
  //   };

  return (
    <div>
      <h2>Tạo tin tức mới</h2>
      <Form
        form={form}
        layout="vertical"
        //   onFinish={handleSave}
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          {/* <CKEditor
            initData="" // Giá trị ban đầu
            onChange={handleEditorChange}
          /> */}
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
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Thay bằng API của bạn
            beforeUpload={(file) => {
              setImageUrl(URL.createObjectURL(file));
              return false; // Ngăn chặn upload tự động
            }}
            onSuccess={(response) => {
              setImageUrl(response.url); // Cập nhật imageUrl từ response của API
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewsFormPage;
