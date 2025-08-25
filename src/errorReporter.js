/**
 * Centralized error logging utility
 * Logs to console and optionally sends to external service (future proofing)
 *
 * @param {string} context - Source or component name
 * @param {string} message - Descriptive error message
 * @param {object} [meta={}] - Optional metadata (formData, IDs, etc.)
 * @param {'info' | 'warn' | 'error'} [level='warn'] - Logging level
 */

const recentlyLogged = new Map(); // context → timestamp
const LOG_THROTTLE_MS = 3000;

// Cleanup every 10 seconds
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of recentlyLogged.entries()) {
    if (now - timestamp > LOG_THROTTLE_MS * 2) {
      recentlyLogged.delete(key);
    }
  }
}, 10000);

function reportIssue(context, message, meta = {}, level = "warn") {
  // Validate logging level
  const validLevels = ["info", "warn", "error"];
  level = validLevels.includes(level) ? level : "warn";

  const formattedMessage = `[${context}] ${message}`;
  const timestamp = new Date().toISOString();

  // Throttle identical logs to prevent spam
  const logKey = `${context}:${level}:${message}`;
  const now = Date.now();
  const lastLogged = recentlyLogged.get(logKey) || 0;

  if (now - lastLogged >= LOG_THROTTLE_MS) {
    recentlyLogged.set(logKey, now);

    // Log to console
    if (typeof console[level] === "function") {
      console[level](`[${timestamp}] ${formattedMessage}`, meta);
    } else {
      console.warn(`[${timestamp}] ${formattedMessage}`, meta);
    }
  }

  // Extract error details if present
  if (meta?.error instanceof Error) {
    const { name, message: errorMessage, stack } = meta.error;
    meta.errorDetails = {
      name,
      message: errorMessage,
      stack,
    };
    delete meta.error; // Avoid logging full Error object
  }

  // Always throw in dev to catch issues early
  if (import.meta.env?.DEV && level === "error") {
    throw new Error(formattedMessage);
  }

  // Future: send to external monitoring system (e.g., Sentry, LogRocket)
  // sendToMonitoringService({ context, message, meta, level, timestamp });

  return { context, message, meta, level, timestamp };
}

export default reportIssue;
