import pwdsReducer, {
  changeCompo,
  clearHistorry,
  excludeAmbiguousHandler,
  historyHandler,
  historyPush,
  setPasswords,
  themeHandler,
} from "./pwds-slice";

describe("pwds slice (REDUX)", () => {
  const initial = {
    component: "generator",
    history: false,
    pwds: [] as string[],
    theme: "dark" as const,
    excludeAmbiguous: false,
  };

  it("REDUX-01: changeCompo updates component", () => {
    const state = pwdsReducer(initial, changeCompo({ comp: "history" }));
    expect(state.component).toBe("history");
  });

  it("REDUX-02: historyHandler updates history", () => {
    const state = pwdsReducer(initial, historyHandler({ history: true }));
    expect(state.history).toBe(true);
  });

  it("REDUX-03: setPasswords replaces pwds", () => {
    const state = pwdsReducer(
      initial,
      setPasswords({ pwds: ["a", "b"] })
    );
    expect(state.pwds).toEqual(["a", "b"]);
  });

  it("REDUX-04: historyPush appends password", () => {
    const state = pwdsReducer(
      { ...initial, pwds: ["x"] },
      historyPush({ pwd: "y" })
    );
    expect(state.pwds).toEqual(["x", "y"]);
  });

  it("REDUX-05: clearHistorry empties pwds", () => {
    const state = pwdsReducer(
      { ...initial, pwds: ["a", "b"] },
      clearHistorry()
    );
    expect(state.pwds).toEqual([]);
  });

  it("REDUX-06: themeHandler updates theme", () => {
    const state = pwdsReducer(initial, themeHandler({ theme: "light" }));
    expect(state.theme).toBe("light");
  });

  it("REDUX-07: excludeAmbiguousHandler updates excludeAmbiguous", () => {
    const state = pwdsReducer(
      initial,
      excludeAmbiguousHandler({ excludeAmbiguous: true })
    );
    expect(state.excludeAmbiguous).toBe(true);
  });
});
