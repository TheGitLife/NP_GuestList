import React, { Component } from 'react';
import ReactNative from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';

import {
	EventListItemContainer,
	EventListItemTextContainer
} from '../../components';

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
  Item,
  Input
} from "native-base";

import { Col, Row, Grid } from 'react-native-easy-grid';

const {
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Image
} = ReactNative;

/**
 * Mixes component
 */

function renderHeader(navigation) {
	const isSearch =
		navigation.state.params && navigation.state.params.isSearch ? true : false;
	const eventCount =
		navigation.state.params && navigation.state.params.eventCount
			? navigation.state.params.eventCount
			: false;

	return (
		isSearch ?
			<Header searchBar rounded style={{backgroundColor: 'black'}}>
				<Item>
			    	<Icon name="ios-search" />
			        <Input placeholder="Search" onChangeText={(text)=>{
			        	navigation.state.params.handleSearchStr(text);
			        }} />
			        <Icon name="md-briefcase" />
			        <Button style={{backgroundColor: 'black'}} onPress={()=>{
			        	navigation.state.params.goSearch();
			        	navigation.state.params.handleEdit();
			        }}>
	            		<Text>Search</Text>
	          		</Button>
			    </Item>
			</Header>
		:
			<Header style={{backgroundColor: 'black'}}>
				<Left style={{flex: 1}}>
					<Button style={{}} transparent onPress={() => navigation.navigate("DrawerOpen")}>
					 	<Icon name="menu" />
					</Button>
				</Left>
				<Body style={{flexDirection: 'column', alignItems: 'center'}}>
					<Title style={{marginTop: 5}}>Events</Title>
					<Text style={{color: 'gray', fontSize: 13}}>
						{
							(eventCount === false ) ?
								'loading...'
							:
							`${eventCount} events found`
						}
					</Text>
				</Body>
				<Right>
					<Button style={{}} transparent onPress={() => {
						navigation.state.params.handleEdit();
					}}>
					  <Icon name="search" />
					</Button>
				</Right>
			</Header>
	);
}


class Mixes extends Component {

	static navigationOptions = ({ navigation }) => ({
		header: (
			renderHeader(navigation)
		)
	});

	constructor(props) {
		super(props);
		this.searchString = '';
		this.state = {
			sString: '',
			npid: 'asha_seattle_id'
		}
	}
	componentWillMount() {
		this.props.navigation.setParams({
            isSearch: false,
            handleEdit: this.handleEdit.bind(this),
            handleSearchStr: this.handleSearchStr.bind(this),
            goSearch: this.goSearch.bind(this)
        });
    }

    componentDidMount() {
  		this.props.eventActions.fetchEvent(this.state.npid);
  	}

  	componentWillReceiveProps(nextProps) {
  		if( this.props.loading && nextProps.loading === false ) {
  			this.props.navigation.setParams({
	            eventCount: this.props.events.length
	        });
  		}
	}

    handleEdit() {
        this.props.navigation.setParams({
            isSearch: !this.props.navigation.state.params.isSearch,
        });
    }

    handleSearchStr(val) {
    	this.searchString = val;
    }

    goSearch() {
    	this.setState({
    		sString : this.searchString
    	});
    	this.searchString = '';
    }

  /**
   * Render Mixes
   * @return {jsxresult} result in jsx format
   */
	render() {
		const {sString} = this.state;
		const {events, loading} = this.props;
		const listData = events;

		if ( !this.props.navigation.state.hasOwnProperty('params') || loading || !this.props.navigation.state.params.hasOwnProperty('eventCount')) {
			return null;
		}

		let eventCount = 0;
		let eventList = listData.map((item, index)=>{
			if (sString =='' || item.event_name.indexOf(sString) != -1) {
				eventCount++;
				return (
  				<View style={[styles.listItem, styles.lastItem]} key={index}>
        			<TouchableOpacity style={{flex:1}} onPress={() => {
    					this.props.navigation.navigate("DetailEvent", {
    						detailEventId: item.event_id
    					});
        			}}>
        				<EventListItemContainer>
			                <Image
			                  resizeMode="stretch"
			                  style={{ flex: 1, height: undefined, width: undefined }}
			                  source={{ uri: item.event_background }}
			                >
			                	<EventListItemTextContainer>
				                    <Text style={{ fontSize: 20, color: "white" }}>
				                      {item.event_name}
				                    </Text>
				                    <Text
				                      style={{ fontSize: 13, color: "white", marginTop: 10 }}
				                    >{`${item.event_date} - ${item.event_location}`}</Text>
			                  	</EventListItemTextContainer>
			                </Image>
			            </EventListItemContainer>
					</TouchableOpacity>
        		</View>
        	);
			} else {
				return null;
			}
		});

		return (
			<Container style={{flex: 1, backgroundColor:'white'}}>
				<View style={{width: '100%', paddingLeft: 20, paddingRight: 20, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
          			<Text style={{color: 'white', marginTop: 5, marginBottom: 10}}>Place holder Text</Text>
          		</View>
          		<Content>
          			{
	          			eventList
            		}
            		{
            			eventCount == 0 &&
            			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            				<Text style={{fontSize: 20}}>No Events</Text>
            			</View>
            		}
          		</Content>
          		<View style={{position: 'absolute', right: 20, bottom: 20}}>
          			<Icon name='ios-add-circle' style={{fontSize: 60}} onPress={()=>{
          				this.setState({
          					sString: ''
          				});
          				this.props.navigation.navigate("CreateEvent", { npid: this.state.npid });
          			}} />
          		</View>
		    </Container>
		);
	}
}


var styles = StyleSheet.create({
	listItem: {
		borderWidth: 1,
		borderColor: '#ededee',
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		height: 160
	}
});


export default connect(
  (state) => ({
    events: state.event.events,
    loading: state.pender.pending['event/FETCH_EVENT']
  }),
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(Mixes);
