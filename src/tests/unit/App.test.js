import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import initialTodoList from "../../model/init-data";
import App from "../../App";

describe("Test Todo list with initial data", () => {
  beforeEach(() => {
    render(<App todo={initialTodoList} />);
  });

  test("Must have 2 note on list", () => {
    expect(screen.getByText(initialTodoList[0].title)).toBeInTheDocument();
    expect(screen.getByText(initialTodoList[1].title)).toBeInTheDocument();
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
    expect(
      screen.queryByText(initialTodoList[0].title)
    ).not.toBeInTheDocument();
    expect(screen.getByText(initialTodoList[1].title)).toBeInTheDocument();
  });

  test("There must be Button to add note to list", () => {
    const addButton = screen.getByText(/add to list/i);
    expect(addButton).toBeInTheDocument();
  });

  test("Add new note by click on submit button", () => {
    fireEvent.change(screen.getByPlaceholderText(/add a new note/i), {
      target: { value: "learning unit testing" },
    });
    fireEvent.click(screen.getByText(/add to list/i));
    expect(screen.getByText("learning unit testing")).toBeInTheDocument();
  });

  test("Add new note by Keypress Enter", () => {
    fireEvent.change(screen.getByPlaceholderText(/add a new note/i), {
      target: { value: "learning e2e testing" },
    });
    fireEvent.keyPress(screen.getByPlaceholderText(/add a new note/i), {
      key: "Enter",
      code: 13,
      charCode: 13,
    });
    expect(screen.getByText("learning e2e testing")).toBeInTheDocument();
  });

  test("Shoud not add empty note when input is empty and show error", () => {
    fireEvent.change(screen.getByPlaceholderText(/add a new note/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText(/add to list/i));
    expect(screen.getByText(/You can't add empty note!/i)).toBeInTheDocument();
  });
});

describe("Test todo list with no initial data!", () => {
  beforeEach(() => {
    render(<App todo={[]} />);
  });

  test("There must be a proper massege to show", () => {
    expect(screen.getByText(/There is nothing todo!/i)).toBeInTheDocument();
  });
});
