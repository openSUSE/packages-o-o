import React from 'react';

export default function ProjectsList({ projects, selected, select }) {
    return <div class="card projects-list">
        <div class="card-header">
            Vendor Projects
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
