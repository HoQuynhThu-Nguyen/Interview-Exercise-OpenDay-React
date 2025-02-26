import React from "react";
import EventItem from "./EventItem";

const EventList = ({ topics }) => {
    console.log("Topic List",topics)
    return (
        <section>
            <section className="grids"> {
                topics?.length > 0 ? (
                topics.map((topic) => <EventItem key={topic.id} topic={topic}/>)
                ) : (
                    <p>No events found.</p>
            )}
            </section>
        </section>
    );
};

export default EventList;
