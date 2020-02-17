import { uniq } from 'lodash';

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
