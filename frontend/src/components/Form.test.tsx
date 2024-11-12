import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "./Form";
import { vi } from "vitest";

describe("Form", () => {
	it("renders input and submit button", () => {
		render(<Form onSubmit={() => {}} />);
		expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
		expect(screen.getByText("Send")).toBeInTheDocument();
	});

	it("calls onSubmit with message", () => {
		const onSubmit = vi.fn();
		render(<Form onSubmit={onSubmit} />);
		const input = screen.getByPlaceholderText("Ask me anything...");
		const button = screen.getByText("Send");

		fireEvent.change(input, { target: { value: "Hello" } });
		fireEvent.click(button);

		expect(onSubmit).toHaveBeenCalledWith("Hello");
	});
});
