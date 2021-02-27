import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Dictionary } from './Dictionary';

export function App() {
	return (
		<Router>
			<Route path="/" exact component={Dictionary} />
			<Route path="/dictionary/:searchId" exact component={Dictionary} />
			<Route path="/dictionary" exact component={Dictionary} />
		</Router>
	);
}
