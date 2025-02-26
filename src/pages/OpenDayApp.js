import React, { useState, useEffect } from "react";
import {SortDropdown, SearchBar} from "../components/SortSearch";
import {TopicList, ProgramList} from "../components/EventList";
import {formatDateTime} from "../utils/FormatDateTime";
import "../styles.css";

const OpenDayApp = () => {
    const [data, setData] = useState({});
    const [dateTime, setDateTime] = useState({});
    const [sortBy, setSortBy] = useState("name");
    const [searchText, setSearchText] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        fetch("/data/OpenDay.json")
        .then((response) => response.json())
        .then((jsonData) => {
            console.log("Raw data", jsonData)

            const start = formatDateTime(jsonData.start_time);
            const end = formatDateTime(jsonData.end_time);
            const converted = {'startDate' : start.date, 'startTime' : start.time, 'endTime' : end.time};

            setData(jsonData || {});
            setDateTime(converted || {})
        })
        .catch((error) => console.error("Error loading JSON data:", error));
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

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

            <section>
                <div className="controls">
                    <SearchBar search={searchText} handleSearch={handleSearch}></SearchBar>
                    <SortDropdown handleSort={handleSort} />
                </div>
            </section>

            { !selectedTopic ? (
                <section>
                    <TopicList topics={data.topics} onSelect={handleTopicSelect}></TopicList>
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
