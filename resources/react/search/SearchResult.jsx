import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './SearchResult.css';
import { getProjects, getBinary, getNames, sortBinaries } from './binaries';
import NamesList from './NamesList';
import ProjectsList from './ProjectsList';
import PackageDetails from './PackageDetails';

let names;

export default function SearchResult() {
    if (!binaries.length) {
        return <div className="search-result search-result-none">
            <div className="container text-center py-5">
                <h3>No Result</h3>
                <p>Try different keywords.</p>
            </div>
        </div>
    }

    const isDesktop = window.innerWidth > 768;

    const [name, selectName] = useState('');
    const [project, selectProject] = useState('');

    const projects = getProjects(binaries, name);
    const binary = getBinary(binaries, name, project);

    return (
        <div className="card-group search-result">
            {(isDesktop || !name) && <NamesList names={names} selected={name} select={selectName} />}
            {(isDesktop || (!!name && !project)) && <ProjectsList projects={projects} selected={project} select={selectProject} back={() => selectName()} />}
            {(isDesktop || !!project) && <PackageDetails binary={binary} back={() => selectProject()} />}
        </div>
    );
}

const root = document.getElementById('search-result-root')
if (root) {
    binaries = sortBinaries(binaries);
    names = getNames(binaries);
    ReactDOM.render(<SearchResult />, root);
}
