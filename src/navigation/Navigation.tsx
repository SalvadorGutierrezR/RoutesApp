import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { PermissionsContext } from '../context/PermissionsContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const { permissions } = useContext(PermissionsContext);

    if ( permissions.locationStatus === 'unavailable' ){
        return <LoadingScreen/>
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#fff' }
            }}
            
        >
            {
                permissions.locationStatus === 'granted' ? 
                <Stack.Screen name="MapScreen" component={MapScreen} /> :
                <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
            }
        </Stack.Navigator>
    );
}

export default Navigation