import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  GiftOutlined,
  PlayCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";

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
        <SubMenu
          key="sub2"
          icon={<UnorderedListOutlined />}
          title="Quản lý tin tức"
        >
          <Menu.Item
            key="10"
            onClick={() => navigate("/news-category-management")}
          >
            Quản lý nhóm tin tức
          </Menu.Item>
          <Menu.Item key="11" onClick={() => navigate("/news-management")}>
            Tin tức
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="7" // Thêm key mới cho mục "Quản lý phần thưởng"
          icon={<GiftOutlined />}
          onClick={() => navigate("/reward-management")}
        >
          Quản lý phần thưởng
        </Menu.Item>
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
          }}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {/* ... (các Menu.Item khác giữ nguyên) */}

            <SubMenu // Thêm SubMenu cho quản lý game
              key="sub1"
              icon={<PlayCircleOutlined />}
              title="Quản lý game"
            >
              <Menu.Item key="8" onClick={() => navigate("/lucky-wheel")}>
                Vòng quay may mắn
              </Menu.Item>
              <Menu.Item key="9" onClick={() => navigate("/mystery-box")}>
                Hộp quà bí ẩn
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
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
