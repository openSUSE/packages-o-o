import { uniq } from 'lodash';

export function getPackageNames(binaries) {
    return uniq(binaries.map(b => b.name));
}

export function getProjectNames(binaries, packageName) {
    return uniq(binaries.filter(b => b.name === packageName).map(b => b.project));
}

export function getBinary(binaries, packageName, projectName) {
    return binaries.find(b => b.name === packageName && b.project === projectName);
}
