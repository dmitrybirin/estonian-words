import React from 'react';
import styled from 'styled-components';
import { Key } from 'ts-key-enum';
import { CenteredContainer } from './common-styles';
import { useCountdown } from './hooks/useCountdown';
import { useDictionary } from './hooks/useDictionary';
import { useKeyPress } from './hooks/useKeyPress';
import { Word } from './types';
import { getRandomElement, pseudoShuffle } from './utils';

enum TestResult {
	ONGOING,
	SUCCESS,
	FAILURE
}

const TrainingContainer = styled(CenteredContainer)`
	flex-direction: column;
`;

const EmojiContainer = styled.div`
	font-size: 72px;
`;

const TestWordContainer = styled.div`
	font-size: 42px;
	padding-bottom: 24px;
`;

const Variant = styled(CenteredContainer)`
	height: 240px;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

const VariantWord = styled.p`
	padding: 10px;
	cursor: pointer;
	font-size: 24px;
	padding: 10px;
	border: 1px solid;
`;

const VariantsContainer = styled(CenteredContainer)`
	display: flex;
	justify-content: space-between;
	width: 50vw;
`;

const Result: React.FC<{ result: TestResult }> = ({ result }) => {
	switch (result) {
		case TestResult.ONGOING:
			return <EmojiContainer>🤔</EmojiContainer>;

		case TestResult.SUCCESS:
			return <EmojiContainer>🎉</EmojiContainer>;

		case TestResult.FAILURE:
			return <EmojiContainer>😭</EmojiContainer>;

		default:
			return null;
	}
};

const getVariants = (answer: Word, words: Word[], numberOfVariants = 3) => {
	const variants = [answer];

	// TODO could use some recursive love
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const _ of Array(numberOfVariants - 1)) {
		const poolOfWords = words.filter((word) => !variants.map((variant) => variant.id).includes(word.id));

		variants.push(getRandomElement<Word>(poolOfWords));
	}

	return pseudoShuffle(variants);
};

const getTestResult = (answer: Word, currentWord: Word) => {
	if (answer.id === currentWord.id) {
		return TestResult.SUCCESS;
	} else {
		return TestResult.FAILURE;
	}
};

export function Training() {
	const { words, loading } = useDictionary('A1');

	const { counter, active } = useCountdown(5);

	const rightArrowPressed = useKeyPress(Key.ArrowRight);
	const leftArrowPressed = useKeyPress(Key.ArrowLeft);
	const downArrowPressed = useKeyPress(Key.ArrowDown);
	const spacePressed = useKeyPress(' ');

	const [result, setResult] = React.useState(TestResult.ONGOING);
	const [word, setWord] = React.useState<Word>();
	const [translation, setTranslation] = React.useState('');
	const [variants, setVariants] = React.useState<Word[]>([]);

	const [currentVariant, setCurrentVariant] = React.useState(0);

	React.useEffect(() => {
		if (rightArrowPressed) {
			setCurrentVariant((currentVariant + 1) % variants.length);
		}
		if (leftArrowPressed) {
			setCurrentVariant(currentVariant - 1 < 0 ? variants.length - 1 : currentVariant - 1);
		}
		if (downArrowPressed) {
			setWord(getRandomElement(words));
		}
		if (spacePressed && word) {
			setResult(getTestResult(variants[currentVariant], word));
		}
	}, [leftArrowPressed, rightArrowPressed, downArrowPressed, spacePressed]);

	React.useEffect(() => {
		setWord(getRandomElement<Word>(words));
	}, [words.length]);

	React.useEffect(() => {
		if (word) {
			setTranslation(getRandomElement(word.ruTranslations));
			const variants = pseudoShuffle(getVariants(word, words));
			setVariants(variants);
			setCurrentVariant(Math.ceil(variants.length / 2) - 1);
			setResult(TestResult.ONGOING);
		}
	}, [word]);

	if (loading || !words.length || !word) {
		return 'Loading...';
	}

	return (
		<TrainingContainer>
			<p>{counter}</p>
			{active ? (
				<>
					<TestWordContainer>{translation}</TestWordContainer>

					<VariantsContainer>
						{variants.map((variant) => (
							<Variant>
								<VariantWord key={variant.id} onClick={() => setResult(getTestResult(variant, word))}>
									{variant.esInitial}
								</VariantWord>
								<EmojiContainer>
									{variant.esInitial === variants[currentVariant].esInitial ? '👆' : ''}
								</EmojiContainer>
							</Variant>
						))}
					</VariantsContainer>

					<Result result={result} />

					<button onClick={() => setWord(getRandomElement(words))}>next</button>
				</>
			) : null}
		</TrainingContainer>
	);
}
