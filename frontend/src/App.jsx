import React, { useState } from "react";
import { Button } from "shadcn-ui/button";

function App() {
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const backendEndpoint = "";
		const res = await fetch(backendEndpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message }),
		});
		const data = await res.json();
		setResponse(data.response);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
			<h1 className="text-2xl font-bold mb-4">Smart Assistant</h1>
			<form onSubmit={handleSubmit} className="flex space-x-2">
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Say something..."
					className="border p-2 rounded-md"
				/>
				<Button type="submit">Send</Button>
			</form>
			<p className="mt-4">Response: {response}</p>
		</div>
	);
}

export default App;
