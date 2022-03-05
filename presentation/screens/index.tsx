import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from './Main/BottomNavigation';
import EditProfileScreen from './Main/EditProfile';
import MapDetailScreen from './Main/MapDetail';
import MyPageScreen from './Main/Mypage';
import NoticeScreen from './Main/Notice';
import RecordScreen from './Main/Record';
import EmailInputScreen from './Signup/EmailInput';
import GreetScreen from './Signup/Greet';
import GroupCodeInputScreen from './Signup/GroupCodeInput';
import GroupCodeShareScreen from './Signup/GroupCodeShare';
import SignUpMainScreen from './Signup/Main';
import NicknameInputScreen from './Signup/NicknameInput';
import PasswordInputScreen from './Signup/PasswordInput';
import PhoneAuthScreen from './Signup/PhoneAuth';
import LoginScreen from './Signup/Login';
import PhoneInputScreen from './Signup/PhoneInput';

const Stack = createStackNavigator();

function Screens() {
  const isUserLoggedIn = false;
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="GroupCodeInput"
    >
      {!isUserLoggedIn && (
        <>
          <Stack.Screen name="SignUpMain" component={SignUpMainScreen} />
          <Stack.Screen name="EmailInput" component={EmailInputScreen} />
          <Stack.Screen name="Greet" component={GreetScreen} />
          <Stack.Screen
            name="GroupCodeInput"
            component={GroupCodeInputScreen}
          />
          <Stack.Screen
            name="GroupCodeShare"
            component={GroupCodeShareScreen}
          />
          <Stack.Screen name="NicknameInput" component={NicknameInputScreen} />
          <Stack.Screen name="PasswordInput" component={PasswordInputScreen} />
          <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
          <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
      <Stack.Screen name="Main" component={BottomNavigation} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="MapDetail" component={MapDetailScreen} />
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen name="Notice" component={NoticeScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
    </Stack.Navigator>
  );
}

export default Screens;
