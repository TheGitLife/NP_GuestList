import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

export default class AttendTextContainer extends Component {
    render() {
        return (
            <View style={styles.AttendTextContainer}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    AttendTextContainer: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
