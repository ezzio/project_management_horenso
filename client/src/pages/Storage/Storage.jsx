import { Button, Input, Space, Table } from "antd";
import "antd/dist/antd.css";
import { listFile } from "features/Storage/storageSlice";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBin6Line, RiDownload2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Storage.scss";

const Storage = () => {
  const dataApi = useSelector((state) => state.storage.dataFile);
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFile(params.idProject));
  }, []);

  useEffect(() => {
    setDataSource(dataApi);
  }, [dataApi]);

  const FilterByNameInput = (
    <Input
      bordered={false}
      placeholder="Search file or task..."
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = dataApi.filter((entry) =>
          entry.name.toLowerCase().includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (t, r) => (
        <a href={`${r.URL}`} target="_blank" rel="noreferrer">{`${r.name}`}</a>
      ),
    },
    // {
    //   title: "Task",
    //   dataIndex: "task",
    //   key: "Id",
    //   sorter: (a, b) => a.task.localeCompare(b.task),
    // },

    {
      title: "Type",
      dataIndex: "nameType",
      key: "nameType",
      render: (t, r) => r.nameType,
    },
    {
      title: "Last modified",
      dataIndex: "uploaded_at",
      key: "uploaded_at",
      sorter: (a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at),
    },
    // {
    //   title: "Size",
    //   dataIndex: "size",
    //   key: "Id",
    //   sorter: (a, b) => a.size - b.size,
    // },
    // {
    //   title: "Member",
    //   dataIndex: "member",
    //   render: (t, r) => (
    //     <div className="user__tag">
    //       <img src={`${r.member}`} height="35px" width="35px" alt="" />
    //     </div>
    //   ),
    //   key: "Id",
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<RiDownload2Fill />} size="medium" />
          <Button type="danger" icon={<RiDeleteBin6Line />} size="medium" />
        </Space>
      ),
    },
  ];
  return (
    <div className="ctn storage">
      <div className="header">
        <div className="header__search">
          <i>
            <BsSearch className="icon" />
          </i>
          {FilterByNameInput}
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

export default Storage;
