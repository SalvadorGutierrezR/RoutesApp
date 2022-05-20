import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const BlackButton = ({ title, onPress, style = {}  }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                ...style as any,
                ...styles.blackButton,
            }}
        >
            <Text style={styles.buttonText}>Permission</Text>
        </TouchableOpacity>
    )
}

export default BlackButton

const styles = StyleSheet.create({
    blackButton: {
        height: 50,
        width: 200,
        backgroundColor: '#000',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    }
})