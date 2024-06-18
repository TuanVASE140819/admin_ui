import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const SchoolDetailPage = ({ schools }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  // const { schoolId } = useParams();
  // const school = schools.find((school) => school.id === parseInt(schoolId));
  // const [showStudents, setShowStudents] = useState(false);

  // if (!school) {
  //   return <div>Không tìm thấy trường học</div>;
  // }

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
          >
            <Meta title="Nhóm 1" description="Mô tả nhóm 1" />
          </Card>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Nhóm 2" description="Mô tả nhóm 2" />
          </Card>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Nhóm 2" description="Mô tả nhóm 2" />
          </Card>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Nhóm 2" description="Mô tả nhóm 2" />
          </Card>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Nhóm 2" description="Mô tả nhóm 2" />
          </Card>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Nhóm 2" description="Mô tả nhóm 2" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailPage;
