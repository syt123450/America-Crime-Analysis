import React, {Component} from 'react';

import '../styles/Prediction.css';
import Card from 'react-toolbox/lib/card/Card';
import CardMedia from 'react-toolbox/lib/card/CardMedia';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardActions from 'react-toolbox/lib/card/CardActions';

import Button from 'react-toolbox/lib/button/Button';
import InitHeatmap from './HeatMapDrawer';

import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Input from 'react-toolbox/lib/input/Input';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';

import criminalIcon from '../assets/images/criminal.jpg';
import victimsIcon from '../assets/images/victims.jpg';
import killedIcon from '../assets/images/killed.png';
import injuredIcon from '../assets/images/injured.jpg';
import StateData from './constant/StateData';
import PredictionResource from '../config/PredictionResource';
import axios from 'axios';

class Prediction extends Component {

	state = {
		map: "none",
		mapButtonText: Prediction.buttonText.show,
		VPYear: null,
		VPMonth: null,
		VPDay: null,
		VPState: null,
		VPTimeText: null,
		VPResult: false,
		CPYear: null,
		CPMonth: null,
		CPDay: null,
		CPTimeText: null,
		CPState: null,
		CPKilled: null,
		CPInjured: null,
		CPResult: false,
		resultVPKilled: 0,
		resultVPInjured: 0,
		resultCPSuspected: 0,
		resultCPArrested: 0,
		resultCPVictim: 0
	};

	componentDidMount() {

		InitHeatmap.drawPredictionMap();

	}

	toggleMap() {

		if (this.state.map === "none") {
			this.setState({
				map: "block",
				mapButtonText: Prediction.buttonText.hide
			})
		} else {
			this.setState({
				map: "none",
				mapButtonText: Prediction.buttonText.show
			})
		}
	}

	handleChooseVPDate(value) {

		let year =  value.getFullYear();
		let month = value.getMonth() + 1;
		let day = value.getDate();
		this.setState({
			VPYear: year,
			VPMonth: month,
			VPDay: day,
			VPTimeText: value
		});
	}

	handleChooseVPState(value) {
		this.setState({VPState: value});
	}

	handleChooseCPDate(value) {
		let year =  value.getFullYear();
		let month = value.getMonth() + 1;
		let day = value.getDate();
		this.setState({
			CPYear: year,
			CPMonth: month,
			CPDay: day,
			CPTimeText: value,
		});
	}

	handleChooseCPState(value) {
		this.setState({CPState: value});
	}

	handleChooseKilled(value) {
		this.setState({CPKilled: value});
	}

	handleChooseInjured(value) {
		this.setState({CPInjured: value});
	}

	handleVictimPrediction() {

		var context = this;

		axios.post(PredictionResource.victim, {
			year: this.state.VPYear,
			month: this.state.VPMonth,
			day: this.state.VPDay,
			state: this.state.VPState
		}).then(function (response) {
			let responseData = response.data;
			context.setState({
				resultVPInjured: responseData.injured,
				resultVPKilled: responseData.killed,
				VPResult: true
			})
		});


	}

	handleCriminalPrediction() {

		var context = this;

		axios.post(PredictionResource.criminal, {
			year: this.state.CPYear,
			month: this.state.CPMonth,
			day: this.state.CPDay,
			state: this.state.CPState,
			killed: this.state.CPKilled,
			injured: this.state.CPInjured
		}).then(function (response) {
			let responseData = response.data;
			context.setState({
				resultCPVictim: responseData.victim,
				resultCPArrested: responseData.arrested,
				resultCPSuspected: responseData.suspect,
				CPResult: true
			})
		});
	}

	clearVPResult() {
		this.setState({VPResult: false})
	}

	clearCPResult() {
		this.setState({CPResult: false})
	}

