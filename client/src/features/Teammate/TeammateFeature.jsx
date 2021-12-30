import { Button, Input, Space, Table } from "antd";
import "antd/dist/antd.css";
import UploadFile from "features/UploadFile-Storage/File";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBin6Line, RiEditFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import "./TeammateFeature.scss";

const TeammateFeature = () => {
  const teammateData = useSelector((state) => state.teammate);

  const [teammate, setTeammate] = useState(teammateData);
  const [value, setValue] = useState("");
  console.log("data", teammate);

  const FilterByNameInput = (
    <Input
      placeholder="Search teammate..."
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        console.log("search value: ", currValue);
        setValue(currValue);
        const filteredData = teammateData.filter(
          (entry) =>
            entry.name.toLowerCase().includes(currValue) ||
            entry.tag.toLowerCase().includes(currValue)
        );
        setTeammate(filteredData);
      }}
    />
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      render: (t, r) => (
        <div className="user__tag">
          <img src={`${r.avatar}`} alt={r.name} height="35px" width="35px" />
          {r.name}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "id",
      render: (t, r) => r.email,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "id",
      render: (t, r) => r.phone_number,
    },
    {
      title: "Tags",
      dataIndex: "tag",
      key: "Id",
      render: (t, r) => r.tag,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<RiEditFill />} size="small" />
          <Button type="danger" icon={<RiDeleteBin6Line />} size="small" />
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
        <Table dataSource={teammate} columns={columns}></Table>
      </div>
    </div>
  );
};

export default TeammateFeature;
