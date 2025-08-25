# 🚀 Robust Toast Notifications

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://abdullah-ayyash.github.io/robust-toast-notifications)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**The Last Toast Library You'll Ever Need** ✨

A production-ready notification system that actually works in real applications. Built with bulletproof validation, smart duplicate prevention, automatic cleanup, and comprehensive error reporting.

## 🎯 [Try the Live Demo](https://abdullah-ayyash.github.io/robust-toast-notifications)

## 🤔 Why Another Toast Library?

Most toast libraries break in production when you pass invalid data, spam users with duplicates, or leak memory. This one doesn't.

| Feature              | This Library   | Basic Bootstrap | Toastr.js    |
| -------------------- | -------------- | --------------- | ------------ |
| Input Validation     | ✅ Bulletproof | ❌ None         | ⚠️ Basic     |
| Duplicate Prevention | ✅ Smart       | ❌ None         | ❌ None      |
| Memory Management    | ✅ Automatic   | ⚠️ Manual       | ⚠️ Manual    |
| Error Reporting      | ✅ Built-in    | ❌ None         | ❌ None      |
| Production Ready     | ✅ Yes         | ❌ Fragile      | ⚠️ Sometimes |

## 🚀 Quick Start

### 1. Add Bootstrap to your HTML

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

### 2. Download and import the notification service

```html
<script type="module">
  import notificationService from "./src/notificationService.js";

  // Use it immediately!
  notificationService.success("🎉 It works!");
</script>
```

### 3. That's it!

No npm install, no build process, no configuration. Just works!

## ✨ Features

### 🛡️ Bulletproof Validation

```javascript
// These all work safely - no crashes!
notificationService.showToast(""); // ✅ Shows fallback message
notificationService.showToast("Hi", "fake"); // ✅ Uses 'warning' instead
notificationService.showToast("Hi", "info", -100); // ✅ Uses 5000ms instead
```

### 🎯 Smart Duplicate Prevention

```javascript
notificationService.success("Data saved!");
notificationService.success("Data saved!"); // ✅ Blocked automatically
// User sees only one notification, no spam!
```

### 🧹 Automatic Cleanup

- DOM elements removed when toasts hide
- Empty containers automatically deleted
- Event listeners properly cleaned up
- Zero memory leaks

### 📊 Built-in Error Reporting

All validation issues and errors are logged with context:

```javascript
// Check your console for detailed error reports
[NotificationService] Invalid toast type: fake-type. Defaulting to 'warning'
```

Perfect for integration with monitoring tools like Sentry.

## 🎛️ API Reference

### `notificationService.showToast(message, type, timeout)`

- **message** (string): The notification text
- **type** (string): 'success', 'danger', 'warning', 'info', 'primary', 'secondary'
- **timeout** (number): Auto-hide delay in milliseconds

### Convenience Methods

- `notificationService.success(message, timeout)`
- `notificationService.error(message, timeout)`
- `notificationService.warning(message, timeout)`
- `notificationService.info(message, timeout)`

## 📁 File Structure

```
robust-toast-notifications/
├── src/
│   ├── notificationService.js  # Main notification system
│   └── errorReporter.js        # Error logging utility
├── demo/
│   └── index.html             # Live demo page
└── README.md
```

## 🔧 Advanced Usage

### Custom Error Handling

```javascript
import reportIssue from "./src/errorReporter.js";

// Use the same error reporting system in your code
reportIssue("MyComponent", "Something went wrong", { userId: 123 }, "error");
```

### Integration with Monitoring Tools

The error reporter is designed to integrate with services like Sentry:

```javascript
// Modify errorReporter.js to send to your monitoring service
function reportIssue(context, message, meta, level) {
  // ... existing code ...

  // Add your monitoring integration
  Sentry.captureMessage(`[${context}] ${message}`, level);
}
```

## 🤝 Contributing

Contributions welcome! This library is intentionally simple and focused. Please:

- Keep it lightweight
- Maintain the bulletproof philosophy
- Add tests for new features
- Update the demo

## 📄 License

MIT - use it however you want!

## ⭐ Like it?

If this library saved you from toast-related bugs, give it a star! ⭐
