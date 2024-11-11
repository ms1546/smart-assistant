import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FormProps {
	onSubmit: (message: string) => Promise<void>;
}

export function Form({ onSubmit }: FormProps) {
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await onSubmit(message);
		setMessage("");
	};

	const customButtonClass = buttonVariants({ variant: "outline", size: "lg" });

	return (
		<form
			onSubmit={handleSubmit}
			className="flex space-x-4 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
		>
			<Input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
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
	);
}
