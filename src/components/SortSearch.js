const SearchBar = ({ search, handleSearch }) => {
    return (
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded w-full"
        />
      );
};

const SortDropdown = ({ handleSort }) => {
    return (
      <select onChange={handleSort} className="p-2 border rounded">
        <option value="title">Sort by Title</option>
        <option value="start_time">Sort by Start Time</option>
      </select>
    );
  };


export {SortDropdown, SearchBar};