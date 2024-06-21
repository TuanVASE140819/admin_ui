import React, { useState } from "react";
import {
  Layout,
  Avatar,
  Dropdown,
  Badge,
  Menu,
  Button,
  Space,
  Typography,
} from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css"; // Thêm file CSS để tùy chỉn

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const [notificationsCount, setNotificationsCount] = useState(5); // Số thông báo
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Typography.Text strong>Thông báo 1</Typography.Text>
      </Menu.Item>
      <Menu.Item key="1">
        <Typography.Text strong>Thông báo 2</Typography.Text>
      </Menu.Item>
      {/* Thêm các thông báo khác ở đây */}
    </Menu>
  );
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar
       
      />
      <Layout>
        <Header
          style={{
            position: "fixed", // Giữ header cố định
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Space size="middle">
            {/* Chuông thông báo */}
            <Dropdown overlay={menu} trigger={["click"]}>
              <Badge count={notificationsCount} size="small">
                <BellOutlined style={{ fontSize: "20px", color: "#08c" }} />
              </Badge>
            </Dropdown>

            {/* Avatar và Dropdown đăng xuất */}
            <Dropdown
              overlay={() => (
                <Menu>
                  <Menu.Item
                    key="logout"
                    // onClick={handleLogout}
                  >
                    Đăng xuất
                  </Menu.Item>
                </Menu>
              )}
            >
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: "20px 16px 0",
            overflow: "auto",
            marginTop: "64px", // Khoảng cách từ header đến nội dung
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet style={{ padding: "24px" }} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
