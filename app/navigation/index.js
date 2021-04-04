import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import IntroductionScreen from '../screen/dummy';
import Login from '../screen/authentication/login';
import Home from '../screen/home/dashboard'
import Drawer from '../navigation/drawer/'
import EditProfilePage from '../screen/home/editProfile';
import SplashScreen from '../screen/authentication/splashscreen'
import VoterEditPage from '../screen/volunteer/voterDetail'
import VoterList from "../screen/home/dashboard";
import MemberDetail from "../screen/home/memberDetails"
import Temp from "../screen/home/dashboard";
import AddnewVoter from '../screen/NewVoter/addNewVoter'
import AddNewFamily from '../screen/NewVoter/selectFamily'
const Stack = createStackNavigator();
const App = () => {
    // eslint-disable-next-line no-console
    // console.disableYellowBox = true;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Temp" component={Temp} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Drawer" component={Drawer} />
                <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
                <Stack.Screen name="VoterEditPage" component={VoterEditPage} />
                <Stack.Screen name="VoterList" component={VoterList} />
                <Stack.Screen name="MemberDetail" component={MemberDetail} />
                <Stack.Screen name="AddnewVoter" component={AddnewVoter} />
                <Stack.Screen name="AddNewFamily" component={AddNewFamily} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
