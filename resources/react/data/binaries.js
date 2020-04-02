import { uniq } from "lodash";

export function sortBinaries(binaries) {
    return binaries.sort(compareBinaries);
}

export function compareBinaries(a, b) {
    let diff = getProjectWeight(a.project) - getProjectWeight(b.project);
    if (diff !== 0) {
        return diff;
    }
    diff = countDash(a.name) - countDash(b.name);
    if (diff !== 0) {
        return diff;
    }
    return a.name.length - b.name.length;
}

function getProjectWeight(project) {
    if (project.indexOf("openSUSE:") === 0) {
        return 0;
    } else if (project.indexOf("home:") === 0) {
        return 2;
    } else {
        return 1;
    }
}

function countDash(str) {
    return str.replace(/[^-]/g, "").length;
}

export function getNames(binaries) {
    return uniq(binaries.map(b => b.name));
}

export function getProjects(binaries, name) {
    return uniq(binaries.filter(b => b.name === name).map(b => b.project));
}

/**
 * Get the binary from a specific project. If there are multiple versions, return
 * the first (latest).
 * @param {Object[]} binaries
 * @param {string} name
 * @param {string} project
 * @returns {Object}
 */
export function getBinary(binaries, name, project) {
    return binaries.find(b => b.project === project && b.name === name);
}

export function getYastUrl(binary) {
    const { baseproject, name, project, repository } = binary;
    if (baseproject.startsWith("openSUSE.org:")) {
        return `https://packman.links2linux.org/install/${name}`;
    }
    return `https://software.opensuse.org/ymp/${project}/${repository}/${name}.ymp`;
}

export function getRpmUrl(binary) {
    const { arch, baseproject, filename, project, repository } = binary;
    if (baseproject.startsWith("openSUSE.org:")) {
        return `https://packman.links2linux.org/download/${binary.package}/${filename}`;
    }
    return `https://download.opensuse.org/repositories/${project}/${repository}/${arch}/${filename}`;
}

export function getObsUrl(binary) {
    if (binary.baseproject.startsWith("openSUSE.org:")) {
        return `https://pmbs.links2linux.de/package/show/${binary.project}/${binary.package}`;
    }
    return `https://build.opensuse.org/package/show/${binary.project}/${binary.package}`;
}

export function getZypperCommand(binary) {
    const { project, repository, name } = binary;
    const lines = [];
    if (!project.startsWith("openSUSE")) {
        if (binary.baseproject.startsWith("openSUSE.org:")) {
            lines.push(
                `sudo zypper addrepo --enable --refresh https://ftp.gwdg.de/pub/linux/misc/packman/suse/${repository}/packman.repo`
            );
        } else {
            lines.push(
                `sudo zypper addrepo --enable --refresh https://download.opensuse.org/repositories/${project}/${repository}/${project}.repo`
            );
        }
        lines.push("sudo zypper refresh");
    }
    lines.push(`sudo zypper install ${name}`);
    return lines.join("\n");
}
