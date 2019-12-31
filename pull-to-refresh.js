
// get page height and  width
const height = window.screen.height;
const width = window.screen.width;


// init touch start vars
let startClientX = null;
let startClientY = null;

function onError(error) {
}

function onGot(data) {
    settings = data.settings || {}
    
    verticalTresholdMoveX = settings.verticalTresholdMoveX || 50
    verticalTresholdMoveY = settings.verticalTresholdMoveY || 5

    horizontalTresholdMoveX = settings.horizontalTresholdMoveX || 5
    horizontalTresholdMoveY = settings.horizontalTresholdMoveY || 50

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
        const percentageMoveX = (endClientX - startClientX) / width * 100;
        const percentageMoveY = (endClientY - startClientY) / height * 100;



        if (window.scrollY === 0 // if the window is at the top
            && percentageMoveY > 0 // and movement on Y is downwards
            && Math.abs(percentageMoveX) < verticalTresholdMoveX // and movemenent on X is maximum verticalTresholdMoveX
            && Math.abs(percentageMoveY) >= verticalTresholdMoveY // and movement on Y is minimum verticalTresholdMoveY
        ) {
            // reload the page and force refresh the cache
            window.location.reload(true)
        } else if (endClientX >= width * .90 // movement is finished at the right margin of the screen
            && percentageMoveX > 0 // move on X is left to right
            && Math.abs(percentageMoveX) >= horizontalTresholdMoveX // and movement on X is minimum 10
            && Math.abs(percentageMoveY) <= horizontalTresholdMoveY // and movement on Y is maximum 10
        ) {
            window.history.forward()
        } else if (endClientX <= width *.1 // movement is finished at the left margin of the screen
            && percentageMoveX < 0 // move on X is right to left
            && Math.abs(percentageMoveX) >= horizontalTresholdMoveX // and movement on X is minimum 10
            && Math.abs(percentageMoveY) <= horizontalTresholdMoveY // and movement on Y is maximum 10
        ) {
            window.history.back()
        }
    });
}

const data = browser.storage.sync.get("settings");
data.then(onGot, onError);
