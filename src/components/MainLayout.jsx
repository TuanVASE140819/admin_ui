import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }} />
        <Content style={{ margin: "20px 16px 0", overflow: "auto" }}>
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
