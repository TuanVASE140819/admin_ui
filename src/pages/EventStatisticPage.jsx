import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Descriptions, Table, Row, Col } from "antd";
import { Pie } from "@ant-design/charts"; // Import Pie chart

const EventStatisticPage = ({ schools }) => {
  // Dữ liệu mẫu cho thống kê bình chọn
  const columns = [
    { title: "Quốc gia", dataIndex: "name", key: "name" },
    { title: "Số lượt bình chọn", dataIndex: "votes", key: "votes" },
  ];
  const event = {
    id: 1,
    name: "Sự kiện 1",
    description: "Sự kiện bình chọn quốc gia",
    startTime: "2023-01-15T08:00:00",
    endTime: "2023-01-15T17:00:00",
  };

  const eventStats = {
    countries: [
      { name: "Việt Nam", votes: 120 },
      { name: "Hàn Quốc", votes: 80 },
      { name: "Nhật Bản", votes: 50 },
    ],
  };

  const config = {
    appendPadding: 10,
    data: eventStats.countries,
    angleField: "votes",
    colorField: "name",
    radius: 0.8,
    label: {
      //   type: "inner",
      offset: "-30%",
      content: "{name} {percentage}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: {
        offsetY: -8,
        style: { fontSize: 14 },
      },
      content: {
        offsetY: 8,
        style: { fontSize: 18 },
      },
    },
  };

  return (
    <div>
      <Descriptions title={event.name} bordered style={{ marginBottom: 16 }}>
        {/* Hiển thị thông tin cơ bản của sự kiện */}
        <Descriptions.Item label="Mô tả">{event.description}</Descriptions.Item>
        <Descriptions.Item label="Thời gian bắt đầu">
          {event.startTime}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian kết thúc">
          {event.endTime}
        </Descriptions.Item>
      </Descriptions>
      <h2>Thống kê bình chọn</h2>
      <Row gutter={16}>
        {" "}
        {/* Chia layout thành 2 cột */}
        <Col span={12}>
          <Pie {...config} /> {/* Biểu đồ tròn */}
        </Col>
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={eventStats.countries}
            pagination={false} // Tắt phân trang
          />
        </Col>
      </Row>
    </div>
  );
};

export default EventStatisticPage;
