import React, { useState, useEffect } from "react";
import "./Content.scss";
import { BsSearch } from "react-icons/bs";
import { AiOutlineFileText, AiFillFolder } from "react-icons/ai";
import axios from "axios";

const Content = () => {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repos/ezzio/Line-98/git/trees/cf35194b440a14fa217890c4c931fa206f25b884"
      )
      .then((response) => {
        setRepo(response.data.tree);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClickUrl = (url) => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.tree === undefined) {
          console.log("khong con file nao nua");
        } else {
          setRepo(response.data.tree);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const icon = (type) => {
    if (type === "blob") {
      return <AiOutlineFileText />;
    } else {
      return <AiFillFolder />;
    }
  };

  return (
    <div className="content">
      <div className="content__header">
        <h2 className="content__header-title">Project Name</h2>
      </div>

      <div className="content__body">
        <div className="search">
          <BsSearch className="search__icon" />
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <div className="repository">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Last Commit</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {repo.map((file, index) => (
                <tr key={index}>
                  <td>
                    <a onClick={() => handleClickUrl(file.url)}>
                      <i>{icon(file.type)}</i>
                      {file.path}
                    </a>
                  </td>
                  <td>{file.size} MB</td>
                  <td>2021-08-24</td>
                  <td>Commit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Content;
