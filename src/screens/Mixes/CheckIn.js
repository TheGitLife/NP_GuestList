import React, { Component } from 'react';
import ReactNative from 'react-native';
import CheckBox from 'react-native-check-box';
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
  Input
} from "native-base";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';

import {
	GuestItemContainer
} from '../../components';
const {
	View,
	StyleSheet,
	TouchableOpacity,
	Image
} = ReactNative;

function renderHeader(navigation) {
	const isSearch = navigation.state.params && navigation.state.params.isSearch ? true : false;
	const guestCount = navigation.state.params && navigation.state.params.guestCount ? navigation.state.params.guestCount : 0;
	return (
		isSearch ?
			<Header searchBar rounded style={{backgroundColor: 'black'}}>
				<Item>
			    	<Icon name="ios-search" />
			        <Input placeholder="Search" onChangeText={(text)=>{
			        	navigation.state.params.handleSearchStr(text);
			        }} />
			        <Icon name="ios-people" />
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
	          	<Button transparent onPress={() => navigation.goBack()}>
	            	<Icon name="arrow-back" />
	          	</Button>
	        </Left>
	        <Body style={{alignItems: 'center'}}>
	          	<Title>{navigation.state.params.detailTitle}</Title>
	          	<Text style={{color: 'gray', fontSize: 13}}>5% Arrived(1/3)</Text>
	        </Body>
	        <Right>
	        	<Button transparent onPress={() => {
					navigation.state.params.handleEdit();
				}}>
				  	<Icon name="search" />
				</Button>
	        </Right>
	    </Header>
	);
}

/**
 * CheckIn component
 */
class CheckIn extends Component {

	static navigationOptions = ({ navigation }) => ({		
		header: (
			renderHeader(navigation)
		)
	});	

  	constructor(props) {
  		super(props);
  		this.searchString = '';
  		this.state = {
			sString: ''
		}
  	}

  	componentWillMount() {
        this.props.navigation.setParams({
            isSearch: false,
            handleEdit: this.handleEdit.bind(this),
            guestCount: this.props.guests.length,
            handleSearchStr: this.handleSearchStr.bind(this),
            goSearch: this.goSearch.bind(this)
        });
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
   	 * Render 
   	 * @return {jsxresult} result in jsx format
   	*/
	render() {
		const {sString} = this.state;
		const {detailTitle} = this.props.navigation.state.params;
		const {guests} = this.props;
		const listData = guests;

		if ( !this.props.navigation.state.params.hasOwnProperty('isSearch')) {
			return null;
		}

		let guestList = listData.map((item, index)=>{
			if (sString =='' || `${item['last name']} ${item['first name']}`.indexOf(sString) != -1) {
				return(
	        		<View style={{height: 70, padding:20}} key={index}>
        				<GuestItemContainer
	        				name={`${item['last name']} ${item['first name']}`}
	        				note={item.note}						        			
	        			>
	        				<View style={{flex:0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
			        			<CheckBox
								    style={{flex: 1, padding: 10}}
								    onClick={()=>{alert('');}}
								    isChecked={true}
								    leftText=''
								/>
			        		</View>
			        	</GuestItemContainer>
			        </View>
			    );
			} else {
				return null;
			}
	    });

	    let guestSearchCount = 0;
		guestList.map((item, index)=>{
			if( item != null)
				guestSearchCount++;
		});

		return (
			<Container style={{backgroundColor:'white'}}>
	        	<Content>
		        	<View style={{flex: 1, flexDirection: 'column'}}>
		        		<View style={{flex:0.6}}>
		        			{
			        			guestList
					    	}
					    	{
		            			guestSearchCount == 0 &&
		            			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
		            				<Text style={{fontSize: 20}}>No Guest</Text>
		            			</View>
		            		}
		        		</View>
		        	</View>
		        </Content>
		    </Container>
		);
	}
}

export default connect(
  (state) => ({
    guests: state.event.guests
  }),
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(CheckIn);