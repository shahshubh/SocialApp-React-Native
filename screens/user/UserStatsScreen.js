import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
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
    );
};

export const screenOptions = {
    headerTitle: 'Stats'
}

export default UserStatsScreen;