import React, { Component } from 'react'
import {
    View,
    StyleSheet
} from 'react-native';

import {
  Text,
  Icon
} from "native-base";

export default class GuestItemContainer extends Component {
    render() {
        const {name, note} = this.props;
        return (
            <View style={styles.GuestItemContainer}>
                <View style={styles.leftIcon}>
                    <Icon name='md-checkmark-circle-outline' style={{fontSize: 60}}/>
                </View>
                <View style={{flex:0.6}}>
                    <Text>{name}</Text>
                    <Text style={{color:'gray', fontSize:13, marginTop:5}}>{note}</Text>
                </View>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    GuestItemContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    leftIcon: {
        flex:0.2,
        justifyContent: 'center'
    }
})
