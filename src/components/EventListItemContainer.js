import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

import { Col, Row, Grid } from "react-native-easy-grid";

export default class EventListItemContainer extends Component {
    render() {
        return (
            <View style={styles.EventListItemContainer}>
                <Col size={67}>
                    {this.props.children}
                </Col>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    EventListItemContainer: {
        flex: 1,
        flexDirection: 'row'
    }
})
