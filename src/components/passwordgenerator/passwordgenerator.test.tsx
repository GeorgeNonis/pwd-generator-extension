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

  it("UI-GEN-08: renders password and passphrase mode toggle", () => {
    renderWithProviders(
      <PasswordGeneratorForm onGeneratePassword={onGeneratePassword} />
    );

    expect(screen.getByRole("button", { name: /^password$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^passphrase$/i })).toBeInTheDocument();
  });

  it("UI-GEN-09: renders preset buttons in password mode", () => {
    renderWithProviders(
      <PasswordGeneratorForm onGeneratePassword={onGeneratePassword} />
    );

    expect(screen.getByRole("button", { name: /^banking$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^wifi$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^pin$/i })).toBeInTheDocument();
  });

  it("UI-GEN-10: shows word count slider in passphrase mode", async () => {
    renderWithProviders(
      <PasswordGeneratorForm onGeneratePassword={onGeneratePassword} />
    );

    await userEvent.click(screen.getByRole("button", { name: /^passphrase$/i }));

    expect(screen.getByLabelText(/^words$/i)).toBeInTheDocument();
    expect(screen.queryByText(/character sets/i)).not.toBeInTheDocument();
  });

  it("UI-GEN-11: banking preset applies length 16 and all char sets", async () => {
    renderWithProviders(
      <PasswordGeneratorForm onGeneratePassword={onGeneratePassword} />
    );

    await userEvent.click(screen.getByRole("button", { name: /^banking$/i }));

    expect(screen.getByLabelText(/^length$/i)).toHaveValue("16");
    expect(screen.getByLabelText(/uppercase/i)).toBeChecked();
    expect(screen.getByLabelText(/lowercase/i)).toBeChecked();
    expect(screen.getByLabelText(/numbers/i)).toBeChecked();
    expect(screen.getByLabelText(/symbols/i)).toBeChecked();
  });
});
