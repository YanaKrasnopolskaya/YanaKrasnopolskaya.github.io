const menuInputEl = document.getElementById('menu');
const menuBoxEl = document.querySelector('.menu-box');
const menuCloseEl = document.querySelector('.menu-box__close');
//menu press tracking
menuInputEl.addEventListener('change', (e) => {
    menuInputEl.checked = 'true';
    menuBoxEl.style.right = 0;
});
//menu close press tracking
menuCloseEl.addEventListener('click', (e) => {
    e.preventDefault();
    menuInputEl.checked = 'false';
    menuBoxEl.style.right = '-100%';
});
//change style functions
function setHoverStyle(element) {
    element.classList.remove('active');
    element.classList.remove('focus');
    element.classList.add('hover');
}

function resetNormalStyle(element) {
    element.classList.remove('hover');
    element.classList.remove('active');
    element.classList.remove('focus');
    element.style.removeProperty('background');
}

function setClickStyle(element) {
    element.classList.remove('hover');
    element.classList.remove('focus');
    element.classList.add('active');
}

function setFocusStyle(element) {
    element.classList.remove('hover');
    element.classList.remove('active');
    element.classList.add('focus');
}

const formEmailEl = document.querySelector('.ui__form');
const inputEmailEl = document.querySelector('.ui__form_input');
//email validity check function
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//sending event
inputEmailEl.addEventListener('keydown', (e) => {
    //if inter is pressed and the value is not valid, an error is displayed, otherwise the data is sent
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
//page reload prevention
formEmailEl.addEventListener('submit', (e) => {
    e.preventDefault();
});
//events input
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
    //if input in focus, error is removed
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
//details operation
const filterEl = document.querySelector('.ui__dropdown_filter');
const filterItems = document.querySelectorAll('.ui__dropdown_item');
const summaryEl = document.querySelector('.ui__dropdown_summary-name');
const summaryImgEl = document.querySelector('.ui__dropdown_summary-img');
//change of img in summary
filterEl.addEventListener('toggle', (e) => {
    if (filterEl.open) {
        summaryImgEl.src = 'img/up arrow.svg';
    } else {
        summaryImgEl.src = 'img/down arrow.svg';
    }
});
// events in summary
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
//button operation
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
//checkbox operation
const inputsEl = document.querySelectorAll('.ui__checkbox-radio_input-check');

inputsEl.forEach(input => {
    //listen for a change event
    input.addEventListener('change', (e) => {
        const checkedInput = e.target;
        //if the checkbox is active, the other checkboxes become inactive
        if (checkedInput.checked) {
            inputsEl.forEach(i => {
                if (i !== checkedInput) {
                    i.disabled = true;
                }
            });
        } else {
            inputsEl.forEach(i => {
                if (i !== checkedInput) {
                    i.disabled = false;
                }
            });
        }
    });
});
//details operation
const accordionItems = document.querySelectorAll('.ui__accordion_item');

accordionItems.forEach((item) => {
//listen for a toggle event
    item.addEventListener('toggle', (event) => {
        const itemEl = event.currentTarget;
        const itemImg = itemEl.querySelector('.ui__accordion_img');
        //if details are open, change its img and close the other details
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
    //listen for a click event
    item.addEventListener('click', function() {
        this.classList.toggle('open');
    });
});
//navigation menu operation
const navLinks = document.querySelectorAll('.content-box__nav_link');

navLinks.forEach(link => {
    //listen for a click event
    link.addEventListener('click', (e) => {
        e.preventDefault();

        link.style.color = 'rgb(62, 41, 227)';
        //Get the class name from the href attribute
        let className = link.getAttribute('href').replace('#', '');
        let targetElement = document.querySelector(`.${className}`);
        //Focusing on the target block
        targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
});