import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Platform, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch } from 'react-redux';
import * as postActions from '../../store/actions/posts';

const Card = React.memo(function CardComponent(props){
    const { post, userId } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // const liked = post.likes.indexOf(userId) !== -1;

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${post.postedBy._id}`)
    const [showFullBody, setShowFullBody] = useState(false);
    const [isLiked, setIsLiked] = useState(post.likes.indexOf(userId) !== -1);
    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?', 
            'Do you really want to delete this post?',
            [
                {text: 'No', style: 'default'},
                {
                    text: 'Yes', 
                    style: 'destructive', 
                    onPress: () => {
                        dispatch(postActions.deletePost(id))
                    }
                }
            ]
        )
    };


    const toggleLike = async () => {
        props.toggleLikeHandler(post._id, isLiked);
        setIsLiked(prevState => !prevState);
    }

    return (
        <View style={styles.screen} >
            <View style={styles.card}>
                <View style={styles.cardTitleHeader}>
                    <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }} >
                        <View style={styles.timeContainer}>
                            <Image
                                style={styles.userIcon} 
                                source={{ uri: imageUri }}
                                onError={onImageErrorHandler}
                            />
                            <Text style={{ marginLeft: 5, marginTop: 3 }} > {post.postedBy.name} </Text>
                        </View>
                        <View style={{ position: 'absolute', right: 0, display: 'flex', flexDirection: 'row'}}>
                            <Ionicons 
                                name={ Platform.OS === 'android' ? 'md-time' : 'ios-time' }
                                size= {14}
                                style={{ marginTop: 3 }}
                            />
                            <Text> {timeDifference(new Date(), new Date(post.created))} </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardImageContainer} >
                    <Image 
                        style={styles.cardImage}
                        source={ 
                            post.updated ? (
                                { uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date().getMinutes()}` }
                            ) : (
                                { uri: `${ENV.apiUrl}/post/photo/${post._id}` }
                            )
                        }
                        onLoad={() => setIsImageLoading(false)}
                    />
                    <ActivityIndicator 
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} 
                        animating={isImageLoading} 
                        size='large' 
                        color={Colors.brightBlue} 
                    />
                </View>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.title}>{post.title}</Text>
                        { post.body.length > 30 ? (
                            <View>
                                { showFullBody ? (
                                    <Text style={styles.description}> 
                                        {post.body} 
                                        <Text onPress={() => setShowFullBody((prevState) => !prevState)} >
                                            ...Read Less
                                        </Text>
                                    </Text>
                                ) : (
                                    <Text style={styles.description}> 
                                        {post.body.substring(0, 30)}
                                        <Text onPress={() => setShowFullBody((prevState) => !prevState)} >
                                            ...Read More
                                        </Text>
                                    </Text>
                                ) }

                            </View>
                        ) : (
                            <Text style={styles.description}> {post.body} </Text>
                        ) }
                        
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity 
                                style={styles.socialBarButton}
                                onPress={toggleLike}
                            >
                                <Ionicons 
                                    name="md-thumbs-up"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                    color={isLiked ? 'blue' : "black"}
                                />
                                <Text style={styles.socialBarLabel}> {post.likes.length} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity 
                                style={styles.socialBarButton}
                                onPress={() => navigation.navigate('Comments',{ postId: post._id, userId: userId })}
                            >
                                <Ionicons 
                                    name="md-chatboxes"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={styles.socialBarLabel}> {post.comments.length} </Text>
                            </TouchableOpacity>
                        </View>
                        
                        
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId })}
                >
                    { post.comments.length > 0 ? (
                        <Text style={{ paddingHorizontal: 16, paddingBottom: 15, paddingTop: 5 }} >View all {post.comments.length} comments </Text>
                    ) : (
                        <Text style={{ paddingHorizontal: 16, paddingBottom: 15, paddingTop: 5 }} >Comment here </Text>
                    ) }
                </TouchableOpacity>
                { post.postedBy._id === userId && (
                    <View style={styles.postActions} >
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity 
                                style={styles.socialBarButton}
                                onPress={deleteHandler.bind(this, post._id)}
                            >
                                <MaterialCommunityIcons 
                                    name="delete"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                    color="red"
                                />
                                <Text style={styles.socialBarLabel}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity 
                                style={styles.socialBarButton}
                                onPress={() => navigation.navigate('EditPost', { postId: post._id })}
                            >
                                <MaterialCommunityIcons 
                                    name="square-edit-outline"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                    color={Colors.lightAccent}
                                />
                                <Text style={styles.socialBarLabel}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    userIcon: {
        height: 30,
        width: 30,
        borderRadius: 30
    },
    card: {
        width: '100%',
        elevation: 6,
        shadowColor: 'black',

        shadowOffset: {
            width: 2,
            height: 5
        },
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white"
    },
    cardTitleHeader: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHeader: {
        paddingTop: 0,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImageContainer: { 
        backgroundColor: '#c2c2c2', 
        flex: 1, 
        display: 'flex',
        height: 275 
    },
    cardImage: {
        flex: 1,
        height: 275,
        width: null
    },
    /******** card components **************/
    title: {
        fontSize: 18,
        flex: 1,
    },
    description: {
        fontSize: 15,
        color: "#888",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5
    },
    timeContainer: {
        flexDirection: 'row'
    },
    /******** social bar ******************/
    socialBarContainer: {
        flexDirection: 'row'
    },
    socialBarSection: {
        marginRight: 20
    },
    socialBarlabel: {
        marginLeft: 20
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postActions: {
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 15,
    }
})

export default Card;