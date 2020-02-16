import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './SearchResult.css';
import { getPackageNames, getProjectNames, getBinaries } from './binaries';
import PackageList from './PackageList';
import PackageDetails from './PackageDetails';

const packages = getPackageNames(binaries);

export default function SearchResult() {
    if (!binaries.length) {
        return <div className="search-result search-result-none">
            <div className="container text-center py-5">
                <h3>No Result</h3>
                <p>Try different keywords.</p>
            </div>
        </div>
    }

    const [selectedPackage, selectPackage] = useState('');
    const [selectedProject, selectProject] = useState('');
    const projects = getProjectNames(binaries, selectedPackage);
    const packageBinaries = getBinaries(binaries, selectedPackage, selectedProject);

    return (
        <div className="search-result">
            <PackageList packages={packages} selected={selectedPackage} select={selectPackage} />
            <PackageList packages={projects} selected={selectedProject} select={selectProject} />
            <PackageDetails binaries={packageBinaries} />
        </div>
    );
}

const root = document.getElementById('search-result-root')
if (root) {
    ReactDOM.render(<SearchResult />, root);
}
