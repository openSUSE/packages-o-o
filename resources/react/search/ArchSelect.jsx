import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

function handleChange(e) {
    Cookies.set('arch', e.target.value);
    location.reload();
}

export default function ArchSelect() {
    return <select className="custom-select" value={Cookies.get('arch')} onChange={handleChange}>
        {archs.map(a => <option key={a} value={a}>{a}</option>)}
    </select>
}

const root = document.getElementById('arch-select-root')
if (root) {
    ReactDOM.render(<ArchSelect />, root);
}
