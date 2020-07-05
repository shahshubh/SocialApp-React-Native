import React from 'react';
import Colors from '../constants/Colors';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllPostsScreen from '../screens/post/AllPostsScreen';
import EditPostScreen from '../screens/post/EditPostScreen';
import SinglePostScreen from '../screens/post/SinglePostScreen';
import UserProfileScreen from '../screens/user/UserProfileScreen';
import AuthScreen from '../screens/auth/AuthScreen';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
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
                name="EditPost" 
                component={EditPostScreen} 
            />
            <PostStackNavigator.Screen 
                name="SinglePost" 
                component={SinglePostScreen} 
            />
        </PostStackNavigator.Navigator>
    );
};


const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
    return(
        <UserStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <UserStackNavigator.Screen 
                name="UserProfile"
                component={UserProfileScreen}
            />
        </UserStackNavigator.Navigator>
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
                component={AuthNavigator}
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
                component={PostNavigator}
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
                name="Profile"
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



const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
    return(
        <AuthStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthStackNavigator.Screen 
                name="Auth"
                component={AuthScreen}
            />
        </AuthStackNavigator.Navigator>
    );
}
