import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const UserProfileScreen = (props) => {
    return(
        <View style={styles.screen} > 
            <Text>UserProfileScreen</Text>
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

export default UserProfileScreen;