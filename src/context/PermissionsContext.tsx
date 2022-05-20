import React, { createContext, useEffect, useState } from "react";
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from "react-native-permissions";
import { AppState, Platform } from 'react-native';


export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',   
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps); //TODO: add initial state

export const PermissionsProvider = ({ children }: any) => {

    useEffect(() => {
        AppState.addEventListener('change', state => {
            if (state !== 'active') return;
            checkLocationPermission();
        });
    },[]);

    const [permissions, setPermissions] = useState( permissionInitState );
    
    const askLocationPermission = async () => { 

        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'android') {
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        } else {
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        }

        if (permissionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    }
    const checkLocationPermission = async() => {
         let permissionStatus: PermissionStatus;

        if (Platform.OS === 'android') {
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        } else {
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    }
    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission 
        }} >
            {children}
        </PermissionsContext.Provider>
    )

}