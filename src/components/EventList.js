import React from "react";
import { TopicItem, ProgramItem } from "./EventItem";

/**
 * Component: TopicList
 * Description: Renders a list of topics with `TopicItem`. Calls `onSelect` when a topic is clicked.
 * 
 * Props:
 * - topics (Array): A list of topic objects containing fields.
 * - onSelect (Function): Callback function triggered when a topic is selected.
 * 
 * Returns:
 * - A section containing a grid of topics.
 */
const TopicList = ({ topics, onSelect }) => {
    return (
        <section>
            <div className="back-button"></div>
            <section className="grids"> {
                topics?.length > 0 ? (
                    topics.map((topic) => <TopicItem key={topic.id} topic={topic} onSelect={onSelect} />)
                ) : (
                    <p>No events found.</p>
                )
            }
            </section>
        </section>
    );
};

/**
 * Component: ProgramList
 * Description: Displays a list of programs with `ProgramItem`. Includes a back button.
 * 
 * Props:
 * - programs (Array): A list of program objects containing fields.
 * - onBack (Function): Callback function triggered when the back button is clicked.
 * 
 * Returns:
 * - A section containing a grid of programs.
 */
const ProgramList = ({ programs, onBack }) => {
    return (
        <section>
            <button className="back-button" onClick={onBack}>Back</button>
            <section className="grids"> {
                programs?.length > 0 ? (
                    programs.map((program) => <ProgramItem key={program.id} program={program} />)
                ) : (
                    <p>No events found.</p>
                )
            }
            </section>
        </section>
    );
};

export { TopicList, ProgramList };