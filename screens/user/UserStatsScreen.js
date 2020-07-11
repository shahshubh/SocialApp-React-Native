import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { useDispatch, useSelector } from "react-redux";


import ListItem from '../../components/UI/ListItem';
import Colors from '../../constants/Colors';

const UserStatsScreen = (props) => {
    const { route } = props;

    const [activeTab, setActiveTab] = useState(route.params.activeTab);

    const followers = route.params.currUser.followers;
    const following = route.params.currUser.following;

    return(
        <View style={styles.screen} > 
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                <TouchableOpacity 
                    style={{ flex: 1 }}
                    onPress={() => setActiveTab(1)}
                >
                    <View style={{...styles.tab, borderBottomWidth: activeTab === 1 ? 2 : 0 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontWeight: 'bold' }} >{ followers.length }</Text>
                            <Text> Followers</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ flex: 1 }}
                    onPress={() => setActiveTab(2)}
                >
                    <View style={{...styles.tab, borderBottomWidth: activeTab === 2 ? 2 : 0 }} > 
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontWeight: 'bold' }} >{following.length}</Text>
                            <Text> Following</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            { activeTab === 1 && (
                <FlatList
                    data={followers}
                    keyExtractor={(item) => item._id}
                    renderItem={(user) => (
                        <ListItem user={user.item} />
                    )}
                />
            ) }
            { activeTab === 2 && (
                <FlatList
                    data={following}
                    keyExtractor={(item) => item._id}
                    renderItem={(user) => (
                        <ListItem user={user.item} />
                    )}
                />
            ) }
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tab: {
        borderBottomColor: 'black',
        alignItems: 'center' ,
        padding: 10
    },
})

export default UserStatsScreen;