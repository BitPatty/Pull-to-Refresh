function showSavedMsg() {
    el = document.querySelector("#savedMsg");
    el.style.display = "inline";
    setTimeout(() => {
        el.style.display = "none";
    }, 1500);
}

function toggleFieldset(e) {
    if (e && e.target) {
        const fieldsetId = e.target.getAttribute("data-toggle");

        if (fieldsetId)
            document.querySelector(`#${fieldsetId}`).disabled = !e.target
                .checked;
    }
}

function saveOptions(e) {
    e.preventDefault();

    const config = {};

    document.querySelectorAll("form input[type=number]").forEach(e => {
        config[e.id] = +(e.value ?? e.getAttribute("placeholder"));
    });

    document.querySelectorAll("form input[data-toggle]").forEach(e => {
        config[e.id] = e.checked;
    });

    browser.storage.sync.set({
        settings: config
    });

    showSavedMsg();
}

function restore() {
    addListeners();

    function setCurrentChoice(result) {
        document.querySelectorAll("form input[type=number]").forEach(e => {
            e.value =
                result.settings && result.settings[e.id] != null
                    ? result.settings[e.id]
                    : e.getAttribute("placeholder");
        });

        document.querySelectorAll("form input[data-toggle]").forEach(e => {
            if (result.settings && result.settings[e.id] != null) {
                e.checked = result.settings[e.id];
                e.dispatchEvent(new Event("change"));
            }
        });
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var settings = browser.storage.sync.get("settings");
    settings.then(setCurrentChoice, onError);
}

function addListeners() {
    document.querySelector("form").addEventListener("submit", saveOptions);

    document
        .querySelectorAll("input[data-toggle]")
        .forEach(e => e.addEventListener("change", toggleFieldset));
}

document.addEventListener("DOMContentLoaded", restore);
