import React from "react";

const SortDropdown = ({ data, handleSort }) => {
    return (
        <select onChange={handleSort} className="select-box"> {
            data?.length > 0 ? (
              data.map((o) => <option key={o[0]} value={o[0]}>Sort by {o[1]}</option>)
              ) : (
                <option value="unknow">Unknown</option>
            )}
        </select>
    );
};

const SearchBar = ({ text, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search topics..."
      value={text}
      onKeyDown={handleSearch}
      className="hint-text search-box"
    />
  );
};

export { SortDropdown, SearchBar };
