import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';

const AllPostsScreen = (props) => {

    const dispatch = useDispatch();

    return(
        <View style={styles.screen} > 
            <Text onPress={() => props.navigation.navigate('SinglePost') } >AllPostsScreen</Text>
            <Text onPress={() => {
                dispatch(authActions.logout())
            } } >LOGOUT</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AllPostsScreen;