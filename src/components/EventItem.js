import React from "react";

const EventItem = ({ topic }) => {
    if (!topic || Object.keys(topic).length === 0) {
        return <p>No events found.</p>;
    }

    return (
        <div className="event-card hoverable">
            {topic.cover_image && <img src={topic.cover_image} alt="Topic Image" />}
            <h3 className="card-text">{topic.name}</h3>
            <p>{topic.description}</p>
        </div>
    );
};

export default EventItem;
