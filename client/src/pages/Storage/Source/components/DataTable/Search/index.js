import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="header__search">
      <BsSearch />
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
