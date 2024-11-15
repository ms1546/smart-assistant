import { fireEvent, render, screen, act, within } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ response: "Hello, world!" }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders input and button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  test("sends message and displays response", async () => {
    render(<App />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Ask me anything..."), {
        target: { value: "Hi" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Send/i }));
    });

    const responseContainer = screen.getByText("Response:").closest("div");
    expect(responseContainer).toBeInTheDocument();

    if (responseContainer) {
      const responseText = within(responseContainer).getByText("Hello, world!");
      expect(responseText).toBeInTheDocument();
    }

    expect(global.fetch).toHaveBeenCalledWith("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hi" }),
    });
  });
});
