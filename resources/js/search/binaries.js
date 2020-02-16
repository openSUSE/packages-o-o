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

export function getBinaries(binaries, packageName, projectName, binaryName) {
    return binaries.filter(b => b.package === packageName && b.project === projectName && b.name === binaryName);
}
