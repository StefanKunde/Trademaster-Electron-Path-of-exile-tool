import * as React from 'react';
import './Content.css';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './SubContent/Home/Home';

interface IProps {

}

class Content extends React.Component<IProps, any> {
  render() {
	return (
		<Router>
			<Route exact path='/' component={Home} />
		</Router>
	);
  }
}

export default Content;