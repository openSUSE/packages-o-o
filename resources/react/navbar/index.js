import Cookies from 'js-cookie';

const distroSelect = document.getElementById('distro-select');

distroSelect.addEventListener('change', function () {
    Cookies.set('distro', distroSelect.value);
    location.reload();
});

const archSelect = document.getElementById('arch-select');

archSelect.addEventListener('change', function () {
    Cookies.set('arch', archSelect.value);
    location.reload();
});
