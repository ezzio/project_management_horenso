import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadAvatar } from "../../UserSettingSlice";
import userApi from "api/userApi";
function AvatarUpload({ visibleModalUpload, setVisibleModalUpload }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error("Invalid file type or format");
    }
    if (!isLt2M) {
      message.error("File size must be smaller than 2MB");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setIsLoading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log(info);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        dispatch(uploadAvatar(imageUrl));
        setIsLoading(false);
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    let data = new FormData();
    data.append("file", file);
    data.append("owner", localStorage.getItem("access_token") || "");
    userApi.uploadAvatar(data);
    setTimeout(() => {
      onSuccess("ok");
    }, 500);
  };

  return (
    <div>
      <Modal
        width={450}
        title="Upload your new avatar"
        visible={visibleModalUpload}
        onOk={() => setVisibleModalUpload(false)}
        onCancel={() => setVisibleModalUpload(false)}
        style={{ width: 400, height: 400 }}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={dummyRequest}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <UploadButton isLoading={isLoading} />
          )}
        </Upload>
      </Modal>
    </div>
  );
}

function UploadButton({ isLoading }) {
  return (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
}
export default AvatarUpload;
