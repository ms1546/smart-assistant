import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

describe("App", () => {
  test("renders input and button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Say something...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  test("sends message and displays response", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ response: "Hello, world!" }),
      })
    );

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Say something..."), {
      target: { value: "Hi" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Send/i }));

    const responseElement = await screen.findByText(/Response: Hello, world!/i);
    expect(responseElement).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hi" }),
    });
  });
});
