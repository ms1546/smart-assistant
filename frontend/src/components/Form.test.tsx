import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";
import { Form } from "./Form";

describe("Form", () => {
	it("renders input and submit button", () => {
		render(<Form onSubmit={() => {}} />);
		expect(
			screen.getByPlaceholderText("Ask me anything..."),
		).toBeInTheDocument();
		expect(screen.getByText("Send")).toBeInTheDocument();
	});

	it("calls onSubmit with message", async () => {
		const onSubmit = vi.fn();
		render(<Form onSubmit={onSubmit} />);
		const input = screen.getByPlaceholderText("Ask me anything...");
		const button = screen.getByText("Send");

		await act(async () => {
			fireEvent.change(input, { target: { value: "Hello" } });
			fireEvent.click(button);
		});

		expect(onSubmit).toHaveBeenCalledWith("Hello");
	});
});
