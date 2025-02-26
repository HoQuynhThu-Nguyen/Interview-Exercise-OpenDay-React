import React, { useState, useEffect } from "react";
import EventList from "../components/EventList";
import { SearchBar, SortDropdown } from "../components/SortSearch";

const formatDateTime = (datetimeString) => {
    const dateObj = new Date(datetimeString);
    let date = dateObj.toISOString().split("T")[0];
    let hours = dateObj.getHours().toString().padStart(2, "0");
    let minutes = dateObj.getMinutes().toString().padStart(2, "0");
    let time = `${hours}:${minutes}`;
    return { date, time };
};

const OpenDayApp = () => {
    const [data, setData] = useState({});
    const [dateTime, setDateTime] = useState({});
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("title");

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
        setSearch(e.target.value);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    //   const filteredEvents = events
    //     .filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    //     .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

    return (
        <section className="container">
            <section>
                <h1 className="title-text">{data.description || "Loading..."}</h1>
            
                <div className="flexs"> 
                    <p className="card-text">{dateTime.startDate}</p> 
                    <p className="card-text">{dateTime.startTime} - {dateTime.endTime}</p>
                </div>
            </section>
            <div className="controls">
                <SearchBar search={search} handleSearch={handleSearch}></SearchBar>
                <SortDropdown handleSort={handleSort} />
            </div>
            <EventList topics={data.topics}></EventList>
        </section>
    );
};

export default OpenDayApp;
