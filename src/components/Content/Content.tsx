import * as React from 'react';
import './Content.css';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './SubContent/Home/Home';
import Settings from './SubContent/Settings/Settings';

interface IProps {

}

class Content extends React.Component<IProps, any> {
	render() {
		return (
			<Router>
				<div id='home'>
					<Route exact path='/' component={Home} />
				</div>
				<div id='settings'>
					<Route path='/settings' component={Settings} />
				</div>
			</Router>
		);
	}
}

export default Content;