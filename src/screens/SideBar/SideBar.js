import React from "react";
import { AppRegistry, StatusBar } from "react-native";
import { NavigationActions } from 'react-navigation'
import {
  Button,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";

import ReactNative from 'react-native';
const {  
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} = ReactNative;

const resetMixesAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Mixes'})
  ]
});

const routes = ["Mixes", "CreateEvent"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container style={{backgroundColor:'#00bbd5'}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>         
          

          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            {
              routes.map((item, index)=>{
                return(
                  <View key={index} style={{marginTop:10, marginBottom:10}}>
                    <TouchableOpacity onPress={()=>{
                      if(item =='Mixes') {
                        this.props.navigation.dispatch(resetMixesAction);
                      } else {
                        this.props.navigation.navigate(item);
                      }
                    }}>
                      <Text style={{color:'white', fontSize:20}}>{item}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </View>
          
      </View>
    </Container>
    );
  }
}
