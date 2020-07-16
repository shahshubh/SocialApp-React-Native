import React, {useState, useCallback, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as postsActions from '../../store/actions/posts';


const UserPostsScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const refUserPosts = useRef(null);
    
    const { route } = props;
    const userId = route.params.userId;
    const postIndex = route.params.postIndex;
    const fromUserProfile = route.params.fromUserProfile;

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allPosts = useSelector(state => state.posts.allPosts);
    const posts = allPosts.filter(p => p.postedBy._id === userId);


    const dispatch = useDispatch();
    const navigation = useNavigation();

    const loadPosts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            if(refUserPosts.current){
                refUserPosts.current.scrollToIndex({ animated: true, index: postIndex });
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])
    


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
                ref={refUserPosts}
                style={styles.list}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={posts}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        refUserPosts.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
                keyExtractor={(item) => item._id }
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                renderItem={({item, index}) => {
                    return (
                        <Card 
                            post={item} 
                            userId={loggedInUserId}
                            toggleLikeHandler={toggleLikeHandler} 
                            index={index}
                            fromUserProfile={fromUserProfile}
                        />
                    );
                }} 
            />

        </View>
    );
};

export const screenOptions = {
    headerTitle: 'Posts'
}


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

export default UserPostsScreen;