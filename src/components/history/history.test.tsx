import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import History from "./history";
import { installChromeMock } from "../../test-utils/chromeMock";
import { renderWithProviders } from "../../test-utils/render";
import * as exportHistory from "../../lib/exportHistory";

describe("History (HIST)", () => {
  beforeEach(() => {
    installChromeMock();
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  it("HIST-01: shows disabled message when history off", () => {
    renderWithProviders(<History />, { preloadedState: { history: false } });
    expect(screen.getByText(/history is disabled/i)).toBeInTheDocument();
  });

  it("HIST-02: lists stored passwords", () => {
    renderWithProviders(<History />, {
      preloadedState: { history: true, pwds: ["abc123", "xyz789"] },
    });

    expect(screen.getByText("abc123")).toBeInTheDocument();
    expect(screen.getByText("xyz789")).toBeInTheDocument();
  });

  it("HIST-03: clear history empties list", async () => {
    const chromeMock = installChromeMock({ history: true, pwds: ["a"] });

    const { store } = renderWithProviders(<History />, {
      preloadedState: { history: true, pwds: ["a"] },
    });

    await userEvent.click(screen.getByRole("button", { name: /^clear$/i }));

    expect(store.getState().pwds.pwds).toEqual([]);
    expect(chromeMock.storage.sync.set).toHaveBeenCalledWith(
      { pwds: [] },
      expect.any(Function)
    );
  });

  it("HIST-04: copy all writes joined passwords", async () => {
    renderWithProviders(<History />, {
      preloadedState: { history: true, pwds: ["one", "two"] },
    });

    await userEvent.click(screen.getByRole("button", { name: /copy all/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("one,two");
  });

  it("HIST-05 / HIST-06: row copy button copies single password", async () => {
    renderWithProviders(<History />, {
      preloadedState: { history: true, pwds: ["secret99"] },
    });

    await userEvent.click(screen.getByRole("button", { name: /copy secret99/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("secret99");
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /^copied$/i })).toBeInTheDocument();
    });
  });

  it("EXPORT-01: export downloads txt with one password per line", async () => {
    const downloadSpy = jest
      .spyOn(exportHistory, "downloadTextFile")
      .mockImplementation(() => {});

    renderWithProviders(<History />, {
      preloadedState: { history: true, pwds: ["one", "two"] },
    });

    await userEvent.click(screen.getByRole("button", { name: /^export$/i }));

    expect(downloadSpy).toHaveBeenCalledWith("one\ntwo", "password-history.txt");
    downloadSpy.mockRestore();
  });

  it("EXPORT-02: export not shown when history empty", () => {
    renderWithProviders(<History />, {
      preloadedState: { history: true, pwds: [] },
    });

    expect(screen.queryByRole("button", { name: /^export$/i })).not.toBeInTheDocument();
  });
});
