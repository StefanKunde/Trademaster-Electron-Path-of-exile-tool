import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const root = document.getElementById('app');
ReactDOM.render(
	<AppContainer>
		<App />
	</AppContainer>,
	root
);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./app', () => {
		// tslint:disable-next-line:no-require-imports
		const HotApp = require('./app').default;
		ReactDOM.render(
			<AppContainer>
				<HotApp />
			</AppContainer>
			, root
		);
	});
}