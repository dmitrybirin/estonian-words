import React, { useCallback, useState } from 'react';
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
	width: 100px;
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

const PointsContainer = styled(CenteredContainer)`
	width: 100px;
	justify-content: space-between;
`;

const Points = styled.div`
	font-size: 32px;
	color: ${(props) => props.color};
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

	const { countdown, active } = useCountdown(60);

	const [wonPoints, setWonPoints] = useState(0);
	const [lostPoints, setLostPoints] = useState(0);
	const [result, setResult] = React.useState(TestResult.ONGOING);

	const rightArrowPressed = useKeyPress(Key.ArrowRight);
	const leftArrowPressed = useKeyPress(Key.ArrowLeft);
	const downArrowPressed = useKeyPress(Key.ArrowDown);
	const spacePressed = useKeyPress(' ');

	const [word, setWord] = React.useState<Word>();
	const [translation, setTranslation] = React.useState('');
	const [variants, setVariants] = React.useState<Word[]>([]);

	const [currentVariant, setCurrentVariant] = React.useState(0);

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

	const resolveRound = useCallback(
		(result) => {
			setResult(result);
			if (result === TestResult.SUCCESS) setWonPoints((points) => points + 1);
			if (result === TestResult.FAILURE) setLostPoints((points) => points + 1);
		},
		[result]
	);

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
			resolveRound(getTestResult(variants[currentVariant], word));
		}
	}, [leftArrowPressed, rightArrowPressed, downArrowPressed, spacePressed]);

	if (loading || !words.length || !word) {
		return 'Loading...';
	}

	return (
		<TrainingContainer>
			<p>{countdown}</p>
			<PointsContainer>
				<Points color="green">{wonPoints}</Points>

				<Points color="red">{lostPoints}</Points>
			</PointsContainer>
			{active ? (
				<>
					<TestWordContainer>{translation}</TestWordContainer>

					<VariantsContainer>
						{variants.map((variant) => (
							<Variant>
								<VariantWord
									key={variant.id}
									onClick={() => resolveRound(getTestResult(variant, word))}
								>
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
