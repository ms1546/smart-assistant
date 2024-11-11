import { useState } from "react";

export function useApiRequest() {
	const [response, setResponse] = useState("");

	const sendMessage = async (message: string) => {
		const backendEndpoint = '';
		try {
			const res = await fetch(backendEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			setResponse(data.response);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	return { response, sendMessage };
}
