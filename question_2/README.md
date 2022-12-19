# bito_interview - question_2

## 說明

使用 Appium + WebDriverIO + Jasmine 搭配 Android 實體機 (Pixel 6) 進行測試

## 如何開始

### 環境

- Node v18.12.1

### 執行測試

1. 透過 npm 安裝 package.json 中的套件

```bash
npm install
```

2. 調整 wdio.config.js 的測試機資訊

```javascript
exports.config = {
  ...
  // 此測試是使用 Android Pixel 6 實體機
  capabilities: [{
    platformName: "Android",
    platformVersion: "13.0",
    deviceName: "1A061FDF600EYC",
    appPackage: "com.google.android.calculator",
    appActivity: "com.android.calculator2.Calculator",
    automationName: "UiAutomator2"
  }],
  ...
}
```

3. 執行測試
```bash
npm run wdio
```