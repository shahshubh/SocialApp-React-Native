import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                // props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAutoLogin());
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, user } = transformedData;

            // props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(user, token));
        };

        tryLogin();
}, [dispatch])


return (
    <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
);
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;