import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";
import Filter from "../components/Filter";

test("uses a prop of 'search' to display the search term in the input field", () => {
  render(<Filter search="testing" onSearchChange={() => {}} />);
  expect(screen.getByPlaceholderText(/Search/).value).toBe("testing");
});

test("calls the onSearchChange callback prop when the input is changed", () => {
  const onChange = jest.fn();
  render(<Filter search="" onSearchChange={onChange} />);
  fireEvent.change(screen.getByPlaceholderText(/Search/), {
    target: { value: "milk" },
  });
  expect(onChange).toHaveBeenCalled();
});

test("the input field acts as a controlled input", () => {
  const onChange = jest.fn();
  render(<Filter search="initial" onSearchChange={onChange} />);
  const input = screen.getByPlaceholderText(/Search/);
  expect(input.value).toBe("initial");

  fireEvent.change(input, { target: { value: "testing 123" } });
  expect(onChange).toHaveBeenCalledWith("testing 123");
});

test("the shopping list displays all items when initially rendered", () => {
  render(<App />);
  expect(screen.getByText(/Apples/)).toBeInTheDocument();
  expect(screen.getByText(/Yogurt/)).toBeInTheDocument();
  expect(screen.getByText(/String Cheese/)).toBeInTheDocument();
  expect(screen.getByText(/Lettuce/)).toBeInTheDocument();
  expect(screen.getByText(/Swiss Cheese/)).toBeInTheDocument();
});

test("the shopping filters based on the search term to include full matches", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Search/);
  fireEvent.change(input, { target: { value: "Yogurt" } });

  expect(screen.getByText("Yogurt")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
});

test("the shopping filters based on the search term to include partial matches", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Search/);
  fireEvent.change(input, { target: { value: "Cheese" } });

  expect(screen.getByText("String Cheese")).toBeInTheDocument();
  expect(screen.getByText("Swiss Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
});
