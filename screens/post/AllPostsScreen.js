import React, {useState, useCallback, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as postsActions from '../../store/actions/posts';
import * as usersActions from '../../store/actions/users';


const AllPostsScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const refPosts = useRef(null);

    const posts = useSelector(state => state.posts.allPosts);
    const userId = useSelector(state => state.auth.user._id);
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const loadPosts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());
            await dispatch(usersActions.fetchUsers());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])

    
    const toggleLikeHandler = async (postId, isLiked) => {
        
        try {
            if(isLiked){
                await dispatch(postsActions.unlikePost(postId))
            } else {
                await dispatch(postsActions.likePost(postId))
            }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }

    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', loadPosts);

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [loadPosts])
    useEffect(() => {
        const unsubscribe = navigation.dangerouslyGetParent().addListener('tabPress', e => {
            console.log("TAB PRESSED");
            if(refPosts.current){
                refPosts.current.scrollToIndex({ animated: true, index: 0 });
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])

    useEffect(() => {
        setIsLoading(true);
        loadPosts()
        .then(() => {
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
                ref={refPosts}
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
                        <Card post={post.item} userId={userId} toggleLikeHandler={toggleLikeHandler} />
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