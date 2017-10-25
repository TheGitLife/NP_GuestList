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
  Item
} from "native-base";

import ReactNative from 'react-native';
const {  
	View,
	StyleSheet,
	TouchableOpacity,
	Image
} = ReactNative;

import {
	EventListItemContainer,
	EventListItemTextContainer,
	AttendTextContainer,
	CheckInBtnContainer,
	GuestItemContainer
} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';

/**
 * DetailEvent component
 */
class DetailEvent extends Component {

	static navigationOptions = ({ navigation }) => ({
	    header: (
	      <Header style={{backgroundColor: 'black'}}>
	        <Left style={{flex: 1}}>
	          <Button transparent onPress={() => navigation.goBack()}>
	            <Icon name="arrow-back" />
	          </Button>
	        </Left>
	        <Body style={{alignItems: 'center'}}>
	          <Title>{navigation.state.params.detailTitle}</Title>
	          <Text style={{color: 'gray', fontSize: 13}}>{navigation.state.params.detailTime}</Text>
	        </Body>
	        <Right />
	      </Header>
	    )
  	});

  	constructor(props) {
  		super(props);
  	}

  	componentWillMount() {
  		const {detailEventId} = this.props.navigation.state.params;
  		const {events} = this.props;

  		const event = this.getByValue2(events, detailEventId);  		
  		this.props.navigation.setParams({
            detailTitle: event.event_name,
			detailTime: event.date,
			detailLocation: event.location,
			detailImage: event.image
        });

  	}

  	getByValue2(arr, value) {
		let result  = arr.filter(function(o){return o.event_id == value;} );
	  	return result? result[0] : null;
	}


  	/**
   	 * Render DetailEvent
   	 * @return {jsxresult} result in jsx format
   	*/
	render() {

		const {detailEventId} = this.props.navigation.state.params;

		const {detailTitle, detailTime, detailLocation, detailImage} = this.props.navigation.state.params;
		const {guests} = this.props;
		const listData = guests;

		if (detailTitle === undefined) {
			return null;
		}
		
		return (
			<Container style={{backgroundColor:'white'}}>
	        	<Grid>
		        	<View style={{flex: 1, flexDirection: 'column'}}>
		        		<View style={{flex:0.4}}>
		        			<EventListItemContainer>
				                <Image
				                  resizeMode="stretch"
				                  style={{ flex: 1, height: undefined, width: undefined }}
				                  source={{ uri: detailImage }}
				                >
				                	<EventListItemTextContainer>
					                    <Text style={{ fontSize: 20, color: "white" }}>
					                      {detailTitle}
					                    </Text>
					                    <Text
					                      style={{ fontSize: 13, color: "white", marginTop: 10 }}
					                    >{`${detailTime} - ${detailLocation}`}</Text>
				                  	</EventListItemTextContainer>
				                </Image>
				            </EventListItemContainer>
		        		</View>

		        		<View style={{marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
		        			<AttendTextContainer>
			        			<Text style={{fontSize: 20, color: 'black'}}>
			        				Total Attendees:
			        			</Text>
			        			<Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}> {guests.length}</Text>
			        		</AttendTextContainer>

		        			<CheckInBtnContainer>
				        		<Button bordered dark onPress={()=>{
				        			this.props.navigation.navigate("CheckIn", { 
	            						detailTitle: detailTitle
	            					});
				        		}}>
				        			<Text>Check In</Text>
				        			<Icon name='md-checkmark-circle-outline' />
				        		</Button>
				        	</CheckInBtnContainer>
		        		</View>
		        		<View style={{flex:0.6}}>
		        			<Content style={{flex: 1}}>
		        			{
			        			listData.map((item, index)=>{
			        				return(
						        		<View style={{height: 70, padding:20}} key={index}>
						        			<GuestItemContainer
						        				name={`${item['last name']} ${item['first name']}`}
						        				note={item.note}						        			
						        			>
						        				<View style={{flex:0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
								        			<Icon name='ios-trash' style={{fontSize: 30}} onPress={()=>{alert('');}} />
								        		</View>
								        	</GuestItemContainer>
								        </View>
								    );
							    })
					    	}
					    	</Content>
		        		</View>
		        		<View style={{height: 80, alignItems: 'flex-end', paddingRight: 20}}>
		        			<Icon name='ios-add-circle-outline' style={{fontSize: 60}} onPress={()=>{alert('');}} />
		        		</View>
		        	</View>
		        </Grid>
		    </Container>
		);
	}
}

export default connect(
  (state) => ({
    guests: state.event.guests,
    events: state.event.events
  }),
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(DetailEvent);