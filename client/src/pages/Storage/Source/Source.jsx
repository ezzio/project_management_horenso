import React, { useState } from "react";
import { Table, Space, Button, Input } from "antd";
import "antd/dist/antd.css";
import JsonData from "./MOCK_DATA.json";
import "./Source.scss";
import { RiDownload2Fill, RiDeleteBin6Line } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import UploadFile from "features/UploadFile-Storage/File";

const Source = () => {
  const [dataSource, setDataSource] = useState(JsonData);
  const [value, setValue] = useState("");

  const FilterByNameInput = (
    <Input
      placeholder="Search file or task..."
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = JsonData.filter(
          (entry) =>
            entry.name.toLowerCase().includes(currValue) ||
            entry.task.toLowerCase().includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "Id",
      render: (t, r) => <a href={`${r.file}`} target="_blank">{`${r.name}`}</a>,
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "Id",
      sorter: (a, b) => a.task.localeCompare(b.task),
    },
    {
      title: "Last modified date",
      dataIndex: "lastModifiedDate",
      key: "Id",
      sorter: (a, b) =>
        new Date(a.lastModifiedDate) - new Date(b.lastModifiedDate),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "Id",
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: "Member",
      dataIndex: "member",
      render: (t, r) => (
        <div className="user__tag">
          <img src={`${r.member}`} height="35px" width="35px" />
        </div>
      ),
      key: "Id",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<RiDownload2Fill />} size="large" />
          <Button type="danger" icon={<RiDeleteBin6Line />} size="large" />
        </Space>
      ),
    },
  ];
  return (
    <div className="ctn source">
      <div className="header">
        <div className="header__search">
          <i>
            <BsSearch className="icon" />
          </i>
          {FilterByNameInput}
        </div>
        <div className="header__add-file">
          <UploadFile />
        </div>
        <div className="header__user-tag">
          <img
            src="https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png"
            alt="user-tag"
            height="35px"
            width="35px"
          />
        </div>
      </div>
      <div className="content">
        <Table dataSource={dataSource} columns={columns}></Table>
      </div>
    </div>
  );
};

export default Source;
