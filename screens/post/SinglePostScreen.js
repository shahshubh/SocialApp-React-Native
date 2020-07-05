import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const SinglePostScreen = (props) => {
    return(
        <View style={styles.screen} > 
            <Text>SinglePostScreen</Text>
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

export default SinglePostScreen;