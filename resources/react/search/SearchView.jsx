import React, { useState } from "react";
import "./SearchView.css";
import { getProjects, getBinary } from "../data/binaries";
import NamesList from "./NamesList";
import ProjectsList from "./ProjectsList";
import PackageDetails from "./PackageDetails";

export default function SearchResult({ binaries, names }) {
    if (!binaries.length) {
        return (
            <div className="search-result search-result-none">
                <div className="container text-center py-5">
                    <h3>No Result</h3>
                    <p>Try different keywords.</p>
                </div>
            </div>
        );
    }

    const isDesktop = window.innerWidth > 768;

    const [name, selectName] = useState(names[0]);
    const projects = getProjects(binaries, name);
    const [projectState, selectProject] = useState(projects[0]);
    const project = projects.includes(projectState)
        ? projectState
        : projects[0];
    const binary = getBinary(binaries, name, project);

    return (
        <div className="card-group search-view">
            {(isDesktop || !name) && (
                <NamesList names={names} selected={name} select={selectName} />
            )}
            {(isDesktop || (!!name && !project)) && (
                <ProjectsList
                    projects={projects}
                    selected={project}
                    select={selectProject}
                    back={() => selectName()}
                />
            )}
            {(isDesktop || !!project) && (
                <PackageDetails binary={binary} back={() => selectProject()} />
            )}
        </div>
    );
}
