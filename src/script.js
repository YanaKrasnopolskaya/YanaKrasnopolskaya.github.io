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

// change style functions
function setHoverStyle(element) {
    element.classList.add('hover');
    element.classList.remove('active');
    element.classList.remove('focus');
}

function resetNormalStyle(element) {
    element.style.removeProperty('background');
    element.classList.remove('hover');
    element.classList.remove('active');
    element.classList.remove('focus');
}

function setClickStyle(element) {
    element.classList.add('active');
    element.classList.remove('hover');
    element.classList.remove('focus');
}

function setFocusStyle(element) {
    element.classList.add('focus');
    element.classList.remove('hover');
    element.classList.remove('active');
}

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
    resetNormalStyle(e.target);
});

inputEmailEl.addEventListener('mouseover', (e) => {
    setHoverStyle(e.target);
});

inputEmailEl.addEventListener('mouseout', (e) => {
    resetNormalStyle(e.target);
});

// tracking of new blocks for correct operation of the form
const observer = new MutationObserver(() => {
    const errorEl = document.querySelector('.ui__form_error-email');
    const errorMessageEl = document.querySelector('.ui__form_error');

    inputEmailEl.addEventListener('focus', (e) => {
        setFocusStyle(e.target);
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

const filterEl = document.querySelector('.filter');
const filterItems = document.querySelectorAll('.filter__items_item');
const summaryEl = document.querySelector('.filter__summary_name');
const summaryImgEl = document.querySelector('.filter__summary_img');

filterEl.addEventListener('toggle', (e) => {
    if (filterEl.open) {
        summaryImgEl.src = 'img/up arrow.svg';
    } else {
        summaryImgEl.src = 'img/down arrow.svg';
    }
});

filterItems.forEach(item => {
    item.addEventListener('mouseover', (e) => {
        setHoverStyle(e.target);
    });
    item.addEventListener('mouseout', (e) => {
        resetNormalStyle(e.target);
    });
    item.addEventListener('click', (e) => {
        summaryEl.textContent = item.textContent;
        setClickStyle(e.target);
    });
});

const buttonEl = document.querySelector('.ui__button-box_button');

buttonEl.addEventListener('mouseover', (e) => {
    setHoverStyle(e.target);
});
buttonEl.addEventListener('mouseout', (e) => {
    resetNormalStyle(e.target);
});
buttonEl.addEventListener('click', (e) => {
    setClickStyle(e.target);
});

const inputsEl = document.querySelectorAll('.ui__checkbox-radio_input-check');

inputsEl.forEach(input => {
    input.addEventListener('change', (e) => {
        const checkedInput = e.target;
        if (checkedInput.checked) {
            inputsEl.forEach(i => {
                if (i !== checkedInput) {
                    i.disabled = true;
                }
            });
        } else
            inputsEl.forEach(i => {
                if (i !== checkedInput) {
                    i.disabled = false;
                }
            });
    });
});

const accordionItems = document.querySelectorAll('.ui__accordion_item');

accordionItems.forEach((item) => {
    item.addEventListener('toggle', (event) => {
        const itemEl = event.currentTarget;
        const itemImg = itemEl.querySelector('.ui__accordion_img');

        if (itemEl.open) {
            itemImg.src = 'img/up arrow.svg';
            accordionItems.forEach((i) => {
                if (i !== itemEl) {
                    i.removeAttribute('open');
                }
            });
        } else {
            itemImg.src = 'img/down arrow.svg';
        }
    });
    item.addEventListener('click', function() {
        this.classList.toggle('open');
    });
});

const navLinks = document.querySelectorAll('.content-box__nav_link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        link.style.color = 'rgb(62, 41, 227)';

        let className = link.getAttribute('href').replace('#', '');
        let targetElement = document.querySelector(`.${className}`);

        targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
});