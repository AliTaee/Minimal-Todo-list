import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Test Plus and Minus state", () => {
  beforeEach(() => {
    render(<App num={10} />);
  });

  test("Initial number must be 10", () => {
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });

  test("Renders Plus button", () => {
    const plusButton = screen.getByText(/plus/i);
    expect(plusButton).toBeInTheDocument();
  });

  test("Click on Plus button and it's should show 11", () => {
    const plusButton = screen.getByText(/plus/i);
    fireEvent.click(plusButton);

    expect(screen.getByText(/11/i)).toBeInTheDocument();
  });

  test("Click two time on Plus button and it's should show 12", () => {
    const plusButton = screen.getByText(/plus/i);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);

    expect(screen.getByText(/12/i)).toBeInTheDocument();
  });

  test("Renders Minus button", () => {
    const MinusButton = screen.getByText(/minus/i);
    expect(MinusButton).toBeInTheDocument();
  });

  test("Click on Minus button and it's should show 9", () => {
    const MinusButton = screen.getByText(/minus/i);
    fireEvent.click(MinusButton);

    expect(screen.getByText(/9/i)).toBeInTheDocument();
  });
});
