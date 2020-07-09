import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const UserPostsScreen = (props) => {
    return(
        <View style={styles.screen} > 
            <Text>UserPostsScreen</Text>
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

export default UserPostsScreen;