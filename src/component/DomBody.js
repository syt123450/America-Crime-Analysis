import React, {Component} from 'react';

import {BrowserRouter as Router} from "react-router-dom";

import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import Nav from './Nav';
import Main from "./Main";

class DomBody extends Component {

	render() {
		return (
			<Layout>
				<Panel>
					<Router>
						<div>
							<Nav/>
							<Main/>
						</div>
					</Router>
				</Panel>
			</Layout>
		);
	}
}

export default DomBody;