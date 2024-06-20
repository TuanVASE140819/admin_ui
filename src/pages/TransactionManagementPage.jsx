import React, { useState } from "react";
import { Table, Tag } from "antd";

const TransactionManagementPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      amount: 100000,
      type: "deposit",
      date: "2023-06-20",
    },
    // ... thêm các giao dịch khác
  ]);

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Người dùng", dataIndex: "user", key: "user" },
    { title: "Số tiền", dataIndex: "amount", key: "amount" },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "deposit" ? "green" : "red"}>
          {type === "deposit" ? "Nạp tiền" : "Rút tiền"}
        </Tag>
      ),
    },
    { title: "Ngày", dataIndex: "date", key: "date" },
  ];

  return (
    <div>
      <h2>Quản lý giao dịch</h2>
      <Table columns={columns} dataSource={transactions} />
    </div>
  );
};

export default TransactionManagementPage;
