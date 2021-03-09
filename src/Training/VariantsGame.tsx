import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Key } from 'ts-key-enum';
import { CenteredContainer } from '../common-styles';
import { EmojiContainer } from '../components/EmojiContainer';
import { useCountdown } from '../hooks/useCountdown';
import { useDictionary } from '../hooks/useDictionary';
import { useKeyPress } from '../hooks/useKeyPress';
import { theme } from '../theme';
import { Word, TestResult, GameStates, EstonianLevels } from '../types';
import { getRandomElement, pseudoShuffle } from '../utils';
import { Variant } from './Variant';

const TrainingContainer = styled(CenteredContainer)`
	flex-direction: column;
	background-color: ${(props) => props.color};
`;

const TestWordContainer = styled.div`
	font-size: 42px;
	padding-bottom: 24px;
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

export function VariantsGame() {
	const { level } = useParams<{ level: EstonianLevels }>();

	const { words, loading } = useDictionary(level);

	const { countdown, active } = useCountdown(60);

	const [wonPoints, setWonPoints] = React.useState(0);
	const [lostPoints, setLostPoints] = React.useState(0);
	const [result, setResult] = React.useState(TestResult.ONGOING);
	const [gameState, setGameState] = React.useState(GameStates.INIT);

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
			setGameState(GameStates.IN_PROGRESS);
			setTranslation(getRandomElement(word.ruTranslations));
			const variants = pseudoShuffle(getVariants(word, words));
			setVariants(variants);
			setCurrentVariant(Math.ceil(variants.length / 2) - 1);
			setResult(TestResult.ONGOING);
		}
	}, [word]);

	React.useEffect(() => {
		if (result === TestResult.SUCCESS) {
			setWonPoints((points) => points + 1);
		}
		if (result === TestResult.FAILURE) {
			setLostPoints((points) => points + 1);
		}
		if ([TestResult.SUCCESS, TestResult.FAILURE].includes(result)) {
			const timeout = setTimeout(() => setWord(getRandomElement(words)), 3000);
			return () => clearTimeout(timeout);
		}
	}, [result]);

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
			setGameState(GameStates.ROUND_OVER);
		}
	}, [leftArrowPressed, rightArrowPressed, downArrowPressed, spacePressed]);

	if (loading || !words.length || !word) {
		return <CenteredContainer>'Loading...'</CenteredContainer>;
	}

	return (
		<TrainingContainer>
			<p>{countdown}</p>
			<PointsContainer>
				<Points color={theme.successColor}>{wonPoints}</Points>

				<Points color={theme.failureColor}>{lostPoints}</Points>
			</PointsContainer>
			{active ? (
				<>
					<TestWordContainer>{translation}</TestWordContainer>

					<VariantsContainer>
						{variants.map((variant) => (
							<Variant
								key={variant.id}
								variant={variant}
								onClick={() => {
									setResult(getTestResult(variant, word));
									setGameState(GameStates.ROUND_OVER);
								}}
								isCurrent={variant.esInitial === variants[currentVariant].esInitial}
								isRight={variant.esInitial === word.esInitial}
								gameState={gameState}
							/>
						))}
					</VariantsContainer>

					<Result result={result} />

					<button onClick={() => setWord(getRandomElement(words))}>next</button>
				</>
			) : null}
		</TrainingContainer>
	);
}
