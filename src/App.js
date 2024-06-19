import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SchoolManagement from "./pages/SchoolManagement";
import SchoolDetailPage from "./pages/SchoolDetailPage";
import StudentListPage from "./pages/StudentListPage";
import PostManagementPage from "./pages/PostManagementPage";
import PostDetailPage from "./pages/PostDetailPage";
import UserManagementPage from "./pages/UserManagementPage";
import UserDetailPage from "./pages/UserDetailPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import UserPostListPage from "./pages/UserPostListPage";
import GiftListPage from "./pages/GiftListPage";
import EventManagementPage from "./pages/EventManagementPage";
import EventStatisticPage from "./pages/EventStatisticPage";
import EventFormPage from "./pages/EventFormPage";
import NewsManagementPage from "./pages/NewsManagementPage";
import MainLayout from "./components/MainLayout";

import moment from "moment";

const { Content } = Layout;
const posts = [
  //Dữ liệu mẫu
];
const App = () => {
  // Dữ liệu giả lập về các trường học

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="school-management" element={<SchoolManagement />} />
          <Route path="/event-management" element={<EventManagementPage />} />
          <Route
            path="school/:schoolId/events/edit/:eventId"
            element={<EventFormPage />}
          />
          <Route
            path="school/:schoolId/events/add"
            element={<EventFormPage />}
          />
          <Route
            path="school/:schoolId/event/:eventId/stats"
            element={<EventStatisticPage />}
          />
          <Route path="news-management" element={<NewsManagementPage />} />
          <Route path="user-management" element={<UserManagementPage />} />
        </Route>

        {/* Các route khác không sử dụng MainLayout */}
        <Route path="/school/:schoolId" element={<SchoolDetailPage />} />
        <Route
          path="/school/:schoolId/students"
          element={<StudentListPage />}
        />
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/user/:userId" element={<UserDetailPage />} />
        <Route path="/school/:schoolId/groups" element={<GroupDetailPage />} />
        <Route
          path="/user/:userId/posts/:schoolId"
          element={<UserPostListPage />}
        />
        <Route path="/user/:userId/gifts" element={<GiftListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
