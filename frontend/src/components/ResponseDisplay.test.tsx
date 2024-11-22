import { render, screen } from "@testing-library/react";
import { ResponseDisplay } from "./ResponseDisplay";

describe("ResponseDisplay", () => {
	it("renders response text", () => {
		const response = "This is a response";
		render(<ResponseDisplay response={response} />);

		expect(
			screen.getByText((content, element) => {
				return (
					element?.tagName.toLowerCase() === "p" &&
					element.textContent === "Response: This is a response"
				);
			}),
		).toBeInTheDocument();
	});

	it("does not render when response is empty", () => {
		const { container } = render(<ResponseDisplay response="" />);
		expect(container.firstChild).toBeNull();
	});
});
