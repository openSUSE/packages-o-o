import { uniq } from 'lodash';

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
    if (project.indexOf('openSUSE:') === 0) {
        return 0;
    } else if (project.indexOf('home:') === 0) {
        return 2;
    } else {
        return 1;
    }
}

function countDash(str) {
    return str.replace(/[^-]/g, "").length;
}

export function getPackageNames(binaries) {
    return uniq(binaries.map(b => b.package));
}

export function getProjectNames(binaries, packageName) {
    return uniq(binaries.filter(b => b.package === packageName).map(b => b.project));
}

export function getBinaryNames(binaries, packageName, projectName) {
    return uniq(binaries.filter(b => b.package === packageName && b.project === projectName).map(b => b.name));
}

export function getBinary(binaries, packageName, projectName, binaryName) {
    return binaries.find(b => b.package === packageName && b.project === projectName && b.name === binaryName);
}

export function getYastUrl(binary) {
    const { project, repository, name } = binary;
    return `https://software.opensuse.org/ymp/${project}/${repository}/${name}.ymp`
}

export function getRpmUrl(binary) {
    const { project, repository, arch, filename } = binary;
    return `https://download.opensuse.org/repositories/${project}/${repository}/${arch}/${filename}`;
}

export function getObsUrl(binary) {
    return `https://build.opensuse.org/package/show/${binary.project}/${binary.package}`;
}

export function getZypperCommand(binary) {
    const { project, repository, name } = binary;
    return (`sudo zypper addrepo --enable --refresh https://download.opensuse.org/repositories/${project}/${repository}/${project}.repo
sudo zypper refresh
sudo zypper install ${name}`);
}
