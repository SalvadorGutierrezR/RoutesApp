import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { PermissionsContext } from '../context/PermissionsContext';
import BlackButton from '../components/BlackButton';

const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext(PermissionsContext);

    return (
        <View style={ styles.container} >
            <Text style={styles.title}>GPS is required</Text>
            <BlackButton
                title="Permissions"
                onPress={ askLocationPermission }
            />
            <Text style={{
                marginTop: 20,
                color: '#000',
            }}>{JSON.stringify(permissions, null, 5)}</Text>
        </View>
    )
}

export default PermissionsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
    }
})