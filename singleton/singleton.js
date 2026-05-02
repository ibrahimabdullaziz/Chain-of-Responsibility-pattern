class SettingsManager {
    constructor() {
        // التأكد إذا كان هناك نسخة مسبقة أم لا
        if (SettingsManager.instance) {
            return SettingsManager.instance;
        }

        // البيانات الافتراضية للنسخة الوحيدة
        this.settings = {
            theme: "light",
            language: "ar",
        };

        // حفظ النسخة في خاصية ثابتة (Static) للكلاس
        SettingsManager.instance = this;
    }

    setTheme(newTheme) {
        this.settings.theme = newTheme;
    }

    getSettings() {
        return this.settings;
    }
}

// تجربة الكود:
const appSettings1 = new SettingsManager();
const appSettings2 = new SettingsManager();

appSettings1.setTheme("dark");

console.log(appSettings2.getSettings().theme); // الإخراج: "dark"
console.log(appSettings1 === appSettings2);     // الإخراج: true (هما نفس الكائن تماماً)