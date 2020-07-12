import React, {useState,useEffect, useCallback} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import UserList from '../../components/UI/UserList';
import { useDispatch, useSelector } from 'react-redux';
import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';

import ENV from '../../env';
import { Button } from 'native-base';

const FindPeopleScreen = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const findPeopleUsers = useSelector(state => state.users.findPeople);
    const dispatch = useDispatch();


    const loadFindPeople = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchFindPeopleUsers());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])



    
    useEffect(() => {
        setIsLoading(true);
        loadFindPeople()
        .then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadFindPeople])



    if(error){
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadFindPeople} color={Colors.primary} />
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


    if(!isLoading && findPeopleUsers.length === 0){
        return(
            <View style={styles.centered} >
                <Text>No users found. You are following all the users.</Text>
                <Button onPress={loadFindPeople} >
                    <Text>Refresh</Text>
                </Button>
            </View>
        );
    }



    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                refreshing={isRefreshing}
                onRefresh={loadFindPeople}
                contentContainerStyle={styles.listContainer}
                data={findPeopleUsers}
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => {
                    return item._id;
                }}
                renderItem={({ item }) => (
                    <UserList item={item} />
                )} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
        alignItems: 'center'
    },
});

export default FindPeopleScreen;