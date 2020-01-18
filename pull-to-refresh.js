// get page height and  width
const height = window.screen.height;
const width = window.screen.width;

// init touch start vars
let startClientX = null;
let startClientY = null;

function onError(error) {}

function onGot(data) {
    const config = data.settings;

    // listen for touchstart events
    document.documentElement.addEventListener("touchstart", event => {
        // get location of initial touch
        startClientX = event.touches[0].clientX;
        startClientY = event.touches[0].clientY;
    });

    // listen for touchend events
    document.documentElement.addEventListener("touchend", event => {
        // get location of end touch
        const endClientX = event.changedTouches[0].clientX;
        const endClientY = event.changedTouches[0].clientY;

        // calculate gesture movement on X and Y as percentage of page size
        const percentageMoveX = ((endClientX - startClientX) / width) * 100;
        const percentageMoveY = ((endClientY - startClientY) / height) * 100;

        if (
            config.enableVerticalGestures &&
            window.scrollY === 0 && // if the window is at the top
            percentageMoveY > 0 && // and movement on Y is downwards
            Math.abs(percentageMoveX) < config.verticalThresholdMoveX && // and movemenent on X is maximum verticalThresholdMoveX
            Math.abs(percentageMoveY) >= config.verticalThresholdMoveY // and movement on Y is minimum verticalThresholdMoveY
        ) {
            // reload the page and force refresh the cache
            window.location.reload(true);
        } else if (
            config.enableHorizontalGestures &&
            endClientX >= width * 0.9 && // movement is finished at the right margin of the screen
            percentageMoveX > 0 && // move on X is left to right
            Math.abs(percentageMoveX) >= config.horizontalThresholdMoveX && // and movement on X is minimum 10
            Math.abs(percentageMoveY) <= config.horizontalThresholdMoveY // and movement on Y is maximum 10
        ) {
            config.invertHorizontalGestures
                ? window.history.forward()
                : window.history.back();
        } else if (
            config.enableHorizontalGestures &&
            endClientX <= width * 0.1 && // movement is finished at the left margin of the screen
            percentageMoveX < 0 && // move on X is right to left
            Math.abs(percentageMoveX) >= config.horizontalThresholdMoveX && // and movement on X is minimum 10
            Math.abs(percentageMoveY) <= config.horizontalThresholdMoveY // and movement on Y is maximum 10
        ) {
            config.invertHorizontalGestures
                ? window.history.back()
                : window.history.forward();
        }
    });
}

function init() {
    migrateConfiguration().then(() => {
        const data = browser.storage.sync.get("settings");
        data.then(onGot, onError);
    });
}

document.addEventListener("DOMContentLoaded", init);
