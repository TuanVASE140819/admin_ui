import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar"; // Import Sidebar component
import SchoolList from "../components/SchoolList";
import SchoolDetailPage from "../pages/SchoolDetailPage";

const { Content } = Layout;

const SchoolManagement = () => {
  const [selectedSchool, setSelectedSchool] = useState(null); // Lưu trữ thông tin trường được chọn
  const [schools] = useState([]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <SchoolList schools={schools} onSchoolSelect={setSelectedSchool} />
          {selectedSchool && (
            <SchoolDetailPage
              school={
                schools &&
                schools.find((school) => school.id === selectedSchool.id)
              }
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SchoolManagement;
