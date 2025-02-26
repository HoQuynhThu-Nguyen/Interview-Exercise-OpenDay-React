import React from "react";
import { TopicItem, ProgramItem } from "./EventItem";

const TopicList = ({ topics, onSelect}) => {
    console.log("Topic List",topics)
    return (
        <section>
            <div className="back-button"></div>
            <section className="grids"> {
                topics?.length > 0 ? (
                topics.map((topic) => <TopicItem key={topic.id} topic={topic} onSelect={onSelect}/>)
                ) : (
                    <p>No events found.</p>
            )}
            </section>
        </section>
    );
};

const ProgramList = ({ programs, onBack }) => {
    console.log("Program List",programs)
    return (
        <section>
            <button className="back-button" onClick={onBack}>Back</button>
            <section className="grids"> {
                programs?.length > 0 ? (
                    programs.map((program) => <ProgramItem key={program.id} program={program}/>)
                ) : (
                    <p>No events found.</p>
            )}
            </section>
        </section>
    );
};

export { TopicList, ProgramList };
