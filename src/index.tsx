import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('app');
ReactDOM.render(
	<BrowserRouter>
		<AppContainer>
			<App />
		</AppContainer>
	</BrowserRouter>,
	root
);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./app', () => {
		// tslint:disable-next-line:no-require-imports
		const HotApp = require('./app').default;
		ReactDOM.render(
			<BrowserRouter>
				<AppContainer>
					<HotApp />
				</AppContainer>
			</BrowserRouter>
			, root
		);
	});
}