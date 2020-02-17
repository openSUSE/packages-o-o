import React from 'react';

export default function PackagesList({ packages, selected, select }) {
    return <div className="card projects-list">
        <div className="card-header">
            Source Packages
        </div>
        <div className="list-group list-group-flush">
            {packages.map(p => (
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