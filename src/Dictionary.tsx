import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from './Card';
import { CenteredContainer } from './common-styles';
import { words } from './data/words';

const List = styled.div`
	display: grid;
	grid-gap: 16px;
	justify-content: center;
	padding: 16px;
	grid-template-columns: repeat(auto-fill, 300px);
`;

export function Dictionary() {
	const { searchId } = useParams<{ searchId: string }>();
	const [inputText, setInputText] = React.useState(searchId ?? '');

	return (
		<>
			<CenteredContainer>
				<p>Number in the dict: {words.length}</p>
			</CenteredContainer>
			<CenteredContainer>
				<input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} />
			</CenteredContainer>
			<List>
				{words
					.filter((word) => word.ruTranslation.includes(inputText) || word.forms.first.includes(inputText))
					.map((word) => (
						<Card key={word.forms.first} word={word} />
					))}
			</List>
		</>
	);
}
