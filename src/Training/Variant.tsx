import * as React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from '../common-styles';
import { EmojiContainer } from '../components/EmojiContainer';
import { theme } from '../theme';
import { Word, GameStates } from '../types';

const VariantContainer = styled(CenteredContainer)`
	height: 240px;
	width: 100px;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	@media (max-width: 420px) {
		height: 80px;
	}
`;

const VariantWord = styled.p`
	padding: 10px;
	cursor: pointer;
	font-size: 24px;
	padding: 10px;
	border: 1px solid;
	background-color: ${(props) => props.color};
`;

const HandContainer = styled(EmojiContainer)`
	@media (max-width: 420px) {
		display: none;
	}
`;

interface VariantProps {
	variant: Word;
	onClick: () => void;
	isCurrent: boolean;
	isRight: boolean;
	gameState: GameStates;
}

export function Variant({ variant, onClick, isCurrent, isRight, gameState }: VariantProps) {
	return (
		<VariantContainer>
			<VariantWord
				key={variant.id}
				onClick={onClick}
				color={gameState === GameStates.ROUND_OVER && isRight ? theme.successColor : theme.backgroundColor}
			>
				{variant.esInitial}
			</VariantWord>
			<HandContainer>{isCurrent ? '👆' : ''}</HandContainer>
		</VariantContainer>
	);
}
