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
            tresholdMoveX: document.querySelector("#tresholdMoveX").value,
            tresholdMoveY: document.querySelector("#tresholdMoveY").value
        }
    });
    showSavedMsg()
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#tresholdMoveX").value = result.tresholdMoveX || 5;
        document.querySelector("#tresholdMoveY").value = result.tresholdMoveY || 50;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var settings = browser.storage.sync.get('settings');
    settings.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);