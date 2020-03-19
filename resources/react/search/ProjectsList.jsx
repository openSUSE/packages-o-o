import React from "react";
import BackButton from "./BackButton";

export default function ProjectsList({ projects, selected, select, back }) {
    return (
        <div className="card projects-list">
            <div className="card-header">
                <BackButton back={back} />
                Vendors
            </div>
            <div className="list-group list-group-flush">
                {projects.map(p => (
                    <button
                        type="button"
                        key={p}
                        className={`list-group-item list-group-item-action ${
                            p === selected ? "active" : ""
                        }`}
                        onClick={() => select(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
}
