const tresholdMoveX = 20; // max percentage moving on X
const tresholdMoveY = 30; // min percentage moving on Y

// get page height and  width
const height = window.screen.height;
const width = window.screen.width;

// init touch start vars
let startClientX = null;
let startClientY = null;

// listen for touchstart events
document.documentElement.addEventListener('touchstart', (e) => {
    // get location of initial touch 
    startClientX = e.touches[0].clientX;
    startClientY = e.touches[0].clientY;
});


// listen for touchend events
document.documentElement.addEventListener('touchend', (e) => {
    // get location of end touch 
    let endClientX = e.changedTouches[0].clientX;
    let endClientY = e.changedTouches[0].clientY;
    
    // calculate gesture movement on X and Y as percentage of page size
    const percentageMoveX = (startClientX - endClientX) / width * 100;
    const percentageMoveY = (endClientY - startClientY) / width * 100;
    
    if (window.scrollY === 0 // if the window is at the top
        && percentageMoveY > 0 // and movement on Y is downwards
        && percentageMoveX < Math.abs(tresholdMoveX) // and movemenent on X is maximum tresholdMoveY
        && Math.abs(percentageMoveY) >= 30 // and movement on Y is minimum percentageMoveY
    ){
        window.location.reload(true);
    }
});
