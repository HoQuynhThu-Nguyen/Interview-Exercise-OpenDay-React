const formatDateTime = (datetimeString) => {
    const dateObj = new Date(datetimeString);
    let date = dateObj.toISOString().split("T")[0];
    let hours = dateObj.getHours().toString().padStart(2, "0");
    let minutes = dateObj.getMinutes().toString().padStart(2, "0");
    let time = `${hours}:${minutes}`;
    return { date, time };
};

const SortTopicsDropdown = [
    ["name asc", "Name A-Z"],
    ["name desc", "Name Z-A"],
    ["programs asc", "Programs Increase"],
    ["programs desc", "Programs Decrease"],
]

const SortProgramsDropdown = [
    ["title asc", "Title A-Z"],
    ["title desc", "Title Z-A"],
]

export { formatDateTime, SortTopicsDropdown, SortProgramsDropdown };