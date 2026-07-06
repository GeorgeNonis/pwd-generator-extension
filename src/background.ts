const REGENERATE_COMMAND = "regenerate-password";

chrome.commands.onCommand.addListener((command) => {
  if (command === REGENERATE_COMMAND) {
    chrome.runtime.sendMessage({ type: "REGENERATE_PASSWORD" });
  }
});

export {};
