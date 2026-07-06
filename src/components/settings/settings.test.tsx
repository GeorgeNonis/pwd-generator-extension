import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Settings from "./settings";
import { installChromeMock } from "../../test-utils/chromeMock";
import { renderWithProviders } from "../../test-utils/render";

describe("Settings (SET)", () => {
  it("SET-01: checkbox reflects history state", () => {
    installChromeMock({ history: true });
    renderWithProviders(<Settings />, { preloadedState: { history: true } });

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("SET-02: toggling persists to chrome storage", async () => {
    const chromeMock = installChromeMock({ history: false });

    renderWithProviders(<Settings />, { preloadedState: { history: false } });

    await userEvent.click(screen.getByRole("checkbox"));

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
});
