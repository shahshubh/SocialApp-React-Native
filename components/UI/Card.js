import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { timeDifference } from '../../helpers/timeDifference';

import ENV from '../../env';

let x = 0;

const Card = (props) => {
    const { post } = props;
    const navigation = useNavigation();

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${post.postedBy._id}`)
    const [showFullBody, setShowFullBody] = useState(false);

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
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
                <Image 
                    style={styles.cardImage} 
                    source={{ uri: `${ENV.apiUrl}/post/photo/${post._id}` }}
                    onLoad={() => setIsImageLoading(false)}
                />
                { isImageLoading && (
                    <ActivityIndicator style={{ position: 'absolute', top: '40%', left: '40%' }} size='large' />
                )}
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
                            <TouchableOpacity style={styles.socialBarButton}>
                                <Ionicons 
                                    name="md-thumbs-up"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                />
                                <Text style={styles.socialBarLabel}> {post.likes.length} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
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
                        onPress={() => navigation.navigate('Comments', { comments: post.comments })}
                    >
                        { post.comments.length > 0 ? (
                            <Text style={{ paddingHorizontal: 16, paddingBottom: 15, paddingTop: 5 }} >View all {post.comments.length} comments </Text>
                        ) : (
                            <Text style={{ paddingHorizontal: 16, paddingBottom: 15, paddingTop: 5 }} >Comment here </Text>
                        ) }
                    </TouchableOpacity>


            </View>

        </View>
    );
};

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
        paddingTop: 17,
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
    cardImage: {
        flex: 1,
        height: 275,
        width: null,
        backgroundColor: '#c2c2c2'
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
    }
})

export default Card;