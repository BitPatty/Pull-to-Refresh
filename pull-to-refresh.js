const tresholdMoveX = 20; // max percentage moving on X
const tresholdMoveY = 30; // max percentage moving on Y

const touchEventElement = document.documentElement;
const height = window.screen.height;
const width = window.screen.width;


let startClientX = null;
let startClientY = null;

touchEventElement.addEventListener('touchstart', (e) => {
    startClientX = e.touches[0].clientX;
    startClientY = e.touches[0].clientY;
});


touchEventElement.addEventListener('touchend', (e) => {
    let endClientX = e.changedTouches[0].clientX;
    let endClientY = e.changedTouches[0].clientY;
    
    const percentageMoveX = (startClientX - endClientX) / width * 100;
    const percentageMoveY = (endClientY - startClientY) / width * 100;
    
    if (window.scrollY === 0 && percentageMoveY > 0 && percentageMoveX < Math.abs(tresholdMoveX) && Math.abs(percentageMoveY) > 30) {
        window.location.reload(true);
    }
});
