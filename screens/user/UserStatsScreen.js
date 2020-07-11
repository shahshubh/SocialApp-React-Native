import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ListItem from '../../components/UI/ListItem';
import Colors from '../../constants/Colors';

const UserStatsScreen = (props) => {
    const { route } = props;
    const followers = route.params.currUser.followers;
    const following = route.params.currUser.following;

    const [index, setIndex] = useState(route.params.activeTab);
    const [routes] = useState([
        { key: 'followers', title: `Followers`, count: followers.length },
        { key: 'following', title: `Following`, count: following.length },
    ]);
    

    const FollowersRoute = () => (
        <FlatList
            data={followers}
            keyExtractor={(item) => item._id}
            renderItem={(user) => (
                <ListItem user={user.item} />
            )}
        />
    );

    const FollowingRoute = () => (
        <FlatList
            data={following}
            keyExtractor={(item) => item._id}
            renderItem={(user) => (
                <ListItem user={user.item} />
            )}
        />
    );
    const initialLayout = { width: Dimensions.get('window').width };
    const renderScene = SceneMap({
        followers: FollowersRoute,
        following: FollowingRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            renderLabel={({ route, focused, color }) => (
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ fontWeight: 'bold' }} >{route.count}</Text>
                    <Text> {route.title}</Text>
                </View>
            )}
            indicatorStyle={{ backgroundColor: Colors.brightBlue }}
            style={{ backgroundColor: '#fff' }}
        />
    );

    return(
        <TabView
            style={{ backgroundColor: '#fff' }}
            navigationState={{ index , routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
        />
        // <View style={styles.screen} > 
        //     <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
        //         <TouchableOpacity 
        //             style={{ flex: 1 }}
        //             onPress={() => setActiveTab(1)}
        //         >
        //             <View style={{...styles.tab, borderBottomWidth: activeTab === 1 ? 2 : 0 }} >
        //                 <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        //                     <Text style={{ fontWeight: 'bold' }} >{ followers.length }</Text>
        //                     <Text> Followers</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity 
        //             style={{ flex: 1 }}
        //             onPress={() => setActiveTab(2)}
        //         >
        //             <View style={{...styles.tab, borderBottomWidth: activeTab === 2 ? 2 : 0 }} > 
        //                 <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        //                     <Text style={{ fontWeight: 'bold' }} >{following.length}</Text>
        //                     <Text> Following</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //     </View>
        //     { activeTab === 1 && (
        //         <FlatList
        //             data={followers}
        //             keyExtractor={(item) => item._id}
        //             renderItem={(user) => (
        //                 <ListItem user={user.item} />
        //             )}
        //         />
        //     ) }
        //     { activeTab === 2 && (
        //         <FlatList
        //             data={following}
        //             keyExtractor={(item) => item._id}
        //             renderItem={(user) => (
        //                 <ListItem user={user.item} />
        //             )}
        //         />
        //     ) }
        // </View>
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