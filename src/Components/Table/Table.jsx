import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const MyTable = ({ data }) => {
  const [userData, setUserData] = useState();
  const [wholedata, setWholeData] = useState();
  useEffect(() => {
    setUserData(data);
    setWholeData(data);
  }, [data]);
  console.log("userData=>", userData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const search = () => {
    setCurrentPage(1);
    // renderTable();
  };

  const filterTable = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    renderTable();
  };

  const renderTable = () => {
    const filteredUsers = applySearchFilter(wholedata);
    setUserData(filteredUsers);
  };
  const applySearchFilter = (data) => {
    return (
      data &&
      data.filter((data) =>
        Object.values(data).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  };

  const deleteSelectedRows = () => {
    const newDataSource = userData.filter(
      (user) => !selectedRowKeys.includes(user.key)
    );
    console.log("new data=>", newDataSource);
    setUserData(newDataSource);
    setWholeData(newDataSource);
  };

  const deleteThisRow = (key) => {
    console.log("key=>", key);
    const newDataSource = userData.filter((user) => user.key !== key);
    console.log("new data=>", newDataSource);
    setUserData(newDataSource);
    setWholeData(newDataSource);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <FiEdit size={20} color="black" />
          </a>
          <a>
            <MdOutlineDelete
              onClick={() => deleteThisRow(record.key)}
              size={20}
              color="red"
            />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {selectedRowKeys.length ? (
        <a>
          <MdDelete
            onClick={() => deleteSelectedRows()}
            style={{
              position: "absolute",
              right: "10%",
              top: "12%",
              cursor: "pointer",
            }}
            size={25}
            color="red"
          />
        </a>
      ) : (
        <MdDelete
          style={{ position: "absolute", right: "10%", top: "12%" }}
          size={25}
          color="#ff000054"
        />
      )}
      <div style={{ textAlign: "left" }}>
        <input
          style={{ padding: "10px", width: "20vw", borderRadius: "10px" }}
          type="text"
          id="search"
          placeholder="Search..."
          onChange={filterTable}
        />
        <button className="search-icon" onClick={search}>
          Search
        </button>
      </div>
      {/* {renderTable([])} */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userData}
      />
    </>
  );
};
export default MyTable;
