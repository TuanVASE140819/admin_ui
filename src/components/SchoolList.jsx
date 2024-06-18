import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Select,
  Row,
  Col,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SchoolList = ({ onSchoolSelect }) => {
  // Danh sách trường học (dữ liệu mẫu)
  const [schools, setSchools] = useState([
    {
      id: 1,
      name: "Trường Tiểu học Chu Văn An",
      province: "Hà Nội",
      district: "Tây Hồ",
      level: "Tiểu học",
      students: [],
      bannerUrl: "https://example.com/banner1.jpg",
      avatarUrl: "https://example.com/avatar1.jpg",
      votes: 120,
      description: "Trường tiểu học công lập chất lượng cao tại Hà Nội.",
    },
    {
      id: 2,
      name: "Trường THCS Nguyễn Du",
      province: "Hồ Chí Minh",
      district: "Quận 1",
      level: "THCS",
      students: [],
      bannerUrl: "https://example.com/banner2.jpg",
      avatarUrl: "https://example.com/avatar2.jpg",
      votes: 85,
      description: "Trường trung học cơ sở nổi tiếng tại trung tâm thành phố.",
    },
    {
      id: 3,
      name: "Trường THPT Chuyên Lê Hồng Phong",
      province: "Hồ Chí Minh",
      district: "Quận 5",
      level: "THPT",
      students: [],
      bannerUrl: "https://example.com/banner3.jpg",
      avatarUrl: "https://example.com/avatar3.jpg",
      votes: 200,
      description: "Trường chuyên nổi tiếng với chất lượng đào tạo hàng đầu.",
    },
    // Thêm các trường khác
  ]);

  // Danh sách tỉnh thành (mẫu)
  const provinces = [
    { value: "HN", label: "Hà Nội" },
    { value: "HCM", label: "Hồ Chí Minh" },
    { value: "ĐN", label: "Đà Nẵng" },
    // ... thêm các tỉnh khác
  ];

  // Danh sách quận huyện (mẫu)
  const districts = {
    HN: [
      { value: "TH", label: "Tây Hồ" },
      { value: "CG", label: "Cầu Giấy" },
      { value: "HK", label: "Hoàn Kiếm" },
      // ... thêm các quận huyện của Hà Nội
    ],
    HCM: [
      { value: "Q1", label: "Quận 1" },
      { value: "Q2", label: "Quận 2" },
      { value: "Q3", label: "Quận 3" },
      // ... thêm các quận huyện của Hồ Chí Minh
    ],
    ĐN: [
      { value: "HHC", label: "Hải Châu" },
      { value: "SC", label: "Sơn Trà" },
      // ... thêm các quận huyện của Đà Nẵng
    ],
    // ... thêm các quận huyện của các tỉnh khác
  };

  // Các state
  const [isAddSchoolModalVisible, setIsAddSchoolModalVisible] = useState(false);
  const [addSchoolForm] = Form.useForm();
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    province: null,
    district: null,
    level: null,
  });
  const [filteredSchools, setFilteredSchools] = useState(schools);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Hàm xử lý khi thay đổi tỉnh thành
  const handleProvinceChange = (value) => {
    setSearchFilters({ ...searchFilters, province: value, district: null });
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    const filtered = schools.filter((school) => {
      const matchesName = school.name
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase());
      const matchesProvince =
        !searchFilters.province || school.province === searchFilters.province;
      const matchesDistrict =
        !searchFilters.district || school.district === searchFilters.district;
      const matchesLevel =
        !searchFilters.level || school.level === searchFilters.level;
      return matchesName && matchesProvince && matchesDistrict && matchesLevel;
    });
    setFilteredSchools(filtered);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (field, value) => {
    setSearchFilters({ ...searchFilters, [field]: value });
  };
  // Hàm xử lý thêm trường mới
  const handleAddSchool = () => {
    addSchoolForm
      .validateFields()
      .then((values) => {
        const newSchool = {
          id: schools.length + 1, // Tạm thời gán ID mới
          ...values,
          students: [],
          votes: 0,
        };
        setSchools([...schools, newSchool]);
        setIsAddSchoolModalVisible(false);
        addSchoolForm.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Hàm xử lý khi thay đổi trang hoặc kích thước trang
  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // Cột của bảng
  const columns = [
    { title: "Số thứ tự", dataIndex: "id", key: "id" },
    { title: "Tên trường", dataIndex: "name", key: "name" },
    { title: "Tỉnh", dataIndex: "province", key: "province" },
    { title: "Quận/Huyện", dataIndex: "district", key: "district" },
    { title: "Cấp trường", dataIndex: "level", key: "level" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/school/${record.id}`)}>
          Xem thông tin
        </Button>
      ),
    },
  ];

  // Cấu hình phân trang
  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredSchools.length,
    showSizeChanger: true,
    showQuickJumper: true,
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsAddSchoolModalVisible(true)}>
        Thêm trường
      </Button>
      <Row gutter={[16, 16]}>
        {/* Các ô input tìm kiếm */}
        <Col span={8}>
          <Input
            placeholder="Tên trường"
            value={searchFilters.name}
            onChange={(e) => handleSearchInputChange("name", e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Tỉnh"
            options={provinces}
            value={searchFilters.province}
            onChange={(value) => handleSearchInputChange("province", value)}
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Quận/Huyện"
            options={
              searchFilters.province ? districts[searchFilters.province] : []
            } // Hiển thị danh sách quận/huyện dựa trên tỉnh đã chọn
            value={searchFilters.district}
            onChange={(value) => handleSearchInputChange("district", value)}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Cấp trường"
            options={[
              { value: "Tiểu học", label: "Tiểu học" },
              { value: "THCS", label: "THCS" },
              { value: "THPT", label: "THPT" },
            ]}
            value={searchFilters.level}
            onChange={(value) => handleSearchInputChange("level", value)}
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

      <Table
        columns={columns}
        dataSource={filteredSchools.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        pagination={pagination}
        onChange={handleTableChange}
      />

      {/* Modal thêm trường mới */}
      <Modal
        title="Thêm trường mới"
        open={isAddSchoolModalVisible}
        onCancel={() => setIsAddSchoolModalVisible(false)}
        onOk={handleAddSchool}
      >
        <Form form={addSchoolForm}>
          <Form.Item
            name="name"
            label="Tên trường"
            rules={[{ required: true, message: "Vui lòng nhập tên trường" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="province"
            label="Tỉnh"
            rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
          >
            <Select options={provinces} onChange={handleProvinceChange} />
          </Form.Item>
          <Form.Item
            name="district"
            label="Quận/Huyện"
            rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
          >
            <Select
            //   options={selectedProvince ? districts[selectedProvince] : []}
            />
          </Form.Item>
          <Form.Item
            name="level"
            label="Cấp trường"
            rules={[{ required: true, message: "Vui lòng chọn cấp trường" }]}
          >
            <Select
              options={[
                { value: "Tiểu học", label: "Tiểu học" },
                { value: "THCS", label: "THCS" },
                { value: "THPT", label: "THPT" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="bannerUrl"
            label="Banner URL"
            rules={[{ required: true, message: "Vui lòng nhập Banner URL" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avatarUrl"
            label="Avatar URL"
            rules={[{ required: true, message: "Vui lòng nhập Avatar URL" }]}
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
        </Form>
      </Modal>
    </div>
  );
};

export default SchoolList;
