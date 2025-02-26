import React, { useState, useEffect } from "react";
import {SortDropdown, SearchBar} from "../components/SortSearch";
import {TopicList, ProgramList} from "../components/EventList";
import {formatDateTime, SortTopicsDropdown, SortProgramsDropdown} from "../utils/Utils";
import _ from "lodash";
import "../styles.css";

const OpenDayApp = () => {
    const [data, setData] = useState({});
    const [dateTime, setDateTime] = useState({});
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState(["name", "asc"]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [displayTopics, setDisplayTopics] = useState([]);

    useEffect(() => {
        fetch("/data/OpenDay.json")
        .then((response) => response.json())
        .then((jsonData) => {
            console.log("Raw data", jsonData)

            const start = formatDateTime(jsonData.start_time);
            const end = formatDateTime(jsonData.end_time);
            const converted = {'startDate' : start.date, 'startTime' : start.time, 'endTime' : end.time};

            setData(jsonData || {});
            setDisplayTopics(jsonData.topics || [])
            setDateTime(converted || {})
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

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log("aaaaaaaaa")
            setSearchText(e.target.value);
        }
    }
    const handleSort = (e) => {
        const [field, order] = e.target.value.split(" ");
        setSortBy([field, order]);
    }
    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    }

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
                        <SearchBar search={searchText} handleSearch={handleSearch}></SearchBar>
                        <SortDropdown data={SortTopicsDropdown} handleSort={handleSort} />
                    </div>
                    <TopicList topics={displayTopics} onSelect={handleTopicSelect}></TopicList>
                </section>
            ) : (
                <section>
                    <ProgramList programs={selectedTopic.programs} onBack={() => setSelectedTopic(null)}></ProgramList>
                </section>
            )}

        </section>


    );
};

export default OpenDayApp;
