import React from 'react';

export default function ProjectsList({ projects, selected, select, back }) {
    return <div className="card projects-list">
        <div className="card-header">
            <button className="btn btn-secondary d-lg-none" onClick={() => back()}>Back</button> Vendors
        </div>
        <div className="list-group list-group-flush">

            {projects.map(p => (
                <button
                    type="button"
                    key={p}
                    className={`list-group-item list-group-item-action ${p === selected ? 'active' : ''}`}
                    onClick={() => select(p)}
                >
                    {p}
                </button>
            ))}
        </div>
    </div>
}
