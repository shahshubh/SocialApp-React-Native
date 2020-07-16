import React, {useState,useEffect, useCallback} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import UserList from '../../components/UI/UserList';
import { useDispatch, useSelector } from 'react-redux';
import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';

import { Container, Header, Item, Input, Icon, Button } from 'native-base';

const FindPeopleScreen = (props) => {

    const findPeopleUsers = useSelector(state => state.users.findPeople);

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);

    const dispatch = useDispatch();


    const loadFindPeople = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            const result = await dispatch(usersActions.fetchFindPeopleUsers());
            setData(result);
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


    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', e => {
    //         setSearchText('');
    //         setData(findPeopleUsers);
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [])


    const handleSearchTextChange = (text) => {
        setSearchText(text);
        if(text !== ''){
            let filteredData = []
            let currData = findPeopleUsers;

            filteredData = currData.filter(item => {
                const lc = item.name.toLowerCase();
                text = text.toLowerCase();
                return lc.includes(text);
            });
            setData(filteredData);
        } else {
            setData(findPeopleUsers);
        }
    }


    const followHandlerForData = (id) => {
        //follow handler to remove item from search data i.e. data state
        let searchData = data;
        searchData = searchData.filter(i => i._id !== id);
        setData(searchData);
    }



    if(error){
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
                <Button onPress={loadFindPeople} color={Colors.primary} >
                    <Text>Try again</Text>
                </Button>
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

    return (
        <Container style={{ backgroundColor: '#fff' }} >
            <Header style={{ backgroundColor: Colors.brightBlue }} searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        value={searchText}
                        onChangeText={(text) => handleSearchTextChange(text)}
                        placeholder="Search" 
                    />
                    <Icon name="ios-people" />
                </Item>
            </Header>
            { data.length === 0 && (
                <View style={styles.centered}>
                    <Text style={{ fontSize: 18, margin: 10 }} >No users found.</Text>
                    <Text>Either you are already following the user</Text>
                    <Text>or no user exists with that name.</Text>
                </View>
            ) }
            <FlatList
                style={styles.list}
                refreshing={isRefreshing}
                onRefresh={loadFindPeople}
                contentContainerStyle={styles.listContainer}
                data={data}
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => {
                    return item._id;
                }}
                renderItem={({ item }) => (
                    <UserList item={item} followHandler={followHandlerForData} />
                )} 
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30
    },
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 5,
        // backgroundColor: "#E6E6E6",
        backgroundColor: '#fff'
    },
    listContainer: {
        alignItems: 'center'
    },
});

export default FindPeopleScreen;