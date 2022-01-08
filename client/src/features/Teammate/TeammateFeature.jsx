import { Input, Space, Table } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ModalAddTeammate from "./components/AddNewTeammate/ModalAddTeammate";
import DeleteTeammate from "./components/DeleteTeammate/DeleteTeammate";
import EditTeammate from "./components/EditTeammate/EditTeammate";
import "./TeammateFeature.scss";
import { ListUser } from "./teammateSlice";

const TeammateFeature = () => {
  const teammateData = useSelector((state) => state.teammate.dataList);
  const [teammate, setTeammate] = useState(teammateData);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ListUser());
  }, []);

  useEffect(() => {
    setTeammate(teammateData);
  }, [teammateData]);

  const FilterByNameInput = (
    <Input
      placeholder="Search teammate..."
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = teammateData.filter(
          (entry) =>
            entry.user_name.toLowerCase().includes(currValue) ||
            entry.display_name.toLowerCase().includes(currValue)
        );

        setTeammate(filteredData);
      }}
    />
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "display_name",
      key: "user_name",
      render: (t, r) => (
        <div className="user__tag">
          <img
            src={`${r.avatar}`}
            alt={r.display_name}
            height="35px"
            width="35px"
          />
          {r.display_name ? r.display_name : `${r.user_name} (username)`}
        </div>
      ),
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      render: (t, r) => r.user_name,
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "id",
    //   render: (t, r) => r.email,
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone_number",
    //   key: "id",
    //   render: (t, r) => r.phone_number,
    // },
    {
      title: "Tags",
      dataIndex: "tag",
      key: "user_name",
      render: (t, r) => r.tag,
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          {localStorage.getItem("access_token") ===
            localStorage.getItem("projectowner") &&
            record.tag !== "Leader" && (
              <>
                <EditTeammate user={record} />
                <DeleteTeammate user_name={record.user_name} />
              </>
            )}
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
        <div className="header__add-teammate">
          <ModalAddTeammate listTeammate={teammate} />
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
        <Table dataSource={teammate} columns={columns} />
      </div>
    </div>
  );
};

export default TeammateFeature;
