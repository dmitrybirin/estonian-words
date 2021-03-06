import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from './common-styles';
import { CaseForms, VerbForms, Word as WordType } from './types';

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
			<Translation>{word.ruTranslations[0]}</Translation>
			<FormsContainer>
				{word?.forms ? (
					<>
						<Word>{(word.forms as VerbForms)?.maForm || (word.forms as CaseForms)?.first.singular}</Word>
						<Word>{(word.forms as VerbForms)?.daForm || (word.forms as CaseForms)?.second.singular}</Word>
						<Word>{(word.forms as VerbForms)?.thirdForm || (word.forms as CaseForms)?.third.singular}</Word>
					</>
				) : (
					<Word>{word.esInitial}</Word>
				)}
			</FormsContainer>
		</CardContainer>
	);
};
