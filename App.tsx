import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation/Navigation'
import { PermissionsProvider } from './src/context/PermissionsContext';

const AppState = ({children}: any) => {
    return (
        <PermissionsProvider>
            {children}
        </PermissionsProvider>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <AppState>
                <Navigation/>
            </AppState>
        </NavigationContainer>
    )
}

export default App