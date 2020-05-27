import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Test Plus and Minus state", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Initial number must be 0", () => {
    expect(screen.getByText(/0/i)).toBeInTheDocument();
  });

  test("Renders Plus button", () => {
    const plusButton = screen.getByText(/plus/i);
    expect(plusButton).toBeInTheDocument();
  });

  test("Click on Plus button and it's should show 1", () => {
    const plusButton = screen.getByText(/plus/i);
    fireEvent.click(plusButton);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  test("Click two time on Plus button and it's should show 2", () => {
    const plusButton = screen.getByText(/plus/i);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);

    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  test("Renders Minus button", () => {
    const MinusButton = screen.getByText(/minus/i);
    expect(MinusButton).toBeInTheDocument();
  });

  test("Click on Minus button and it's should show -1", () => {
    const MinusButton = screen.getByText(/minus/i);
    fireEvent.click(MinusButton);

    expect(screen.getByText(/-1/i)).toBeInTheDocument();
    screen.debug();
  });
});
