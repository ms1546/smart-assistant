import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
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
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
			<h1 className="text-4xl font-bold mb-8 text-gray-800">Smart Assistant</h1>
			<form onSubmit={handleSubmit} className="flex space-x-4 w-full max-w-md">
				<Input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Say something..."
					className="flex-1"
				/>
				<Button type="submit" className="px-6">
					Send
				</Button>
			</form>
			{response && (
				<p className="mt-6 text-lg text-gray-700">
					<span className="font-semibold">Response:</span> {response}
				</p>
			)}
		</div>
	);
}

export default App;
