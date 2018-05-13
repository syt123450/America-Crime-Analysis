import React, {Component} from 'react';

import {Route} from "react-router-dom";

import Statistic from './Statistic';
import Prediction from './Prediction';

class Main extends Component {
	render() {
		return (
			<div style={{flex: 1, overflowY: 'auto', padding: '1.8rem'}}>
				<Route exact path="/" component={Statistic}/>
				<Route path="/prediction" component={Prediction}/>
			</div>
		)
	}
}

export default Main;