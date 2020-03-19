import React, { useState } from "react";
import { getProjects, getBinary } from "../data/binaries";
import ProjectsList from "../search/ProjectsList";
import PackageDetails from "../search/PackageDetails";

export default function PackageView({ binaries, name }) {
    const isDesktop = window.innerWidth > 768;
    const projects = getProjects(binaries, name);

    const [project, selectProject] = useState(projects[0]);

    const binary = getBinary(binaries, name, project);

    return (
        <div className="card-group search-result">
            {(isDesktop || !project) && (
                <ProjectsList
                    projects={projects}
                    selected={project}
                    select={selectProject}
                />
            )}
            {(isDesktop || !!project) && (
                <PackageDetails binary={binary} back={() => selectProject()} />
            )}
        </div>
    );
}
