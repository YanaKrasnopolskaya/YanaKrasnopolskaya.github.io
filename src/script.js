const menuInputEl = document.getElementById('menu');
const menuBoxEl = document.querySelector('.menu-box');
const menuCloseEl = document.querySelector('.menu-box__close');
const formEmailEl = document.querySelector('.ui__form');
const inputEmailEl = document.querySelector('.ui__form_input');

// menu press tracking
menuInputEl.addEventListener('change', (e) => {
    menuInputEl.checked = 'true';
    menuBoxEl.style.right = 0;
});

// menu close press tracking
menuCloseEl.addEventListener('click', (e) => {
    e.preventDefault();
    menuInputEl.checked = 'false';
    menuBoxEl.style.right = '-100%';
});

// email validity check function
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// sending event
inputEmailEl.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        if (!validateEmail(inputEmailEl.value) || !inputEmailEl.value) {
            e.target.blur();

            const errorEmail = '<span class="ui__form_error-email">E-mail</span>';
            const errorMessage = '<span class="ui__form_error">текст ошибки</span>';

            inputEmailEl.insertAdjacentHTML('beforebegin', errorEmail);
            inputEmailEl.insertAdjacentHTML('afterend', errorMessage);
            
            inputEmailEl.value = '';
            inputEmailEl.style.borderBottom = '4px solid rgb(232, 15, 59)';
            return false;
        } else {
            e.preventDefault();
            formEmailEl.submit();
        }
    }
});

inputEmailEl.addEventListener('blur', (e) => {
    inputEmailEl.style.borderBottom = '2px solid rgb(174, 173, 174)';
});

inputEmailEl.addEventListener('mouseover', (e) => {
    inputEmailEl.style.borderBottom = '2px solid rgb(62, 41, 227)';
});

inputEmailEl.addEventListener('mouseout', (e) => {
    inputEmailEl.style.borderBottom = '2px solid rgb(174, 173, 174)';
});

// tracking of new blocks for correct operation of the form
const observer = new MutationObserver(() => {
    const errorEl = document.querySelector('.ui__form_error-email');
    const errorMessageEl = document.querySelector('.ui__form_error');

    inputEmailEl.addEventListener('focus', (e) => {
        inputEmailEl.style.borderBottom = '4px solid rgb(62, 41, 227)';
        if (errorEl && errorMessageEl) {
            errorEl.remove();
            errorMessageEl.remove();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});