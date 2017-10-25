import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

import { Col, Row, Grid } from "react-native-easy-grid";

export default class EventListItemTextContainer extends Component {
    render() {
        return (
            <View style={styles.EventListItemTextContainer}>
              {this.props.children}          
            </View>
        )
    }
}

const styles = StyleSheet.create({
    EventListItemTextContainer: {
      flex: 1,
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
      padding: 10,
      width: "100%"
    }
})
