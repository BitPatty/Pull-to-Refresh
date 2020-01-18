function showSavedMsg() {
    el = document.querySelector("#savedMsg");
    el.style.display = "inline";
    setTimeout(() => {
        el.style.display = "none";
    }, 1500);
}

/**
 * Checkbox event listener
 * Enables or disables a fieldset based on the checkbox values
 * @param {*} e checkbox change event
 */
function toggleFieldset(e) {
    if (e && e.target) {
        const fieldsetId = e.target.getAttribute("data-toggle");

        if (fieldsetId)
            document.querySelector(`#${fieldsetId}`).disabled = !e.target
                .checked;
    }
}

/**
 * Stores the configuration
 * @param {*} config
 */
async function saveConfiguration(config) {
    await browser.storage.sync.set({
        settings: config
    });
}

/**
 * Save the current configuration
 * @param {*} sender sender
 */
async function saveOptions(sender = null) {
    if (sender) {
        sender.preventDefault();
        sender.disabled = true;
    }

    try {
        const storage = await browser.storage.sync.get("settings");
        const config = storage.settings || {};

        document.querySelectorAll("form input[type=number]").forEach(e => {
            config[e.id] = +(e.value || e.getAttribute("placeholder"));
        });

        document.querySelectorAll("form input[data-toggle]").forEach(e => {
            config[e.id] = e.checked;
        });

        await saveConfiguration(config);
        showSavedMsg();
    } catch (err) {
        throw err;
    } finally {
        if (sender) {
            sender.disabled = false;
        }
    }
}

/**
 * Adds input event listeners
 */
function addListeners() {
    document.querySelector("form").addEventListener("submit", saveOptions);

    document
        .querySelectorAll("input[data-toggle]")
        .forEach(e => e.addEventListener("change", toggleFieldset));
}

/**
 * Restores the stored configuration
 */
async function restore() {
    await migrateConfiguration();
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

    browser.storage.sync.get("settings").then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restore);
