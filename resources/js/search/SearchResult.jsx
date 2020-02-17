import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './SearchResult.css';
import { getPackageNames, getProjectNames, getBinaries, getBinaryNames } from './binaries';
import BinaryNamesList from './BinaryNamesList';
import ProjectsList from './ProjectsList';
import PackagesList from './PackagesList';
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

    const [packageName, selectPackageName] = useState('');
    const [project, selectProject] = useState('');
    const [binaryName, selectBinaryName] = useState('');

    const projects = getProjectNames(binaries, packageName);
    const binaryNames = getBinaryNames(binaries, packageName, project);
    const packageBinaries = getBinaries(binaries, packageName, project, binaryName);

    return (
        <div className="card-group search-result">
            <PackagesList packages={packages} selected={packageName} select={selectPackageName} />
            <ProjectsList projects={projects} selected={project} select={selectProject} />
            <BinaryNamesList names={binaryNames} selected={binaryName} select={selectBinaryName} />
            <PackageDetails binaries={packageBinaries} />
        </div>
    );
}

const root = document.getElementById('search-result-root')
if (root) {
    ReactDOM.render(<SearchResult />, root);
}
