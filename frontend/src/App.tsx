import { useApiRequest } from "@/hooks/useApiRequest";
import { Form } from "@/components/Form";
import { ResponseDisplay } from "@/components/ResponseDisplay";

function App() {
	const { response, sendMessage } = useApiRequest();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-6">
			<h1 className="text-4xl font-extrabold mb-8 text-blue-700">Smart Assistant</h1>
			<Form onSubmit={sendMessage} />
			<ResponseDisplay response={response} />
		</div>
	);
}

export default App;
