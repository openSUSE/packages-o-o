import React from 'react';

export default function PackageDetails({ binaries }) {
    return <div className="card package-details">
        <div className="card-header">
            Package Details
        </div>
        <div className="card-body">
            {binaries.map(b => <p key={b.filename}>{b.arch} {b.version}</p>)}
        </div>
    </div>
}
