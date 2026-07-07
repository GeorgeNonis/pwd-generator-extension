import manifest from "../manifest.json";

describe("keyboard shortcuts (SHORT)", () => {
  it("SHORT-01: manifest defines _execute_action with Ctrl+Shift+P", () => {
    expect(manifest.commands).toBeDefined();
    expect(manifest.commands._execute_action).toBeDefined();
    expect(manifest.commands._execute_action.suggested_key.default).toBe(
      "Ctrl+Shift+P"
    );
    expect(manifest.commands._execute_action.suggested_key.mac).toBe(
      "Command+Shift+P"
    );
  });

  it("SHORT-02: manifest defines regenerate-password command", () => {
    expect(manifest.commands["regenerate-password"]).toBeDefined();
    expect(manifest.commands["regenerate-password"].description).toMatch(
      /regenerate/i
    );
  });

  it("SHORT-02: background service worker is registered", () => {
    expect(manifest.background?.service_worker).toBe("js/background.js");
  });

  it("ICON-01: manifest references multi-size icons", () => {
    expect(manifest.icons["16"]).toBe("icons/icon-16.png");
    expect(manifest.icons["48"]).toBe("icons/icon-48.png");
    expect(manifest.icons["128"]).toBe("icons/icon-128.png");
    expect(manifest.action.default_icon?.["128"]).toBe("icons/icon-128.png");
  });
});
