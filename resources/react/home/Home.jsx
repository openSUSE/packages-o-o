import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <div className="container">

            </div>
        </div>
    );
}

const root = document.getElementById('home-root')
if (root) {
    ReactDOM.render(<Home />, root);
}
