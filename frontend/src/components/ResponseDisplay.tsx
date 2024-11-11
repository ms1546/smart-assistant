interface ResponseDisplayProps {
	response: string;
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
	return response ? (
		<div className="mt-6 max-w-lg bg-blue-50 p-4 rounded-lg shadow text-blue-700">
			<p className="text-lg">
				<span className="font-semibold">Response:</span> {response}
			</p>
		</div>
	) : null;
}
