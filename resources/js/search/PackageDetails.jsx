import React from 'react';

export default function PackageDetails({ binaries }) {
    return <div className="package-details">
        <div className="container">
            {binaries.map(b => <p>{b.arch} {b.version}</p>)}
        </div>
    </div>
}
