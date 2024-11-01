import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function App() {
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

	const customButtonClass = buttonVariants({ variant: "outline", size: "lg" });

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-6">
			<h1 className="text-4xl font-extrabold mb-8 text-blue-700">
				Smart Assistant
			</h1>
			<form
				onSubmit={handleSubmit}
				className="flex space-x-4 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
			>
				<Input
					type="text"
					value={message}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setMessage(e.target.value)
					}
					placeholder="Ask me anything..."
					className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
				/>
				<Button
					type="submit"
					className={`px-6 py-2 ${customButtonClass} text-blue-600 font-semibold hover:bg-blue-700 transition-colors`}
				>
					Send
				</Button>
			</form>
			{response && (
				<div className="mt-6 max-w-lg bg-blue-50 p-4 rounded-lg shadow text-blue-700">
					<p className="text-lg">
						<span className="font-semibold">Response:</span> {response}
					</p>
				</div>
			)}
		</div>
	);
}

export default App;