	render() {
		return (
			<div>
				<Button className={"map-toggle-button"}
						icon='map'
						label={this.state.mapButtonText}
						raised
						primary
						onClick={this.toggleMap.bind(this)}/>
				<div id="predictionMap"
					 className={"statistic-line prediction-heatmap"}
					 style={{"display": this.state.map}}>Loading Heat Map......</div>
				<div>
					<Card className={"form-container first-container"}>
						<CardTitle
							avatar={victimsIcon}
							title="Victims Prediction"
							subtitle="Subtitle here"
						/>
						<CardMedia
							aspectRatio="wide"
							image="https://placeimg.com/800/450/nature"
						/>
						<div className={"card-container"}>
							<CardTitle
								title="Title goes here"
								subtitle="Subtitle here"
							/>
							<DatePicker
								label='Choose a date'
								sundayFirstDayOfWeek
								onChange={this.handleChooseVPDate.bind(this)}
								value={this.state.VPTimeText}
							/>
							<Dropdown
								auto
								onChange={this.handleChooseVPState.bind(this)}
								source={StateData}
								label='Choose a American State'
								value={this.state.VPState}
							/>
							<CardActions>
								<Button
									label="Predict"
									onMouseUp={this.handleVictimPrediction.bind(this)}/>
							</CardActions>
						</div>
						{this.state.VPResult ? <Card className={"result-card"}>
							<CardTitle
								avatar={victimsIcon}
								title="Prediction Result"
								subtitle="Subtitle here"
							/>
							<div className={"card-container"}>
								<List selectable ripple>
									<ListItem
										avatar={killedIcon}
										caption='Killed'
										legend={this.state.resultVPKilled + ` people may be killed in this condition`}
									/>
									<ListItem
										avatar={injuredIcon}
										caption='Injured'
										legend={this.state.resultVPInjured + ` people may be injured in this condition`}
									/>
								</List>
								<CardActions>
									<Button
										label="Close"
										onMouseUp={this.clearVPResult.bind(this)}/>
								</CardActions>
							</div>
						</Card> : null}
					</Card>
					<Card className={"form-container"}>
						<CardTitle
							avatar={criminalIcon}
							title="Criminal Prediction"
							subtitle="Subtitle here"
						/>
						<CardMedia
							aspectRatio="wide"
							image="https://placeimg.com/800/450/nature"
						/>
						<div className={"card-container"}>
							<CardTitle
								title="Title goes here"
								subtitle="Subtitle here"
							/>
							<DatePicker
								label='Choose a date'
								sundayFirstDayOfWeek
								onChange={this.handleChooseCPDate.bind(this)}
								value={this.state.CPTimeText}
							/>
							<Dropdown
								auto
								onChange={this.handleChooseCPState.bind(this)}
								source={StateData}
								label='Choose a American State'
								value={this.state.CPState}
							/>
							<Input
								type='text'
								label='Input Number of People Killed'
								name='name'
								onChange={this.handleChooseKilled.bind(this)}
								value={this.state.CPKilled}
							/>
							<Input
								type='text'
								label='Input Number of People Injured'
								name='name'
								onChange={this.handleChooseInjured.bind(this)}
								value={this.state.CPInjured}
							/>
							<CardActions>
								<Button
									label="Predict"
									onMouseUp={this.handleCriminalPrediction.bind(this)} />
							</CardActions>
						</div>
						{this.state.CPResult ? <Card className={"result-card"}>
							<CardTitle
								avatar={criminalIcon}
								title="Prediction Result"
								subtitle="Subtitle here"
							/>
							<div className={"card-container"}>
								<List selectable ripple>
									<ListItem
										avatar={killedIcon}
										caption='Killed'
										legend={this.state.resultCPSuspected + " people will be suspected."}
									/>
									<ListItem
										avatar={injuredIcon}
										caption='Injured'
										legend={this.state.resultCPArrested + ' people will be arrested.'}
									/>
									<ListItem
										avatar={injuredIcon}
										caption='Injured'
										legend={this.state.resultCPVictim + ' victims in this event.'}
									/>
								</List>
								<CardActions>
									<Button
										label="Close"
										onMouseUp={this.clearCPResult.bind(this)}/>
								</CardActions>
							</div>
						</Card> : null}
					</Card>
				</div>
			</div>
		)
	}

}

Prediction.buttonText = {
	show: "Show Prediction Map",
	hide: "Hide Prediction Map"
};


export default Prediction;