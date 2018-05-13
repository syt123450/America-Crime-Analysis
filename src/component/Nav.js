import React, {Component} from 'react';
import {Link} from "react-router-dom";

import '../styles/Nav.css';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';

import Navigation from 'react-toolbox/lib/navigation/Navigation';
import ReactLink from 'react-toolbox/lib/link/Link';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

class Nav extends Component {

	// state = {
	// 	statisticLink: true,
	// 	predictionLink: true,
	// };
	//
	// setStatisticActive() {
	// 	console.log(111);
	// 	this.setState({
	// 		statisticLink: true,
	// 		predictionLink: false,
	// 	})
	// }
	//
	// setPredictionActive() {
	// 	console.log(222);
	// 	this.setState({
	// 		statisticLink: false,
	// 		predictionLink: true,
	// 	})
	// }

	render() {
		return (
			<div>
				<AppBar title='America Crime Analysis' leftIcon='warning'>
					<Navigation type='horizontal'>
						<Link to="/"
							  className={"router-container"}>
							<ReactLink className={"router-link"}
									   active
									   label='Statistic'
									   icon='inbox'/>
						</Link>
						<Link to="/prediction"
							  className={"router-container"}>
							<ReactLink className={"router-link"}
									   active
									   label='Prediction'
									   icon='person'/>
						</Link>
					</Navigation>
				</AppBar>
			</div>
		)
	}

}

export default Nav;