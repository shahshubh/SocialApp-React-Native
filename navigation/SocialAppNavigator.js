import React from 'react';
import Colors from '../constants/Colors';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllPostsScreen from '../screens/post/AllPostsScreen';
import EditPostScreen from '../screens/post/EditPostScreen';
import SinglePostScreen from '../screens/post/SinglePostScreen';
import CommentsScreen from '../screens/post/CommentsScreen';
import AddPostScreen from '../screens/post/AddPostScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import FindPeopleScreen from '../screens/user/FindPeopleScreen';

import AuthScreen, {screenOptions as authScreenOptions} from '../screens/auth/AuthScreen';
import ForgotPasswordScreen, {screenOptions as forgotPasswordScreenOptions} from '../screens/auth/ForgotPasswordScreen';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.brightBlue : ''
    },
    // headerTitle: {
    //     fontFamily: 'open-sans-bold'
    // },
    // headerBackTitleStyle: {
    //     fontFamily: 'open-sans'
    // },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const PostStackNavigator = createStackNavigator();

const PostNavigator = () => {
    return(
        <PostStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <PostStackNavigator.Screen 
                name="AllPosts" 
                component={AllPostsScreen}
            />
            <PostStackNavigator.Screen 
                name="SinglePost" 
                component={SinglePostScreen} 
            />
            <PostStackNavigator.Screen 
                name="UserProfile"
                component={UserProfileScreen} 
            />
            <PostStackNavigator.Screen
                name="Comments"
                component={CommentsScreen} 
            />
            <PostStackNavigator.Screen 
                name="EditPost" 
                component={EditPostScreen} 
            />
        </PostStackNavigator.Navigator>
    );
};



const FindPeopleStackNavigator = createStackNavigator();

const FindPeopleNavigator = () => {
    return(
        <PostStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <PostStackNavigator.Screen 
                name="Find" 
                component={FindPeopleScreen} 
            />
        </PostStackNavigator.Navigator>
    );
};


const CreatePostStackNavigator = createStackNavigator();

const CreatePostNavigator = () => {
    return(
        <CreatePostStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <CreatePostStackNavigator.Screen
                name="CreatePost"
                component={AddPostScreen}
            />
        </CreatePostStackNavigator.Navigator>
    );
};



const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
    return(
        <UserStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <UserStackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </UserStackNavigator.Navigator>
    );
};


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return(
        <AuthStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthStackNavigator.Screen 
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen 
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={forgotPasswordScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};







const BottomTabNavigator = createBottomTabNavigator();

export const BottomNavigator = () => {
    return(
        <BottomTabNavigator.Navigator
            tabBarOptions={{
                activeTintColor: Colors.primary
            }}
        >
            <BottomTabNavigator.Screen 
                name="Home"
                component={PostNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={ Platform.OS === 'android' ? 'md-home' : 'ios-home' }
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />
            <BottomTabNavigator.Screen 
                name="FindPeople"
                component={FindPeopleNavigator}
                options={{
                    tabBarLabel: 'Find People',
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={ Platform.OS === 'android' ? 'md-people' : 'ios-people' }
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />

            <BottomTabNavigator.Screen 
                name="AddPost"
                component={CreatePostNavigator}
                options={{
                    tabBarLabel: 'Add Post',
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={ Platform.OS === 'android' ? 'md-add-circle-outline' : 'ios-add-circle-outline' }
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />

            <BottomTabNavigator.Screen 
                name="YourProfile"
                component={UserNavigator}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={ Platform.OS === 'android' ? 'md-person' : 'ios-person' }
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            />
            
        </BottomTabNavigator.Navigator>
    );
};
