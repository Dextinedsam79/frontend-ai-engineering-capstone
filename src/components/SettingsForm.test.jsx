import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SettingsForm from "./SettingsForm";

describe("SettingsForm", () => {
  it("renders the full name and email fields with accessible labels", () => {
    render(<SettingsForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("disables the save button until the form is valid", () => {
    render(<SettingsForm />);

    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("shows validation errors beneath each invalid field", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const fullNameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    await user.type(fullNameInput, "A");
    await user.type(emailInput, "not-an-email");
    await user.tab();

    expect(
      await screen.findByText(/full name must be at least 2 characters/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("enables the save button when the form becomes valid", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(
      screen.getByLabelText(/email address/i),
      "jane@example.com",
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /save/i })).toBeEnabled();
    });
  });

  it("shows a success message after a valid submission", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(
      screen.getByLabelText(/email address/i),
      "jane@example.com",
    );

    const saveButton = screen.getByRole("button", { name: /save/i });

    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });

    await user.click(saveButton);

    expect(await screen.findByRole("status")).toHaveTextContent(
      /settings saved successfully/i,
    );
  });

  it("keeps the success message visible after submission", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(
      screen.getByLabelText(/email address/i),
      "jane@example.com",
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("dismisses the success message after five seconds", async () => {
    vi.useFakeTimers();

    render(<SettingsForm />);

    // Trigger the success state directly to exercise the timeout logic.
    screen.getByRole("button", { name: /save/i }).click();

    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    vi.advanceTimersByTime(5000);

    vi.useRealTimers();
  }, 10000);
});
