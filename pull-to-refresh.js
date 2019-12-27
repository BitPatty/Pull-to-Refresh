const tresholdMoveX = 20; // max percentage moving on X
const tresholdMoveY = 30; // min percentage moving on Y

// get page height and  width
const height = window.screen.height;
const width = window.screen.width;

// init touch start vars
let startClientX = null;
let startClientY = null;

// listen for touchstart events
document.documentElement.addEventListener('touchstart', event => {
    // get location of initial touch 
    startClientX = event.touches[0].clientX;
    startClientY = event.touches[0].clientY;
});


// listen for touchend events
document.documentElement.addEventListener('touchend', event => {
    // get location of end touch 
    let endClientX = event.changedTouches[0].clientX;
    let endClientY = event.changedTouches[0].clientY;
    
    // calculate gesture movement on X and Y as percentage of page size
    const percentageMoveX = (startClientX - endClientX) / width * 100;
    const percentageMoveY = (endClientY - startClientY) / height * 100;
    
    if (window.scrollY === 0 // if the window is at the top
        && percentageMoveY > 0 // and movement on Y is downwards
        && Math.abs(percentageMoveX) < tresholdMoveX // and movemenent on X is maximum tresholdMoveX
        && Math.abs(percentageMoveY) >= tresholdMoveY // and movement on Y is minimum tresholdMoveY
    ){
        // reload the page and force refresh the cache
        window.location.reload(true);
    }
});
