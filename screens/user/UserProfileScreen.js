import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from "react-native";

import { Container, Content, Button } from 'native-base'
var { height, width } = Dimensions.get('window');

var images = [
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
]

const UserProfileScreen = () => {

    const renderSectionOne = () => {
        return images.map((image, index) => {
            return (
                <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                    <Image 
                        style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined,
                        }}
                        source={{ uri: image}}
                    />
                </View>
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

    return (
        <Container style={styles.container}>
            <Content>
                <View style={{ paddingTop: 20 }}>
                    {/** User Photo Stats**/}
                    <View style={{ flexDirection: 'row' }}>
                        {/**User photo takes 1/3rd of view horizontally **/}
                        <View
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image 
                                source={require('../../assets/buildericon.png')}
                                style={{ width: 75, height: 75, borderRadius: 37.5 }} 
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
                                }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>20</Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>205</Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>167</Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
                                </View>
                            </View>
                            
                            {/**Edit profile and Settings Buttons **/}
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                <View
                                    style={{ flexDirection: 'row' }}>
                                    {/** Edit profile takes up 3/4th **/}
                                    <Button bordered dark
                                        style={{ flex: 2, marginLeft: 10, justifyContent: 'center', height: 30 }}><Text>Edit Profile</Text></Button>
                                    <Button 
                                        bordered 
                                        dark
                                        style={{ flex: 2, marginLeft: 10, marginRight: 10, backgroundColor: 'red', justifyContent: 'center', height: 30 }}
                                    >
                                        <Text>Delete Profile</Text>
                                    </Button>
                                </View>
                            </View>{/**End edit profile**/}
                        </View>
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Varun Nath</Text>
                            <Text>Lark | Computer Jock | Commercial Pilot</Text>
                            <Text>www.unsureprogrammer.com</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default UserProfileScreen;

