import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const AllPostsScreen = (props) => {
    return(
        <View style={styles.screen} > 
            <Text onPress={() => props.navigation.navigate('SinglePost') } >AllPostsScreen</Text>
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