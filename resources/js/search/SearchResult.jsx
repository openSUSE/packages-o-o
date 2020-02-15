import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './SearchResult.css';
import { getPackageNames, getProjectNames, getBinary } from './binaries';
import PackageList from './PackageList';

const packages = getPackageNames(binaries);

function SearchResult() {
    const [selectedPackage, selectPackage] = useState('');
    const [selectedProject, selectProject] = useState('');
    const projects = getProjectNames(binaries, selectedPackage);
    const binary = getBinary(binaries, selectedPackage, selectedProject);

    return (
        <div className="search-result">
            <PackageList packages={packages} selected={selectedPackage} select={selectPackage} />
            {projects && <PackageList packages={projects} selected={selectedProject} select={selectProject} />}
            {binary && binary.name}
        </div>
    );
}

export default SearchResult;

const root = document.getElementById('search-result-root')
if (root) {
    ReactDOM.render(<SearchResult />, root);
}
