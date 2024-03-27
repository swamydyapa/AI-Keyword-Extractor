import { Button, Textarea, useToast } from "@chakra-ui/react";

import { useState } from "react";

const TextInput = ({ extractKeywords }) => {
	const [text, setText] = useState("");

	const toast = useToast();

	const submitText = () => {
		if (text === "") {
			toast({
				title: "Text field is empty.",
				description: "Please enter some text to extract keywords.",
				status: "error",
				duration: 5000,
				isClosable: false,
			});
		} else {
			extractKeywords(text);
		}
	};
	return (
		<>
			<Textarea
				bg="green.50"
				color="black"
				padding={4}
				marginTop={6}
				height={200}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<Button
				bg="teal.500"
				color="white"
				marginTop={4}
				width="100%"
				_hover={{ bg: "teal.100", color: "black" }}
				onClick={submitText}>
				Extract Keywords
			</Button>
		</>
	);
};

export default TextInput;
