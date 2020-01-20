import * as React from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';

export interface IProps {
}

export default class NavigationBar extends React.Component<IProps, any> {
	render() {
		return (
			<div id='navbar-div'>
				<nav className='navbar navbar-expand-lg bg-primary'>
					<a className='navbar-brand' href='#'>TradeMaster</a>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarNav'
						aria-controls='navbarNav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-bar navbar-kebab'></span>
						<span className='navbar-toggler-bar navbar-kebab'></span>
						<span className='navbar-toggler-bar navbar-kebab'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav'>
							<li className='nav-item active'>
								<Link className='nav-link' to='/'>Start</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/settings'>Settings</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}