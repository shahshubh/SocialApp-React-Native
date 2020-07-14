import React from 'react';
import { BottomNavigator, AuthNavigator } from './SocialAppNavigator';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);


    return(
        <NavigationContainer>
            { isAuth && <BottomNavigator /> }
            { !isAuth && didTryAutoLogin && <AuthNavigator />}
            { !isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    );
}

export default AppNavigator;