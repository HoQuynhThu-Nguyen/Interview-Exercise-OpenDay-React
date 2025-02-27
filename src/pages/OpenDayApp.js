import React, { useState, useEffect } from "react";
import { SortDropdown, SearchBar } from "../components/SortSearch";
import { TopicList, ProgramList } from "../components/EventList";
import { formatDateTime, SortTopicsDropdown, SortProgramsDropdown } from "../utils/Utils";
import _ from "lodash";
import "../styles.css";

/**
 * Component: OpenDayApp
 * Description: Main application component for displaying topics and programs for an open day event.
 * 
 * State:
 * - data (Object): Holds event details, including topics and timings.
 * - dateTime (Object): Stores formatted start and end times of the event.
 * - searchText (String): Current search query for filtering topics.
 * - sortBy (Array): Stores sorting field and order (e.g., ["name", "asc"]).
 * - selectedTopic (Object|null): The currently selected topic, or null if none is selected.
 * - displayTopics (Array): List of topics filtered and sorted based on search and sort criteria.
 */
const OpenDayApp = () => {
    const [data, setData] = useState({});
    const [dateTime, setDateTime] = useState({});
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState(["name", "asc"]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [displayTopics, setDisplayTopics] = useState([]);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/data/OpenDay.json")
        .then((response) => response.json())
        .then((jsonData) => {
            const start = formatDateTime(jsonData.start_time);
            const end = formatDateTime(jsonData.end_time);
            const converted = { 'startDate': start.date, 'startTime': start.time, 'endTime': end.time };

            setData(jsonData || {});
            setDisplayTopics(jsonData.topics || []);
            setDateTime(converted || {});
        })
        .catch((error) => console.error("Error loading JSON data:", error));
    }, []);

    useEffect(() => {
        if (!data.topics) return;

        let filteredTopics = _.filter(data.topics, (topic) =>
            topic.name.toLowerCase().includes(searchText.toLowerCase())
        );

        let sortedTopics;
        if (sortBy[0] === "programs") {
            sortedTopics = _.orderBy(filteredTopics, [(topic) => topic.programs?.length || 0], [sortBy[1]]);
        } else {
            sortedTopics = _.orderBy(filteredTopics, [sortBy[0]], [sortBy[1]]);
        }

        setDisplayTopics(sortedTopics);
    }, [searchText, sortBy, data.topics]);

    /**
     * Handles search input.
     * Updates `searchText` state when the Enter key is pressed.
     * 
     * @param {Event} e - Keyboard event.
     */
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchText(e.target.value);
        }
    };

    /**
     * Handles sorting selection.
     * Updates `sortBy` state based on user selection.
     * 
     * @param {Event} e - Change event from dropdown.
     */
    const handleSort = (e) => {
        const [field, order] = e.target.value.split(" ");
        setSortBy([field, order]);
    };

    /**
     * Handles topic selection.
     * Updates `selectedTopic` state when a topic is clicked.
     * 
     * @param {Object} topic - The selected topic object.
     */
    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    };

    return (
        <section className="container">
            <section>
                <h1 className="title-text">{data.description || "Loading..."}</h1>
                <div className="flexs"> 
                    <p className="card-text">{dateTime.startDate}</p> 
                    <p className="card-text">{dateTime.startTime} - {dateTime.endTime}</p>
                </div>
            </section>

            { !selectedTopic ? (
                <section>
                    <div className="controls">
                        <SearchBar search={searchText} handleSearch={handleSearch} />
                        <SortDropdown data={SortTopicsDropdown} handleSort={handleSort} />
                    </div>
                    <TopicList topics={displayTopics} onSelect={handleTopicSelect} />
                </section>
            ) : (
                <section>
                    <ProgramList programs={selectedTopic.programs} onBack={() => setSelectedTopic(null)} />
                </section>
            )}
        </section>
    );
};

export default OpenDayApp;
