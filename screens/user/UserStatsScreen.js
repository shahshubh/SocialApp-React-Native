import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const UserStatsScreen = (props) => {
    return(
        <View style={styles.screen} > 
            <Text>UserStatsScreen</Text>
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

export default UserStatsScreen;