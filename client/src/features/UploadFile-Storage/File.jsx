import { useState } from "react";
import axios from "axios";
import "./File.scss";

const UploadFile = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);

  const onInputChange = (e) => {
    setFiles(e.target.files);
    if (e.target.files.length === 1) {
      alert("You are selecting 1 file!");
    } else {
      alert("You are selecting " + e.target.files.length + " files");
    }
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
    alert("Upload successful!");

    document.getElementsByClassName("file__form-input-btn")[0].value = null;
  };

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
        <button className="file__form-btn">Submit</button>
      </form>
    </div>
  );
};
export default UploadFile;
