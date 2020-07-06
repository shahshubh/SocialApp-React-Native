import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CommentsScreen = (props) => {

    const { route } = props;
    const comments = route.params.comments

    return(
        <View style={styles.screen} > 
            <Text>CommentsScreen</Text>
            { comments.map((c) => (
                <Text key={c._id} >{c.text}</Text>
            ))}
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

export default CommentsScreen;