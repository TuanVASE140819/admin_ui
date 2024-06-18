import React, { useState } from "react";
import { Button, Descriptions, List, Table, Tag } from "antd";
import { TeamOutlined, FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UserDetailPage = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const user = {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "admin",
    status: "active",
    rank: "Vàng",
    currentPoints: 850,
    bonusPoints: 150,
    accountInfo: {
      username: "nguyenvana",
      registrationDate: "2023-01-15",
    },
    walletInfo: {
      balance: 500000, // Số dư ví
      transactions: [
        { date: "2023-06-10", amount: 200000 },
        { date: "2023-06-15", amount: 300000 },
        { date: "2023-06-15", amount: 300000 },
        { date: "2023-06-15", amount: 300000 },
      ],
    },
    joinedSchools: [
      {
        id: 1,
        name: "Trường A",
        province: "TP. Hồ Chí Minh",
        numGroups: 5, // Thêm số lượng nhóm
        numPosts: 12, // Thêm số lượng bài viết
      },
      {
        id: 2,
        name: "Trường B",
        province: "TP. Hồ Chí Minh",
        numGroups: 5, // Thêm số lượng nhóm
        numPosts: 12, // Thêm số lượng bài viết
      },
      {
        id: 3,
        name: "Trường C",
        province: "TP. Hồ Chí Minh",
        numGroups: 5, // Thêm số lượng nhóm
        numPosts: 12, // Thêm số lượng bài viết
      },
    ],
  };

  const transactionColumns = [
    { title: "Ngày", dataIndex: "date", key: "date" },
    { title: "Số tiền", dataIndex: "amount", key: "amount" },
  ];

  return (
    <div>
      <h2>Thông tin người dùng</h2>

      <Descriptions title={user.name} bordered column={2}>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Vai trò">
          <Tag color="gold">{user.role}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color="green">{user.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Hạng" span={2}>
          <Tag color="warning">{user.rank}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Điểm danh vọng" span={2}>
          {user.currentPoints}
        </Descriptions.Item>
        <Descriptions.Item label="Điểm thưởng còn lại" span={2}>
          {user.bonusPoints}
        </Descriptions.Item>
      </Descriptions>
      <Button
        style={{
          marginTop: 16,
          color: "blue",
          borderColor: "blue",
        }}
        type="link"
        onClick={() => navigate(`/user/1/gifts`, { state: { user } })} // Truyền user vào state
      >
        Xem thông tin nhận quà
      </Button>
      <Descriptions
        title="Thông tin tài khoản"
        bordered
        column={2}
        style={{ marginTop: "16px" }}
      >
        <Descriptions.Item label="Tên người dùng">
          {user.accountInfo?.username}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đăng ký">
          {user.accountInfo?.registrationDate}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title="Thông tin ví"
        bordered
        column={2}
        style={{ marginTop: "16px" }}
      >
        <Descriptions.Item label="Số dư">
          {user.walletInfo?.balance} VNĐ
        </Descriptions.Item>
        <Descriptions.Item label="Lịch sử giao dịch" span={2}>
          <Table
            columns={transactionColumns}
            dataSource={user.walletInfo?.transactions}
            pagination={false}
          />
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="Các trường đã tham gia"
        bordered
        column={2}
        style={{ marginTop: "16px" }}
      >
        <Descriptions.Item label="Trường học" span={2}>
          <List
            dataSource={user.joinedSchools}
            renderItem={(school) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    icon={<TeamOutlined />}
                    onClick={() => navigate(`/school/${school.id}/groups`)}
                  >
                    {school.numGroups} nhóm
                  </Button>,
                  <Button
                    type="link"
                    icon={<FileTextOutlined />}
                    onClick={() =>
                      navigate(`/user/${user.id}/posts/${school.id}`)
                    }
                  >
                    {school.numPosts} bài viết
                  </Button>,
                ]}
              >
                {school.name} ({school.province})
              </List.Item>
            )}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserDetailPage;
