import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Image,
  Avatar,
  Descriptions,
  List,
  Button,
  Collapse,
  Tag,
  Card,
} from "antd";

const { Panel } = Collapse;
const { Meta } = Card;

const SchoolDetailPage = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState(null);
  const [showStudents, setShowStudents] = useState(false);

  useEffect(() => {
    // Dữ liệu giả cho trường học
    const schoolData = {
      id: parseInt(schoolId), // Chuyển đổi schoolId thành số nguyên
      name: "Trường Tiểu học Chu Văn An",
      province: "Hà Nội",
      district: "Tây Hồ",
      level: "Tiểu học",
      students: [
        { name: "Nguyễn Văn A", address: "123 Nguyễn Trãi, Hà Nội" },
        { name: "Trần Thị B", address: "456 Lê Văn Lương, Hà Nội" },
        // ... thêm học sinh khác
      ],
      bannerUrl: "https://example.com/banner1.jpg",
      avatarUrl: "https://example.com/avatar1.jpg",
      votes: 120,
      description: "Trường tiểu học công lập chất lượng cao tại Hà Nội.",
      groups: [
        {
          name: "Nhóm Toán học",
          description: "Nhóm học tập môn Toán",
          imageUrl: "https://example.com/group1.jpg",
        },
        {
          name: "Nhóm Tiếng Anh",
          description: "Nhóm học tập môn Tiếng Anh",
          imageUrl: "https://example.com/group2.jpg",
        },
        // ... thêm các nhóm khác
      ],
    };

    setSchool(schoolData); // Cập nhật state school với dữ liệu giả
  }, [schoolId]); // Chỉ chạy useEffect khi schoolId thay đổi

  if (!school) {
    return <div>Đang tải...</div>; // Hiển thị thông báo "Đang tải..." trong khi chờ dữ liệu
  }

  const handleDeleteStudent = (studentIndex) => {
    // Xử lý xóa học sinh (ví dụ: cập nhật state school.students)
    const updatedStudents = school.students.filter(
      (_, index) => index !== studentIndex
    );
    setSchool({ ...school, students: updatedStudents });
  };

  return (
    <>
      <div style={{ padding: "24px" }}>ffff</div>
    </>
    // <div style={{ padding: "24px" }}>
    //   <Image src={school.bannerUrl} alt="Banner" width="100%" />
    //   <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
    //     <Avatar size={128} src={school.avatarUrl} />
    //     <Descriptions
    //       title={school.name}
    //       bordered
    //       column={2}
    //       style={{ marginLeft: 16 }}
    //     >
    //       <Descriptions.Item label="Số lượng thành viên">
    //         <Button type="link" onClick={() => setShowStudents(!showStudents)}>
    //           {school.students.length}
    //         </Button>
    //       </Descriptions.Item>
    //       <Descriptions.Item label="Số lượt vote">
    //         {school.votes}
    //       </Descriptions.Item>
    //       <Descriptions.Item label="Tỉnh">{school.province}</Descriptions.Item>
    //       <Descriptions.Item label="Quận/Huyện">
    //         {school.district}
    //       </Descriptions.Item>
    //       <Descriptions.Item label="Cấp trường" span={2}>
    //         <Tag color="blue">{school.level}</Tag>
    //       </Descriptions.Item>
    //       <Descriptions.Item label="Mô tả" span={2}>
    //         {school.description}
    //       </Descriptions.Item>
    //     </Descriptions>
    //   </div>

    //   <Collapse
    //     ghost
    //     style={{ marginTop: 16 }}
    //     activeKey={showStudents ? ["1"] : []}
    //   >
    //     <Panel header="Danh sách sinh viên" key="1">
    //       <List
    //         dataSource={school.students}
    //         renderItem={(student, index) => (
    //           <List.Item>
    //             {index + 1}. {student.name} - {student.address}
    //             <Button
    //               type="link"
    //               danger
    //               onClick={() => handleDeleteStudent(index)}
    //             >
    //               Xóa
    //             </Button>
    //           </List.Item>
    //         )}
    //       />
    //     </Panel>
    //   </Collapse>

    //   <div style={{ marginTop: 16 }}>
    //     <h2>Danh sách các nhóm đã tạo</h2>
    //     <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
    //       {school.groups.map((group, index) => (
    //         <Card
    //           key={index}
    //           hoverable
    //           style={{ width: 240 }}
    //           cover={<img alt={group.name} src={group.imageUrl} />}
    //         >
    //           <Meta title={group.name} description={group.description} />
    //         </Card>
    //       ))}
    //     </div>
    //   </div>

    //   <Button type="primary" style={{ marginTop: 16 }}>
    //     Quản lý bài viết
    //   </Button>
    // </div>
  );
};

export default SchoolDetailPage;
