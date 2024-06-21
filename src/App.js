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
import RewardManagementPage from "./pages/RewardManagementPage";
import LuckyWheelManagementPage from "./pages/LuckyWheelManagementPage";
import MysteryBoxManagementPage from "./pages/MysteryBoxManagementPage";
import NewsFormPage from "./pages/NewsFormPage";
import NewsCategoryManagementPage from "./pages/NewsCategoryManagementPage";


import TaskManagementPage from "./pages/TaskManagementPage";
import TransactionManagementPage from "./pages/TransactionManagementPage";
import DailyTasksPage from "./pages/DailyTasksPage";
import OtherTasksPage from "./pages/OtherTasksPage";
// import SpinGameManagementPage from "./pages/SpinGameManagementPage";

const { Content } = Layout;
const posts = [
  //Dữ liệu mẫu
];
const App = () => {
  // Dữ liệu giả lập về các trường học
  const schools = [
    {
      id: 1,
      name: "Trường A",
      address: "Địa chỉ A",
      phone: "0123456789",
      email: "test@gmail.com",
      website: "https://example.com",
      logo: "https://via.placeholder.com/150",
      cover: "https://via.placeholder.com/150",
      students: 1000,
      groups: [
        {
          id: 1,
          name: "Nhóm A",
          students: 100,
        },
        {
          id: 2,
          name: "Nhóm B",
          students: 200,
        },
      ],
      newsCategories: [
        {
          id: 1,
          name: "Thể thao",
          createdAt: moment("2023-06-19"),
          status: "active",
        },
        {
          id: 2,
          name: "Giáo dục",
          createdAt: moment("2023-06-18"),
          status: "inactive",
        },
        {
          id: 3,
          name: "Công nghệ",
          createdAt: moment("2023-06-17"),
          status: "active",
        },
      ],
      news: [
        {
          id: 1,
          title: "Tin tức 1",
          content: "<p>Nội dung tin tức 1...</p>",
        },
        {
          id: 2,
          title: "Tin tức 2",
          content: "<p>Nội dung tin tức 2...</p>",
        },
      ],
    },
  ];

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
          <Route
            path="news-management"
            element={<NewsManagementPage schools={schools} />}
          />
          <Route path="user-management" element={<UserManagementPage />} />
          <Route path="/reward-management" element={<RewardManagementPage />} />
          <Route path="/school/:schoolId" element={<SchoolDetailPage />} />
          <Route
            path="/school/:schoolId/students"
            element={<StudentListPage />}
          />
          <Route path="/post/1" element={<PostDetailPage />} />
          <Route path="/user/:userId" element={<UserDetailPage />} />
          <Route
            path="/school/:schoolId/groups"
            element={<GroupDetailPage />}
          />
          <Route
            path="/user/:userId/posts/:schoolId"
            element={<UserPostListPage />}
          />
          <Route path="/user/:userId/gifts" element={<GiftListPage />} />
          {/* /school/1/postsNew */}
          <Route path="/school/1/postsNew" element={<PostManagementPage />} />
          <Route path="/lucky-wheel" element={<LuckyWheelManagementPage />} />
          <Route path="/mystery-box" element={<MysteryBoxManagementPage />} />
          {/* /news-category-management */}
          <Route
            path="/news-category-management"
            element={<NewsCategoryManagementPage />}
          />
          <Route path="task-management" element={<TaskManagementPage />} />
          <Route
            path="/transaction-management"
            element={<TransactionManagementPage />}
          />
          {/* <Route
            path="/spin-game-management"
            element={<SpinGameManagementPage />}
          /> */}

          <Route path="/daily-tasks" element={<DailyTasksPage />} />
          <Route path="/other-tasks" element={<OtherTasksPage />} />
        </Route>

        {/* Các route khác không sử dụng MainLayout */}
      </Routes>
    </Router>
  );
};

export default App;
