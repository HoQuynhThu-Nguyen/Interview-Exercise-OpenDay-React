import React, { useState } from "react";
import {formatDateTime} from "../utils/Utils";

const TopicItem = ({ topic, onSelect}) => {
    if (!topic || Object.keys(topic).length === 0) {
        return <p>No events found.</p>;
    }

    return (
        <div className="event-card hoverable" onClick={() => onSelect(topic)}>
            {topic.cover_image && <img src={topic.cover_image} alt="Topic Image" />}
            <h3 className="card-text">{topic.name}</h3>
            <p>{topic.description}</p>
        </div>
    );
};

const ProgramItem = ({ program }) => {

    if (!program || Object.keys(program).length === 0) {
        return <p>No events found.</p>;
    }

    const start = formatDateTime(program.start_time);
    const end = formatDateTime(program.end_time);

    return (
        <div className="event-card">
            <section> 
                <section>
                    <img src={program.cover_image ? program.cover_image : program.location?.cover_image } alt="Program Image"/>

                    <h2>{program.title}</h2>
                    <div className="flexs">
                        <h4 className="plain-text">{start.date}</h4>
                        <h4 className="plain-text">{start.time} - {end.time}</h4>
                    </div>
                    <h4 className="plain-text">Address: {program.location.address} - {program.location.postcode}</h4>
                    <div className="flexs">
                        <h4 className="plain-text">Venue: {program.room} {program.floor}</h4>
                        <h4> Program Type: <span style={{backgroundColor: program.programType.type_colour}}>{program.programType.type}</span></h4>
                    </div>
                </section>

                <section>
                    <h4>{program.description_short}</h4>
                    <p className="plain-text">{program.description}</p>
                </section>

            </section>
        </div>
    );
};

export { TopicItem, ProgramItem };
