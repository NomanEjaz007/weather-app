import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div
      style={{
        backgroundColor: "blue",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div>Weather App</div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search city"
          style={{ padding: "5px", marginRight: "5px" }}
        />
        <button style={{ padding: 5 }} onClick={handleSearch}>
          <MdSearch size={15} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
