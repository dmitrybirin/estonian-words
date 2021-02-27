import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from './common-styles';
import { Word as WordType } from './types';

const CardContainer = styled.div`
	width: 300px;
	height: 150px;
	border: solid black 2px;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 150px 100px;
`;

const Word = styled(CenteredContainer)`
	text-align: center;
	flex: 1;
`;

const Translation = styled(Word)`
	font-weight: bold;
`;

const FormsContainer = styled(CenteredContainer)`
	flex-direction: column;
`;

interface CardProps {
	word: WordType;
}

export const Card: React.FC<CardProps> = ({ word }) => {
	return (
		<CardContainer>
			<Translation>{word.ruTranslation}</Translation>
			<FormsContainer>
				<Word>{word.forms.first}</Word>
				<Word>{word.forms.second}</Word>
				<Word>{word.forms.third}</Word>
			</FormsContainer>
		</CardContainer>
	);
};
