import React, { useState } from "react";
import { Table, Tag, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const TransactionManagementPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      user: "Nguyễn Văn A",
      amount: 100000,
      type: "deposit",
      date: "2023-06-20",
      bank: "Vietcombank",
      status: "completed",
    },
    // ... thêm các giao dịch khác
  ]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  let searchInput;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    { title: "STT", dataIndex: "id", key: "id", ...getColumnSearchProps("id") },
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
      ...getColumnSearchProps("user"),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      ...getColumnSearchProps("amount"),
    },
    {
      title: "Ngân hàng",
      dataIndex: "bank",
      key: "bank",
      ...getColumnSearchProps("bank"),
    },
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
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "completed" ? "green" : "red"}>
          {status === "completed" ? "Hoàn thành" : "Chưa hoàn thành"}
        </Tag>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
  ];

  return (
    <div>
      <h2>Quản lý giao dịch</h2>
      <Table columns={columns} dataSource={transactions} />
    </div>
  );
};

export default TransactionManagementPage;
