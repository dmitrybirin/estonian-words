import { useEffect, useState } from 'react';
import { EstonianLevels, Word } from '../types';

async function fetchDictionary(level: EstonianLevels) {
	const result = await fetch(`/data/dictionary_${level}.json`);
	const data = await result.json();
	return data;
}

export function useDictionary(level: EstonianLevels): { words: Word[]; loading: boolean } {
	const key = `dictionary_${level}`;
	const [words, setWords] = useState<Word[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const item = localStorage.getItem(key);

		if (item === null) {
			setLoading(true);
			fetchDictionary(level)
				.then((words) => {
					setWords(words);
					localStorage.setItem(key, JSON.stringify(words));
				})
				.finally(() => setLoading(false));
		} else {
			const parsedData = JSON.parse(localStorage.getItem(key) || '');
			setWords(parsedData);
		}
	}, []);

	return { words, loading };
}
