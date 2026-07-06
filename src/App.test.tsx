import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { installChromeMock } from "./test-utils/chromeMock";
import { renderWithProviders } from "./test-utils/render";

describe("App integration", () => {
  beforeEach(() => {
    installChromeMock();
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  it("UI-NAV-01: renders shell with title and tabs", () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("heading", { name: /password generator/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "generator" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "history" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "settings" })).toBeInTheDocument();
  });

  it("UI-GEN-02 / UI-GEN-03: generates password shown once", async () => {
    renderWithProviders(<App />);

    await userEvent.click(
      screen.getByRole("button", { name: /generate password/i })
    );

    const passwordField = screen.getByLabelText(
      /generated password/i
    ) as HTMLInputElement;

    expect(passwordField.value.length).toBeGreaterThan(0);
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });

  it("UI-GEN-04 / UI-GEN-05: copy shows feedback", async () => {
    renderWithProviders(<App />);

    await userEvent.click(
      screen.getByRole("button", { name: /generate password/i })
    );
    await userEvent.click(screen.getByRole("button", { name: /^copy$/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/copied/i);
    });
  });

  it("UI-NAV-02: switches to settings tab", async () => {
    renderWithProviders(<App />);

    await userEvent.click(screen.getByRole("button", { name: "settings" }));

    expect(
      screen.getByLabelText(/remember generated passwords/i)
    ).toBeInTheDocument();
  });

  it("HIST-01: history tab shows empty state when disabled", async () => {
    renderWithProviders(<App />);

    await userEvent.click(screen.getByRole("button", { name: "history" }));

    expect(screen.getByText(/history is disabled/i)).toBeInTheDocument();
  });

  it("THEME-03: applies theme from store to root", async () => {
    installChromeMock({ theme: "light" });

    const { container } = renderWithProviders(<App />, {
      preloadedState: { theme: "light" },
    });

    await waitFor(() => {
      expect(container.querySelector(".App")).toHaveAttribute(
        "data-theme",
        "light"
      );
    });
  });
});
