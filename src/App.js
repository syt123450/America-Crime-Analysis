import React, {Component} from 'react';
import './App.css';

import 'material-design-icons/iconfont/material-icons.css'
import 'react-vis/dist/style.css';
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import DomBody from './component/DomBody';

class App extends Component {

	render() {
		return (

			<ThemeProvider theme={theme}>
				<DomBody/>
			</ThemeProvider>

		);
	}
}

export default App;
