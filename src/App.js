import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard"; // Giả sử bạn đã có các trang này
// import UserManagement from "./pages/UserManagement";
import SchoolManagement from "./pages/SchoolManagement";
// import EventManagement from "./pages/EventManagement";
// import NewsManagement from "./pages/NewsManagement";
// import Settings from "./pages/Settings";
import SchoolDetailPage from "./pages/SchoolDetailPage"; // Import SchoolDetailPage
import StudentListPage from "./pages/StudentListPage"; // Import StudentListPage
import PostManagementPage from "./pages/PostManagementPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserManagementPage from "./pages/UserManagementPage";
import UserDetailPage from "./pages/UserDetailPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import UserPostListPage from "./pages/UserPostListPage";
import GiftListPage from "./pages/GiftListPage";

const { Content } = Layout;
const posts = [
  {
    id: 1,
    title: "Bài viết 1",
    content: "Nội dung bài viết 1...",
    image: "https://via.placeholder.com/800x400",
    author: "Admin",
    createdAt: "2023-06-17",
    comments: 5,
    status: "visible", // Trạng thái bài viết: visible hoặc hidden
    createdAt: new Date("2023-06-17"),
  },
  {
    id: 2,
    title: "Bài viết 2",
    content: "Nội dung bài viết 2...",
    image: "https://via.placeholder.com/800x400",
    author: "Nguyễn Văn A",
    createdAt: "2023-06-16",
    comments: 12,
    status: "hidden",
    createdAt: new Date("2023-06-17"),
  },
];

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Content style={{ padding: "24px" }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/user-management" element={<UserManagement />} /> */}
              <Route path="/school-management" element={<SchoolManagement />} />
              {/* <Route path="/event-management" element={<EventManagement />} />
              <Route path="/news-management" element={<NewsManagement />} />
              <Route path="/settings" element={<Settings />} /> */}
              <Route path="/school/:schoolId" element={<SchoolDetailPage />} />
              <Route
                path="/school/:schoolId/students"
                element={<StudentListPage />}
              />
              <Route path="/school/1/students" element={<StudentListPage />} />
              <Route
                path="/school/1/postsNew"
                element={<PostManagementPage />}
              />

              <Route
                path="/post/1"
                element={<PostDetailPage posts={posts} />}
              />
              <Route path="/user-management" element={<UserManagementPage />} />
              <Route path="/user/:userId" element={<UserDetailPage />} />
              <Route path="/school/1/groups" element={<GroupDetailPage />} />
              <Route path="/user/1/posts/1" element={<UserPostListPage />} />
              <Route path="/user/1/gifts" element={<GiftListPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
