import axios from "axios";
import "./File.scss";
import React, { useState } from "react";
import { Upload, message, Modal, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const UploadFile = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Dragger } = Upload;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-10);
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(fileList);
  };

  const props = {
    action: "http://localhost:4000/Store",
    headers: {
      authorization: "authorization-text",
    },
    onChange: handleChange,
    multiple: true,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    axios
      .post("http://localhost:4000/Store", data)
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((e) => {});
    message.success("Your file has been uploaded successfully");
    setIsModalVisible(false);
    setFileList(null);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Upload file
      </Button>
      <Modal
        title="Choose file you want to upload"
        visible={isModalVisible}
        onOk={onsubmit}
        onCancel={handleCancel}
      >
        <form method="post" action="#" id="#" className="file__form">
          <Dragger {...props} fileList={fileList}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </form>
      </Modal>
    </>
  );
};
export default UploadFile;
