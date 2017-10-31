import React, { Component } from 'react';

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Grid,
  Item,
  Form,
  Input,
  Label
} from "native-base";

import moment from 'moment';
import ReactNative from 'react-native';
const {
	View,
	StyleSheet,
	TouchableOpacity,
	Image
} = ReactNative;

import DateTimePicker from 'react-native-modal-datetime-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';

/**
 *  component
 */
class CreateEvent extends Component {

   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {

    this._hideDateTimePicker();

    dateValue = moment(date).format('MMM D, YYYY h:mmA (dddd)');
    console.log('A date has been picked: ', dateValue);

    this.setState({
      dateTime: String(dateValue)
    });
  };

	static navigationOptions = ({ navigation }) => ({
	    header: (
	      <Header style={{backgroundColor: 'black'}}>
	        <Left style={{flex: 1}}>
	          <Button transparent onPress={() => navigation.goBack()}>
	            <Icon name="arrow-back" />
	          </Button>
	        </Left>
	        <Body style={{alignItems: 'center'}}>
	          <Title>Create Event</Title>
	          <Text style={{color: 'gray', fontSize: 13}}>Placeholder Text</Text>
	        </Body>
	        <Right />
	      </Header>
	    )
  	});

  	constructor(props) {
  		super(props);

  		this.state = {
  			title: '',
  			dateTime: '',
  			location: '',
        isDateTimePickerVisible: false
  		}
  	}

	/**
    * handel on Press Dispense btn
    * @return {void}
    */
	onPressDispense() {
		//alert('');
	}

  	/**
   	 * Render
   	 * @return {jsxresult} result in jsx format
   	*/
	render() {

		const listData = [
			{
		    	"last name":"Narutis",
		        "first name":"Lukas",
		        "note":"our engineer from Barcelona",
		        "status":"0"
			},
		    {
		    	"last name":"Normantas",
		        "first name":"Anya",
		        "note":"Google Play support",
		        "status":"1"
			},
		    {  
		    	"last name":"Norris",
		        "first name":"Dean",
		        "note":"played by Hank Schrader",
		        "status":"0"
			}
		]

    moment.locale('en');

		return (
			<Container style={{backgroundColor:'white'}}>
	        	<Grid>
			        <Content>
						<Form style={{}}>
							<Label style={{marginLeft: 20, marginTop: 40}}>Title</Label>
							<Item>
								<Input onChangeText={(text)=>{
									this.setState({
										title: text
									});
								}} />
							</Item>

							<Label style={{marginLeft: 20, marginTop: 20}}>Date/Time</Label>
							<Item>
								<Input onChangeText={(text)=>{this.setState({dateTime: text});}}
                onFocus={this._showDateTimePicker}
                value={this.state.dateTime}
                />

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode="datetime"
                  minimumDate={new Date()}
                />
							</Item>

							<Label style={{marginLeft: 20, marginTop: 20}}>Location</Label>
							<Item>
								<Input onChangeText={(text)=>{
									this.setState({
										location: text
									});
								}} />
							</Item>

							<Button full dark style={{margin: 20, marginTop: 30}} onPress={()=>{
								this.props.eventActions.addEvent({
									title: this.state.title,
									dateTime: this.state.dateTime,
									location: this.state.location
								});
								this.props.navigation.goBack();
							}}>
								<Text>Create Event</Text>
							</Button>
						</Form>
			        </Content>
		        </Grid>
		    </Container>
		);
	}
}

export default connect(
  null,
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(CreateEvent);
