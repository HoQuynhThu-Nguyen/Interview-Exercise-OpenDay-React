import React from "react";

/**
 * Component: SortDropdown
 * Description: A dropdown selection component for sorting data.
 * 
 * Props:
 * - data (Array): A list of sorting options.
 * - handleSort (Function): Callback function triggered when the selection changes.
 * 
 * Returns:
 * - A select dropdown that triggers `handleSort` when the value is changed.
 */
const SortDropdown = ({ data, handleSort }) => {
    return (
        <select onChange={handleSort} className="select-box"> {
            data?.length > 0 ? (
              data.map((o) => <option key={o[0]} value={o[0]}>Sort by {o[1]}</option>)
              ) : (
                <option value="unknown">Unknown</option>
            )}
        </select>
    );
};

/**
 * Component: SearchBar
 * Description: An input field for searching topics.
 * 
 * Props:
 * - text (String): The current search input value.
 * - handleSearch (Function): Callback function triggered when a key ENTER is pressed.
 * 
 * Returns:
 * - An input field that calls `handleSearch` on key press.
 */
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