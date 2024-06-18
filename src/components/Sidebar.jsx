import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }} // Thêm style để cố định vị trí
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          onClick={() => navigate("/user-management")}
        >
          Quản lý người dùng
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<TeamOutlined />}
          onClick={() => navigate("/school-management")}
        >
          Quản lý trường học
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<CalendarOutlined />}
          onClick={() => navigate("/event-management")}
        >
          Quản lý sự kiện
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<FileTextOutlined />}
          onClick={() => navigate("/news-management")}
        >
          Quản lý tin tức
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<SettingOutlined />}
          onClick={() => navigate("/settings")}
        >
          Cài đặt
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
