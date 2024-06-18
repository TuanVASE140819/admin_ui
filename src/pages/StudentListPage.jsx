import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { List, Button, Avatar, Card, Popconfirm } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons"; // Import icons
import Meta from "antd/es/card/Meta";

const StudentListPage = ({ schools }) => {
  const { schoolId } = useParams();
  const school = {
    id: 1,
    name: "Trường A",
    students: [
      {
        name: "Nguyễn Văn A",
        address: "Quận 1, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Trần Thị B",
        address: "Quận 2, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=female",
      },
      {
        name: "Phạm Văn C",
        address: "Quận 3, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Lê Thị D",
        address: "Quận 4, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Nguyễn Thị E",
        address: "Quận 5, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Trần Văn F",
        address: "Quận 6, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Trần Văn F",
        address: "Quận 6, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Trần Văn F",
        address: "Quận 6, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Trần Văn F",
        address: "Quận 6, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
      {
        name: "Trần Văn F",
        address: "Quận 6, TP.HCM",
        avatarUrl: "https://xsgames.co/randomusers/avatar.php?g=male",
      },
    ],
  };
  const handleDeleteStudent = (studentIndex) => {
    const updatedStudents = school.students.filter(
      (_, index) => index !== studentIndex
    );
  };

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        dataSource={school.students}
        renderItem={(student, index) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => handleDeleteStudent(index)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <DeleteOutlined />
                </Popconfirm>,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src={student.avatarUrl} icon={<UserOutlined />} />
                }
                title={student.name}
                description={student.address}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default StudentListPage;
