import { useState } from 'react';

//return string, transition(), back()
export default function useVisualMode(init) {
	const [mode, setMode] = useState(init);
	const [history, setHistory] = useState([init]);

	const transition = (next, replace = false) => {
		if (!replace) {
			setHistory((prev) => [...prev, next]);
		}
		setMode((prev) => next);
	};

	const back = () => {
		const temp = [...history];
		temp.pop();
		setHistory((prev) => temp);
		setMode((prev) => temp[temp.length - 1]);
	};

	return { mode, transition, back };
}
