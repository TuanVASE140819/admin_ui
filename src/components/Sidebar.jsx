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
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import {
  // ... (các icon khác)
  ScheduleOutlined, // Icon cho quản lý nhiệm vụ
  DollarCircleOutlined, // Icon cho quản lý giao dịch
  ReloadOutlined, // Icon cho quản lý game Quay số
} from "@ant-design/icons";
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
        height: "calc(100vh - 64px)", // Chiều cao bằng viewport trừ chiều cao header
        position: "sticky",
        zIndex: 3,
        top: 64, // Cố định siderbar dưới header
        left: 0,
        background: "#fff",
      }}
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

        <SubMenu
          key="sub3" // Key mới cho submenu "Quản lý nhiệm vụ"
          icon={<CheckCircleOutlined />}
          title="Quản lý nhiệm vụ"
        >
          <Menu.Item key="12" onClick={() => navigate("/daily-tasks")}>
            Nhiệm vụ ngày
          </Menu.Item>
          <Menu.Item key="13" onClick={() => navigate("/other-tasks")}>
            Nhiệm vụ khác
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="14"
          icon={<DollarCircleOutlined />}
          onClick={() => navigate("/transaction-management")}
        >
          Quản lý giao dịch
        </Menu.Item>
        <Menu.Item
          key="15"
          icon={<ReloadOutlined />}
          onClick={() => navigate("/spin-game-management")}
        >
          Quản lý game Quay số
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
