import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Settings from "./settings";
import { installChromeMock } from "../../test-utils/chromeMock";
import { renderWithProviders } from "../../test-utils/render";

describe("Settings (SET)", () => {
  it("SET-01: checkbox reflects history state", () => {
    installChromeMock({ history: true });
    renderWithProviders(<Settings />, { preloadedState: { history: true } });

    expect(
      screen.getByLabelText(/remember generated passwords/i)
    ).toBeChecked();
  });

  it("SET-02: toggling history persists to chrome storage", async () => {
    const chromeMock = installChromeMock({ history: false });

    renderWithProviders(<Settings />, { preloadedState: { history: false } });

    await userEvent.click(
      screen.getByLabelText(/remember generated passwords/i)
    );

    expect(chromeMock.storage.sync.set).toHaveBeenCalledWith(
      { history: true },
      expect.any(Function)
    );
  });

  it("SET-03: shows security notice", () => {
    installChromeMock();
    renderWithProviders(<Settings />);

    expect(screen.getByRole("note")).toHaveTextContent(/chrome sync storage/i);
  });

  it("SET-04 / SET-05: exclude ambiguous toggle reflects and persists", async () => {
    const chromeMock = installChromeMock({ excludeAmbiguous: false });

    renderWithProviders(<Settings />, {
      preloadedState: { excludeAmbiguous: false },
    });

    const toggle = screen.getByLabelText(/exclude ambiguous characters/i);
    expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);

    expect(chromeMock.storage.sync.set).toHaveBeenCalledWith(
      { excludeAmbiguous: true },
      expect.any(Function)
    );
  });

  it("THEME-01 / THEME-02: theme toggle reflects and persists", async () => {
    const chromeMock = installChromeMock({ theme: "dark" });

    renderWithProviders(<Settings />, { preloadedState: { theme: "dark" } });

    const toggle = screen.getByLabelText(/light theme/i);
    expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);

    expect(chromeMock.storage.sync.set).toHaveBeenCalledWith(
      { theme: "light" },
      expect.any(Function)
    );
  });
});
