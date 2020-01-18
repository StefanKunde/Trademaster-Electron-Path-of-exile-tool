import * as React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import NavigationBar from './components/Navigation/NavigationBar';
import Content from './components/content/Content';
import Footer from './components/Footer/Footer';

export interface AppProps {
}

export default class App extends React.Component<AppProps, any> {
  render() {
	return(
		<div id='appContainer'>
			<Grid container direction='column' justify='space-around'>
				<Grid item xs={12}>
					<div id='nav'>
						<NavigationBar />
					</div>
				</Grid>
				<Grid item xs={12}>
					<div id='content'>
						<Content />
					</div>
				</Grid>
				<Grid item xs={12}>
					<div id='footer'>
						<Footer />
					</div>
				</Grid>
			</Grid>
		</div>
	);
  }
}