import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch} from 'react-redux';


import * as authActions from '../../store/actions/auth';


const ProfileScreen = (props) => {
    const dispatch = useDispatch();

    return(
        <View style={styles.screen} > 
            <Button onPress={() => {
                dispatch(authActions.logout())
            }} >LOGOUT</Button>
            <Text>ProfileScreen</Text>
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

export default ProfileScreen;