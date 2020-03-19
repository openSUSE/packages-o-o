import React from "react";
import "./BackButton.css";

export default function BackButton({ back }) {
    return back ? (
        <button className="back-button d-lg-none mr-2" onClick={() => back()}>
            <svg className="icon">
                <use xlinkHref="#arrow-left-line" />
            </svg>
        </button>
    ) : null;
}
