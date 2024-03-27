import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TextInput from "./components/TextInput";

import { Box, Container } from "@chakra-ui/react";
import KeywordsModel from "./components/KeywordsModel";

const App = () => {
	const [keywords, setKeywords] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const extractKeywords = async (text) => {
		setLoading(true);
		setIsOpen(true);

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: "gpt-3.5-turbo-1106",
				prompt:
					"Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n" +
					text +
					"",
				temperature: 0.5,
				max_tokens: 60,
				top_p: 1.0,
				frequency_penalty: 0.8,
				presence_penalty: 0.0,
			}),
		};

		try {
			const response = await fetch(
				import.meta.env.VITE_OPENAI_API_URL,
				options
			);
			const json = await response.json();

			if (json.error) {
				// Handle API error
				console.error("API error:", json.error.message);
				// Set keywords to an empty string or any appropriate default value
				setKeywords("");
			} else if (json.choices && json.choices.length > 0) {
				setKeywords(json.choices[0].text.trim());
			} else {
				console.error(
					"Invalid response data: json.choices is undefined or empty"
				);
				setKeywords("");
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};
	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<Box bg="gray.800" color="gray.400" height="100vh" pt={130}>
			<Container maxW="3xl" centerContent>
				<Header />
				<TextInput extractKeywords={extractKeywords} />
				<Footer />
			</Container>
			<KeywordsModel
				keywords={keywords}
				isOpen={isOpen}
				loading={loading}
				closeModal={closeModal}></KeywordsModel>
		</Box>
	);
};

export default App;
