import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordGeneratorForm from "./passwordgenerator";
import { installChromeMock } from "../../test-utils/chromeMock";
import { renderWithProviders } from "../../test-utils/render";

describe("PasswordGeneratorForm (UI-GEN)", () => {
  const onGeneratePassword = jest.fn();

  beforeEach(() => {
    installChromeMock();
    onGeneratePassword.mockClear();
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  it("UI-GEN-01: renders length control and character toggles", () => {
    renderWithProviders(
      <PasswordGeneratorForm onGeneratePassword={onGeneratePassword} />
    );

    expect(screen.getByLabelText(/^length$/i)).toBeInTheDocument();
    expect(screen.getByText(/uppercase/i)).toBeInTheDocument();
    expect(screen.getByText(/lowercase/i)).toBeInTheDocument();
    expect(screen.getByText(/numbers/i)).toBeInTheDocument();
    expect(screen.getByText(/symbols/i)).toBeInTheDocument();
  });

  it("UI-GEN-06: strength bars hidden when toggled off", async () => {
    renderWithProviders(
      <PasswordGeneratorForm onGeneratePassword={onGeneratePassword} />
    );

    await userEvent.click(screen.getByText(/show strength indicator/i));

    expect(screen.queryByLabelText(/password strength/i)).not.toBeInTheDocument();
  });

  it("UI-GEN-07: strength bars appear after generate", async () => {
    renderWithProviders(
      <PasswordGeneratorForm onGeneratePassword={onGeneratePassword} />
    );

    await userEvent.click(
      screen.getByRole("button", { name: /generate password/i })
    );

    expect(screen.getByLabelText(/password strength/i)).toBeInTheDocument();
    expect(onGeneratePassword).toHaveBeenCalledWith(expect.any(String));
  });
});
