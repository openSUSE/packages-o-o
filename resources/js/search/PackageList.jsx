import React from 'react';

export default function PackageList({ packages, selected, select }) {
    return <div className="list-group">
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
}
