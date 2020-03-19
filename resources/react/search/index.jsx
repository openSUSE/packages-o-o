import React from "react";
import ReactDOM from "react-dom";
import { getNames, sortBinaries } from "../data/binaries";
import SearchView from "./SearchView";

const root = document.getElementById("search-view-root");
if (root) {
    const binaries = sortBinaries(window.binaries);
    const names = getNames(binaries);
    ReactDOM.render(<SearchView binaries={binaries} names={names} />, root);
}
