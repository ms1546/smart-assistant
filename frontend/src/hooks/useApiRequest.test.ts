import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useApiRequest } from "./useApiRequest";

describe("useApiRequest", () => {
	beforeEach(() => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ response: "Mocked response" }),
			}),
		) as vi.Mock;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("sends message and sets response", async () => {
		const { result } = renderHook(() => useApiRequest());

		await act(async () => {
			await result.current.sendMessage("Hello");
		});

		expect(result.current.response).toBe("Mocked response");
		expect(global.fetch).toHaveBeenCalledWith("", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: "Hello" }),
		});
	});
});
