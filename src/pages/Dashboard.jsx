import React, { useState } from "react";
import { Row, Col, Card, Statistic, Table } from "antd";
import {
  UserOutlined,
  BankOutlined,
  GiftOutlined,
  AreaChartOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/charts"; // Import biểu đồ đường

const Dashboard = () => {
  // Dữ liệu giả lập
  const totalUsers = 1234;
  const totalSchools = 56;
  const totalRevenue = 123456789;
  const totalGifts = 500;

  // Dữ liệu cho biểu đồ doanh thu
  const revenueData = [
    { date: "2023-01-01", value: 1000000 },
    { date: "2023-01-02", value: 1200000 },
    { date: "2023-01-03", value: 800000 },
    // Thêm dữ liệu cho các ngày khác
  ];

  // Dữ liệu cho top người dùng nạp tiền
  const topUsers = [
    { name: "Nguyễn Văn A", amount: 5000000 },
    { name: "Trần Thị B", amount: 3000000 },
    // Thêm người dùng khác
  ];

  const topUserColumns = [
    { title: "Người dùng", dataIndex: "name", key: "name" },
    { title: "Số tiền nạp", dataIndex: "amount", key: "amount" },
  ];

  // Cấu hình biểu đồ
  const config = {
    data: revenueData,
    xField: "date",
    yField: "value",
    height: 200,
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <Row gutter={[16, 16]}>
        {/* Số lượng người dùng */}
        <Col span={6}>
          <Card>
            <Statistic
              title="Số lượng người dùng"
              value={totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        {/* Số lượng trường */}
        <Col span={6}>
          <Card>
            <Statistic
              title="Số lượng trường"
              value={totalSchools}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>

        {/* Doanh thu */}
        <Col span={6}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={totalRevenue}
              precision={0}
              suffix="VNĐ"
              trend="up"
              prefix={<GiftOutlined />}
            />
          </Card>
        </Col>

        {/* Số phần quà phát ra */}
        <Col span={6}>
          <Card>
            <Statistic
              title="Số phần quà phát ra"
              value={totalGifts}
              prefix={<GiftOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Biểu đồ doanh thu" style={{ height: 300 }}>
            <Line {...config} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top người dùng nạp tiền" style={{ height: 300 }}>
            <Table
              columns={topUserColumns}
              dataSource={topUsers}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
