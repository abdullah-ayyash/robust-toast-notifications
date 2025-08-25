import reportIssue from "./errorReporter.js";

const DEFAULT_TYPES = [
  "success",
  "danger",
  "warning",
  "info",
  "primary",
  "secondary",
];

function showToast(message, type = "warning", timeout = 5000) {
  // Validate message
  if (typeof message !== "string" || message.trim() === "") {
    reportIssue(
      "NotificationService",
      "Toast message must be a non-empty string",
      { providedMessage: message },
      "warn"
    );
    message = "⚠️ Something went wrong.";
  }

  // Validate type
  if (!DEFAULT_TYPES.includes(type)) {
    reportIssue(
      "NotificationService",
      `Invalid toast type: ${type}. Defaulting to 'warning'`,
      { providedType: type, validTypes: DEFAULT_TYPES },
      "warn"
    );
    type = "warning";
  }

  // Validate timeout
  if (typeof timeout !== "number" || timeout <= 0) {
    reportIssue(
      "NotificationService",
      `Invalid timeout: ${timeout}. Defaulting to 5000ms`,
      { providedTimeout: timeout },
      "warn"
    );
    timeout = 5000;
  }

  // Ensure toast wrapper exists
  let toastWrapper = document.getElementById("toast-wrapper");
  if (!toastWrapper) {
    toastWrapper = document.createElement("div");
    toastWrapper.id = "toast-wrapper";
    toastWrapper.className =
      "toast-container position-fixed bottom-0 end-0 p-3";
    toastWrapper.style.zIndex = "1100";
    document.body.appendChild(toastWrapper);
  }

  // Prevent duplicate messages
  const existingToasts = toastWrapper.querySelectorAll(".toast-body");
  const isDuplicate = Array.from(existingToasts).some(
    (el) => el.textContent === message
  );

  if (isDuplicate) {
    reportIssue(
      "NotificationService",
      "Duplicate toast message detected. Skipping to prevent UI spam.",
      { duplicateMessage: message },
      "info"
    );
    return null; // Return null to indicate no toast was created
  }

  const toastId = `toast-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
  const toastHtml = `
        <div id="${toastId}" class="toast fade align-items-center text-bg-${type} border-0 mb-2" 
             role="status" aria-live="polite" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                        data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

  try {
    toastWrapper.insertAdjacentHTML("beforeend", toastHtml);
    const toastElement = document.getElementById(toastId);
    const toast = new window.bootstrap.Toast(toastElement, { delay: timeout });

    toast.show();

    // Cleanup when toast is hidden
    toastElement.addEventListener("hidden.bs.toast", () => {
      toastElement.remove();
      // Remove wrapper if no toasts remain
      if (toastWrapper.children.length === 0) {
        toastWrapper.remove();
      }
    });

    return { toastId, element: toastElement, toast };
  } catch (error) {
    reportIssue(
      "NotificationService",
      "Failed to render toast notification",
      {
        error,
        message,
        type,
        timeout,
        toastId,
      },
      "error"
    );
    return null;
  }
}

const notificationService = {
  showToast,
  success: (message, timeout) => showToast(message, "success", timeout),
  error: (message, timeout) => showToast(message, "danger", timeout),
  warning: (message, timeout) => showToast(message, "warning", timeout),
  info: (message, timeout) => showToast(message, "info", timeout),
  primary: (message, timeout) => showToast(message, "primary", timeout),
  secondary: (message, timeout) => showToast(message, "secondary", timeout),
};

export default notificationService;
