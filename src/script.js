const menuInputElement = document.getElementById('menu');
const menuBoxElement = document.querySelector('.menu-box');
const menuCloseElement = document.querySelector('.menu-box__close');

menuInputElement.addEventListener('change', (e) => {
    menuInputElement.checked = 'true';
    menuBoxElement.style.right = 0;
});

menuCloseElement.addEventListener('click', (e) => {
    e.preventDefault();
    menuInputElement.checked = 'false';
    menuBoxElement.style.right = '-100%';
});