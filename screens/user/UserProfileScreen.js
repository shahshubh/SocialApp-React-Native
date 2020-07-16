import React, {useCallback, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    
} from "react-native";

import { Container, Content, Button } from 'native-base'
var { height, width } = Dimensions.get('window');

import Colors from '../../constants/Colors';

import * as usersActions from '../../store/actions/users';
import * as postsActions from '../../store/actions/posts';

import { useDispatch, useSelector } from "react-redux";
import ENV from '../../env';
import MenuItem from "../../components/UI/MenuItem";
import { showMessage } from "react-native-flash-message";


const UserProfileScreen = (props) => {
    const { route } = props;
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];

    let userId;

    if(route.params && route.params.userId){
        userId = route.params.userId;
    } else {
        userId = useSelector(state => state.auth.user._id);
    }
    
    const users = useSelector(state => state.users.allUsers);
    const posts = useSelector(state => state.posts.allPosts);
    const currUser = users.filter(u => u._id === userId)[0];
    const currUserPosts = posts.filter(p => p.postedBy._id === userId);
    
    const [isRefreshing,setIsRefreshing] = useState(false);
    const [isLoading,  setIsLoading] = useState(false);
    const [isFollowLoading,  setIsFollowLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');
    
    const dispatch = useDispatch();


    const loadUsers = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchUsers());
            await dispatch(postsActions.fetchPosts());
        } catch (err) {
            console.log(err);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading]);

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    const checkFollow = (userId) => {
        const isFollowed = loggedInUser.following.filter(f => f._id === userId).length !== 0;
        return isFollowed;
    }

    const followUserHandler = async () => {
        let user = {...currUser};
        delete user.created;
        delete user.followers;
        delete user.following;
        // setIsFollowLoading(true);
        
        if(checkFollow(user._id)){
            showMessage({
                message: `Your have unfollowed ${user.name}.`,
                type: "warning",
                duration: 3000,
                icon: { icon: "warning", position: 'left' }
            });
            await dispatch(usersActions.unfollowUser(user))
        } else {
            showMessage({
                message: `Your are now following ${user.name}.`,
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
            await dispatch(usersActions.followUser(user))
        }
        // setIsFollowLoading(false);
    }







    const renderSectionOne = () => {
        if(currUserPosts.length === 0 ){
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: '#c2c2c2', borderTopWidth: 1 }} >   
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }} >No Posts</Text>
                    { currUser._id === loggedInUserId && (
                        <Button
                            style={{ backgroundColor: Colors.brightBlue, padding: 10, borderRadius: 25, marginTop: 15 }}
                            onPress={() => props.navigation.navigate('AddPost')}
                        >
                            <Text style={{ color: '#fff' }} >Create Post</Text>
                        </Button>
                    ) }
                    
                </View>
            )
        }
        return currUserPosts.map((post, index) => {
            return (
                <TouchableOpacity 
                    key={index}
                    onPress={() => props.navigation.navigate('UserPosts', { userId: userId, postIndex: index, fromUserProfile: true })}
                >
                    <View  style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                        <Image 
                            style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                width: undefined,
                                height: undefined,
                                backgroundColor: '#c2c2c2'
                            }}
                            source={
                                post.updated ? (
                                    { uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date(post.updated)}` }
                                ) : (
                                    { uri: `${ENV.apiUrl}/post/photo/${post._id}` }
                                )
                            }
                        />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    const renderSection = () => {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {renderSectionOne()}
                </View>
            )
    }


    if(isLoading){
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }


    let TouchableComp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComp = TouchableNativeFeedback;
    }


    return (
        <Container style={styles.container} >
            <Content 
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={loadUsers} /> 
                } 
            >
                <View style={{ paddingTop: 20 }}>
                    {/** User Photo Stats**/}
                    <View style={{ flexDirection: 'row' }}>
                        {/**User photo takes 1/3rd of view horizontally **/}
                        <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image 
                                source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${currUser._id}?${new Date(currUser.updated)}` }}
                                onError={onImageErrorHandler}
                                style={{ width: 75, height: 75, borderRadius: 37.5, backgroundColor: "#c2c2c2" }}
                            />
                        </View>
                        {/**User Stats take 2/3rd of view horizontally **/}
                        <View style={{ flex: 3 }}>
                            {/** Stats **/}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableComp
                                        background={ Platform.OS === 'ios' ? undefined : TouchableNativeFeedback.Ripple('#c2c2c2', true) }
                                        onPress={() => props.navigation.navigate(
                                            'UserPosts', 
                                            { userId: userId, postIndex: 0, fromUserProfile: true }
                                        )}
                                    >
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ fontSize: 18 }} >{currUserPosts.length}</Text>
                                            <Text style={{ fontSize: 12, color: 'grey' }}>Posts</Text>
                                        </View>
                                    </TouchableComp>
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <TouchableComp
                                        background={ Platform.OS === 'ios' ? undefined : TouchableNativeFeedback.Ripple('#c2c2c2', true) }
                                        onPress={() => props.navigation.navigate(
                                            'UserStats',
                                            { activeTab: 0, currUser: currUser }
                                        )}
                                    >
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ fontSize: 18 }} >{currUser.followers.length}</Text>
                                            <Text style={{ fontSize: 12, color: 'grey' }}>Followers</Text>
                                        </View>
                                    </TouchableComp>
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <TouchableComp
                                        background={ Platform.OS === 'ios' ? undefined : TouchableNativeFeedback.Ripple('#c2c2c2', true) }
                                        onPress={() => props.navigation.navigate(
                                            'UserStats',
                                            { activeTab: 1, currUser: currUser }
                                        )}
                                    >
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ fontSize: 18 }} >{currUser.following.length}</Text>
                                            <Text style={{ fontSize: 12, color: 'grey' }}>Following</Text>
                                        </View>
                                    </TouchableComp>
                                </View>
                            </View>
                            {/**
                             * Edit profile and Settings Buttons **/}

                            { userId === loggedInUserId ? (
                                <View style={{ alignItems: 'flex-start', paddingTop: 10 }}>
                                    <View
                                        style={{ flexDirection: 'row' }}>
                                        <Button
                                            onPress={() => props.navigation.navigate('EditProfile')}
                                            bordered
                                            dark
                                            style={{ flex: 1, marginLeft: 10, marginRight: 10, justifyContent: 'center', height: 30 }}
                                        >
                                            <Text>Edit Profile</Text>
                                        </Button>
                                    </View>
                                </View>
                            ) : (
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}>
                                        <Button 
                                            onPress={followUserHandler}
                                            bordered 
                                            dark
                                            style={{ flex: 2, marginLeft: 10, marginRight: 10, justifyContent: 'center', height: 30 }}
                                        >
                                            { checkFollow(currUser._id) ? (
                                                <>
                                                    { isFollowLoading ? (
                                                        <ActivityIndicator size="small" color="#fff" />
                                                    ) : (
                                                        <Text style={{ color: 'black' }} >Unfollow</Text>
                                                    ) }
                                                </>
                                            ) : (
                                                <>
                                                    { isFollowLoading ? (
                                                        <ActivityIndicator size="small" color="#fff" />
                                                    ) : (
                                                        <Text style={{ color: 'black' }} >Follow</Text>
                                                    ) }
                                                </>
                                            ) }
                                        </Button>
                                    </TouchableOpacity>
                                </View>
                            ) }
                            {/**End edit profile**/}
                        </View>
                    </View>

                    <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                        <View style={{ paddingHorizontal: 10 }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{currUser.name} </Text>
                            { currUser.about && (
                                <Text>{currUser.about} </Text>
                            ) }
                            <Text>{currUser.email}</Text>
                        </View>
                    </View>
                </View>


                <View>
                    {renderSection()}
                </View>
            </Content>
        
        </Container >
    );
}





export const screenOptions = (navData) => {

    const routeParams = navData.route.params ? navData.route.params : {};
    if(!routeParams.name){
        return{
            headerTitle: routeParams.name ? routeParams.name : "Profile",
            headerRight: () => (
                <MenuItem />
            )
        }
    } else {
        return{
            headerTitle: routeParams.name ? routeParams.name : "Profile",
        }
    }

    
}




const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default UserProfileScreen;

