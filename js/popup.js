const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 800;
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupСloseIcon = document.querySelectorAll(".close-popup");
if (popupСloseIcon.length > 0) {
  for (let index = 0; index < popupСloseIcon.length; index++) {
    const el = popupСloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
        popupClose(popupActive, false);
    } else {
        bodyLock();
    } 
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup_content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}
// document.querySelector('.wrapper').offsetWidth + 'px'
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
}
function bodyUnLock() {
    setTimeout(function() {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
// document.addEventListener('keydown', function (e) {
//     if (e.code === 27) {
//         const popupActive = document.querySelector('.popup.open');
//         popupClose(popupActive);
//     }
// });