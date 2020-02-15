import React from 'react';

export default function ProjectList({ projects, selected, select }) {
    return <div className="list-group">
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
}
