function showSavedMsg() {
    el = document.querySelector('#savedMsg')
    el.style.display = 'inline';
    setTimeout(() => {
        el.style.display = 'none';
    }, 1500);
}

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        settings: {
            verticalTresholdMoveX: document.querySelector("#verticalTresholdMoveX").value,
            verticalTresholdMoveY: document.querySelector("#verticalTresholdMoveY").value,
            horizontalTresholdMoveX: document.querySelector("#horizontalTresholdMoveX").value,
            horizontalTresholdMoveY: document.querySelector("#horizontalTresholdMoveY").value,
        }
    });
    showSavedMsg()
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#verticalTresholdMoveX").value = result.settings && result.settings.verticalTresholdMoveX 
            ? result.settings.verticalTresholdMoveX 
            : 50;
        document.querySelector("#verticalTresholdMoveY").value = result.settings && result.settings.verticalTresholdMoveY 
            ? result.settings.verticalTresholdMoveY
            : 5;

        
        document.querySelector("#horizontalTresholdMoveX").value = result.settings && result.settings.horizontalTresholdMoveX 
            ? result.settings.horizontalTresholdMoveX 
            : 5;
        document.querySelector("#horizontalTresholdMoveY").value = result.settings && result.settings.horizontalTresholdMoveY 
            ? result.settings.horizontalTresholdMoveY
            : 50;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var settings = browser.storage.sync.get('settings');
    settings.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);