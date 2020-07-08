import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as postsActions from '../../store/actions/posts';


const AllPostsScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const posts = useSelector(state => state.posts.allPosts);
    const userId = useSelector(state => state.auth.user._id);
    const dispatch = useDispatch();


    const loadPosts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])


    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', loadPosts);

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [loadPosts])

    useEffect(() => {
        setIsLoading(true);
        loadPosts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadPosts])

    if(error){
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadPosts} color={Colors.primary} />
            </View>
        );
    }


    if(isLoading){
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }


    if(!isLoading && posts.length === 0){
        return(
            <View style={styles.centered} >
                <Text>No posts found. Maybe start adding some!</Text>
            </View>
        );
    }


    return (
        <View style={styles.screen} >
            <FlatList 
                style={styles.list}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={posts}
                keyExtractor={(item) => item._id }
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                renderItem={(post) => {
                    return (
                        <Card post={post.item} userId={userId} />
                    )
                }} 
            />

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        width: '100%',
    },
    separator: {
        marginTop: 10,
    },

})

export default AllPostsScreen;