import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import { CenteredContainer } from './common-styles';

import { Dictionary } from './Dictionary';
import { Training } from './Training';
import { VariantsGame } from './Training/VariantsGame';

const Header = () => {
	return (
		<CenteredContainer>
			<h1>Estonian words</h1>
		</CenteredContainer>
	);
};

const Links = styled(CenteredContainer)`
	justify-content: space-around;
`;

export function App() {
	return (
		<Router>
			<Header />
			<Links>
				<Link to="/dictionary">Dictionary</Link>
				<Link to="/training">Training</Link>
			</Links>
			<Route path="/" exact component={Dictionary} />
			<Route path="/dictionary/:searchId" exact component={Dictionary} />
			<Route path="/dictionary" exact component={Dictionary} />
			<Route path="/training" exact component={Training} />
			<Route path="/training/variants/:level" exact component={VariantsGame} />
		</Router>
	);
}
