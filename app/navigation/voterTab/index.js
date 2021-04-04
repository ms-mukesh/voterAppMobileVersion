import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import GaveVoteScreen from '../../screen/Election/voterTab/gaveVote'
import NotGaveVoteScreen from '../../screen/Election/voterTab/notGaveVote'
import React from "react";
import {SafeAreaView} from 'react-native'
import {StatusBar} from "expo-status-bar";
import {hp} from "../../helper/themeHelper";
const MyTabs = (props) => {
    const {ElectionId} = props.route.params;
    console.log("Election--",ElectionId)
    return (
        <SafeAreaView style={{flex:1,marginTop:hp(5)}}>

        <Tab.Navigator>
            <Tab.Screen name="Give Vote" children={()=><GaveVoteScreen electionId={ElectionId}/>} ElectionId={ElectionId} />
            <Tab.Screen name="Pending To Give Vote" children={()=><NotGaveVoteScreen electionId={ElectionId}/>} ElectionId={ElectionId} />
        </Tab.Navigator>

        </SafeAreaView>
    );
}
export default MyTabs;
