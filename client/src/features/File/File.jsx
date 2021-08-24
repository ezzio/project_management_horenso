import { useState } from "react";
import axios from "axios";
import "./File.scss";

const UploadFile = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);

  const onInputChange = (e) => {
    setFiles(e.target.files);
  };

  const onSubmit = (e) => {
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
    if (files.length === 1) {
      alert("Upload successfully 1 file!");
    } else {
      alert("Upload successfully " + files.length + " files");
    }
  };

  const fileNumbers = files.length;
  let noti = "";
  if (fileNumbers === 1) {
    noti = <div className="file__form-noti">You are uploading 1 file!</div>;
  } else if (fileNumbers > 1) {
    noti = (
      <div className="file__form-noti">
        You are uploading {fileNumbers} files!
      </div>
    );
  } else {
    noti = "";
  }

  return (
    <div>
      <form
        method="post"
        action="#"
        id="#"
        onSubmit={onSubmit}
        className="file__form"
      >
        <div className="file__form-input">
          <input
            className="file__form-input-btn"
            type="file"
            onChange={onInputChange}
            multiple
            required
            id="input"
          />
          <label for="input" className="file__form-input-label">
            Upload new file
          </label>
        </div>

        {noti}
        <button className="file__form-btn">Submit</button>
      </form>
    </div>
  );
};
export default UploadFile;
