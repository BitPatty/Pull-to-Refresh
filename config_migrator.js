/**
 * Migrates the configuration
 */
async function migrateConfiguration() {
    const storage = await browser.storage.sync.get("settings");
    const config = storage.settings || {};

    if (config.version == null) {
        console.log("Migrating 'Pull-to-refresh' to version 0.11");
        config.version = "0.11";
        config.enableVerticalGestures = true;
        config.enableHorizontalGestures = true;

        if (config.verticalTresholdMoveX != null) {
            config.verticalThresholdMoveX = config.verticalTresholdMoveX;
            config.verticalThresholdMoveY = config.verticalTresholdMoveY;
            config.horizontalThresholdMoveX = config.verticalTresholdMoveY;
            config.horizontalThresholdMoveY = config.horizontalTresholdMoveY;
            config.invertHorizontalGestures = true;
        } else {
            config.verticalThresholdMoveX = 50;
            config.verticalThresholdMoveY = 5;
            config.horizontalThresholdMoveX = 50;
            config.horizontalThresholdMoveY = 5;
            config.invertHorizontalGestures = false;
        }
    }

    await browser.storage.sync.set({
        settings: config
    });
}
