import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Test Todo list", () => {
  const todoList = [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Learning React", done: false },
  ];

  beforeEach(() => {
    render(<App todo={todoList} />);
  });

  test("Must have 2 note on list", () => {
    expect(screen.getByText(todoList[0].title)).toBeInTheDocument();
    expect(screen.getByText(todoList[1].title)).toBeInTheDocument();
  });

  test("Must have 2 delete button on list", () => {
    expect(screen.getAllByText(/delete/i)).toHaveLength(2);
  });

  test("Delete a note and there must be a single note on the list", () => {
    // Get first button delete
    const firstDeleteButton = screen.getAllByText(/delete/i)[0];
    // Click!
    fireEvent.click(firstDeleteButton);
    // Check result
    expect(screen.queryByText(todoList[0].title)).not.toBeInTheDocument();
    expect(screen.getByText(todoList[1].title)).toBeInTheDocument();
  });

  test("There must be Button to add note to list", () => {
    const addButton = screen.getByText(/Add to list/i);
    expect(addButton).toBeInTheDocument();
  });

  test("Add new note", () => {
    fireEvent.change(screen.getByLabelText(/Add New note/i), {
      target: { value: "learning unit testing" },
    });
    fireEvent.click(screen.getByText(/Add to list/i));
    expect(screen.getByText("learning unit testing")).toBeInTheDocument();
  });
});
