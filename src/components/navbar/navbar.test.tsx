import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./navbar";
import { installChromeMock } from "../../test-utils/chromeMock";
import { renderWithProviders } from "../../test-utils/render";

describe("Navbar (UI-NAV)", () => {
  beforeEach(() => {
    installChromeMock();
  });

  it("UI-NAV-03: active tab has aria-current", () => {
    renderWithProviders(<Navbar />, {
      preloadedState: { component: "generator" },
    });

    expect(screen.getByRole("button", { name: "generator" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("UI-NAV-02: clicking tab updates store", async () => {
    const { store } = renderWithProviders(<Navbar />);

    await userEvent.click(screen.getByRole("button", { name: "settings" }));

    expect(store.getState().pwds.component).toBe("settings");
  });
});
