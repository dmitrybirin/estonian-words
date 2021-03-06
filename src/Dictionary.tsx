import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from './Card';
import { CenteredContainer } from './common-styles';
import { useDictionary } from './hooks/useDictionary';

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
	const { words, loading } = useDictionary('A1');
	return (
		<>
			<CenteredContainer>
				<p>Number in the dict: {words.length}</p>
			</CenteredContainer>
			<CenteredContainer>
				<input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} />
			</CenteredContainer>
			<List>
				{loading
					? 'Loading...'
					: words
							.slice(0, 10)
							.filter(
								(word) => word.ruTranslations.includes(inputText) || word.esInitial.includes(inputText)
							)
							.map((word) => <Card key={word.id} word={word} />)}
			</List>
		</>
	);
}
