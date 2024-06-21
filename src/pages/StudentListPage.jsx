import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Table,
  Button,
  Popconfirm,
  Avatar,
  Tag,
  Space,
  message,
  Input,
  Descriptions,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  UserOutlined,
  CloseOutlined,
  CheckOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const StudentListPage = ({ schools }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const school = {
    id: 1,
    name: "Trường A",
    students: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        address: "Quận 1, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
        requestStatus: "pending",
        requests: [
          {
            schoolId: 1,
            groupId: 2,
            message: "Tôi muốn tham gia nhóm này",
            status: "pending",
          },
        ],
      },
      {
        id: 2,
        name: "Trần Thị B",
        address: "Quận 2, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar",
        requestStatus: "approved",
        requests: [
          {
            schoolId: 1,
            groupId: 2,
            message: "Tôi muốn tham gia nhóm này",
            status: "approved",
          },
        ],
      },
    ],
  };
  const [searchText, setSearchText] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Hàm xử lý sự kiện khi giá trị tìm kiếm thay đổi
  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // Lọc dữ liệu sinh viên dựa trên từ khóa tìm kiếm
  const filteredStudents = school.students.filter((student) => {
    return student.name.toLowerCase().includes(searchText);
  });

  // ... (các state và hàm khác)

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };
  const handleApprove = (studentId) => {
    const updatedStudents = school.students.map((student) =>
      student.id === studentId
        ? { ...student, requestStatus: "approved" }
        : student
    );
    message.success("Yêu cầu đã được duyệt.");
    // setSchool({ ...school, students: updatedStudents });
  };

  const handleReject = (studentId) => {
    const updatedStudents = school.students.map((student) =>
      student.id === studentId
        ? { ...student, requestStatus: "rejected" }
        : student
    );
    message.success("Yêu cầu đã bị từ chối.");
    // setSchool({ ...school, students: updatedStudents });
  };

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => (
        <Avatar src={record.avatarUrl} icon={<UserOutlined />} />
      ),
    },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Yêu cầu",
      key: "requests",
      render: (_, record) => (
        <Space size="middle">
          {record.requests.map((request) => (
            <Button
              key={request.id}
              type="link"
              icon={<EyeOutlined />}
              onClick={() => handleViewRequest(request)}
            >
              Xem
            </Button>
          ))}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "requestStatus",
      key: "requestStatus",
      filters: [
        { text: "Đang chờ", value: "pending" },
        { text: "Đã duyệt", value: "approved" },
        { text: "Từ chối", value: "rejected" },
      ],
      onFilter: (value, record) => record.requestStatus === value,
      render: (requestStatus) => (
        <Tag color={requestStatus === "approved" ? "green" : "red"}>
          {requestStatus === "pending"
            ? "Đang chờ"
            : requestStatus === "approved"
            ? "Đã duyệt"
            : "Từ chối"}
        </Tag>
      ),
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        if (record.requestStatus === "pending") {
          return (
            <Space size="middle">
              <Button type="link" onClick={() => handleApprove(record.id)}>
                <CheckOutlined /> Duyệt
              </Button>
              <Button
                type="link"
                danger
                onClick={() => handleReject(record.id)}
              >
                <CloseOutlined /> Từ chối
              </Button>
            </Space>
          );
        } else {
          return (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              // onConfirm={() => handleDeleteStudent(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="link" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          );
        }
      },
    },
  ];

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      <Input
        placeholder="Tìm kiếm theo tên"
        prefix={<SearchOutlined />}
        onChange={handleSearchChange}
        style={{ marginBottom: 16, width: 300 }} // Điều chỉnh style theo ý muốn
      />
      <Table columns={columns} dataSource={filteredStudents} />
      <Modal
        title="Chi tiết yêu cầu"
        open={!!selectedRequest} // Hiển thị modal khi có yêu cầu được chọn
        onCancel={handleCloseModal}
        footer={null} // Không hiển thị footer mặc định của Modal
      >
        <Descriptions title="Thông tin yêu cầu" bordered column={1}>
          <Descriptions.Item label="Trường học">
            {selectedRequest?.schoolId}
          </Descriptions.Item>
          <Descriptions.Item label="Nhóm">
            {selectedRequest?.groupId}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            {selectedRequest?.message}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag
              color={selectedRequest?.status === "approved" ? "green" : "red"}
            >
              {selectedRequest?.status === "approved" ? "Đã duyệt" : "Đang chờ"}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default StudentListPage;
