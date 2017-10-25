import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

export default class CheckInBtnContainer extends Component {
    render() {
        return (
            <View style={styles.CheckInBtnContainer}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CheckInBtnContainer: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5
    }
})
