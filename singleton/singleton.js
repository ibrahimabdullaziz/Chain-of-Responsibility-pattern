class SettingsManager {
  constructor() {
    if (SettingsManager.instance) {
      return SettingsManager.instance;
    }

    this.settings = {
      theme: "light",
      language: "ar",
    };

    SettingsManager.instance = this;

    Object.freeze(this);
  }

  setTheme(newTheme) {
    this.settings.theme = newTheme;
  }

  getSettings() {
    return this.settings;
  }
}

const appSettings1 = new SettingsManager();
const appSettings2 = new SettingsManager();

appSettings1.setTheme("dark");

console.log(appSettings2.getSettings().theme);
console.log(appSettings1 === appSettings2);
