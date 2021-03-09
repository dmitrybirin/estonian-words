import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import { CenteredContainer } from './common-styles';

import { Dictionary } from './Dictionary';
import { Training } from './Training';
import { VariantsGame } from './Training/VariantsGame';

const MainContainer = styled.div`
	display: grid;
	height: 100vh;
	grid-template-rows: auto 1fr auto;
`;

const Header = () => {
	return (
		<CenteredContainer>
			<h1>Estonian words</h1>
		</CenteredContainer>
	);
};

const FooterContainer = styled(CenteredContainer)`
	padding: 10px;
	justify-content: flex-end;
`;

const Footer = () => {
	return (
		<FooterContainer>
			Made with ❤️ All data from{' '}
			<a href="https://sonaveeb.ee/" target="_blank">
				Sõnaveeb
			</a>{' '}
			and
			<a href="https://www.eki.ee/EN/">Institute of the Estonian Language</a>
		</FooterContainer>
	);
};

const Content = styled.div`
	flex: 1;
`;

const Links = styled(CenteredContainer)`
	justify-content: space-around;
`;

export function App() {
	return (
		<MainContainer>
			<Router>
				<Header />
				<Content>
					<Links>
						<Link to="/dictionary">Dictionary</Link>
						<Link to="/training">Training</Link>
					</Links>
					<Route path="/" exact component={Dictionary} />
					<Route path="/dictionary/:searchId" exact component={Dictionary} />
					<Route path="/dictionary" exact component={Dictionary} />
					<Route path="/training" exact component={Training} />
					<Route path="/training/variants/:level" exact component={VariantsGame} />
				</Content>
				<Footer />
			</Router>
		</MainContainer>
	);
}
