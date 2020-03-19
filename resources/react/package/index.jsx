import React from "react";
import ReactDOM from "react-dom";
import { sortBinaries } from "../data/binaries";
import PackageView from "./PackageView";

const root = document.getElementById("package-view-root");
if (root) {
    binaries = sortBinaries(binaries);
    ReactDOM.render(<PackageView binaries={binaries} name={name} />, root);
}
