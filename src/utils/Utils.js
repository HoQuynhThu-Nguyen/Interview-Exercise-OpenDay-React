/**
 * Function: formatDateTime
 * Description: Formats a datetime string into an object containing date (YYYY-MM-DD) and time (HH:MM).
 * 
 * Parameters:
 * - datetimeString (String): A string representing a date-time value.
 * 
 * Returns:
 * - An object with `date` (String) and `time` (String) properties.
 */
const formatDateTime = (datetimeString) => {
    const dateObj = new Date(datetimeString);
    let date = dateObj.toISOString().split("T")[0];
    let hours = dateObj.getHours().toString().padStart(2, "0");
    let minutes = dateObj.getMinutes().toString().padStart(2, "0");
    let time = `${hours}:${minutes}`;
    return { date, time };
};

/**
 * Constant: SortTopicsDropdown
 * Description: Defines sorting options for topics.
 * 
 * Format:
 * - Each item is an array `[value, label]`, where:
 *   - value (String): Sorting parameter.
 *   - label (String): User-friendly display name.
 */
const SortTopicsDropdown = [
    ["name asc", "Name A-Z"],
    ["name desc", "Name Z-A"],
    ["programs asc", "Programs Increase"],
    ["programs desc", "Programs Decrease"],
];

/**
 * Constant: SortProgramsDropdown
 * Description: Defines sorting options for programs.
 * 
 * Format:
 * - Each item is an array `[value, label]`, where:
 *   - value (String): Sorting parameter.
 *   - label (String): User-friendly display name.
 */
const SortProgramsDropdown = [
    ["title asc", "Title A-Z"],
    ["title desc", "Title Z-A"],
];

export { formatDateTime, SortTopicsDropdown, SortProgramsDropdown };