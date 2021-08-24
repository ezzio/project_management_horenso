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
  };

  return (
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
          id="input"
        />
        <label for="input" className="file__form-input-label">
          Upload Your File
        </label>
      </div>

      <button className="file__form-btn">Submit</button>
    </form>
  );
};
export default UploadFile;
