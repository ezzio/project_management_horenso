import React, { useState } from "react";
import "./Content.scss";
import { BsSearch } from "react-icons/bs";

const Content = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClick = () => {
    console.log(searchInput);
  };

  return (
    <div className="content">
      <div className="content__header">
        <h2 className="content__header-title">Project Name</h2>
      </div>

      <div className="content__body">
        <div className="search">
          <BsSearch className="search__icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearch}
          />
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Content;
