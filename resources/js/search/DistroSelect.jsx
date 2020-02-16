import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

function handleChange(e) {
    Cookies.set('distro', e.target.value);
    location.reload();
}

export default function DistroSelect() {
    return <select className="custom-select" value={Cookies.get('distro')} onChange={handleChange}>
        {Object.keys(distros).map(value => <option key={value} value={value}>{distros[value]}</option>)}
    </select>
}

const root = document.getElementById('distro-select-root')
if (root) {
    ReactDOM.render(<DistroSelect />, root);
}
