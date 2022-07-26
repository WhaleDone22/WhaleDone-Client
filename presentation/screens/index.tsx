import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Analytics from 'expo-firebase-analytics';
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
import OnboardingScreen from './AppInit/Onboarding';
import GroupCodeReissueScreen from './Main/GroupCodeReissue';
import PasswordIssueScreen from './Signup/PasswordIssue';
import PasswordChangeScreen from './Main/PasswordChange';

const Stack = createStackNavigator();

function Screens() {
  const [userState, setUserState] = useState<{
    isLoggedIn: boolean;
    isJoinedFamily: boolean;
    isOnboardingUnseen: boolean;
  }>({
    isLoggedIn: false,
    isJoinedFamily: false,
    isOnboardingUnseen: true,
  });
  useEffect(() => {
    AsyncStorage.getItem('isOnboardingUnseen').then((seen) => {
      setUserState((prev) => ({
        ...prev,
        isOnboardingUnseen: seen === null,
      }));
    });
    AsyncStorage.getItem('token').then((token) => {
      setUserState((prev) => ({ ...prev, isLoggedIn: token !== null }));
    });
    AsyncStorage.getItem('familyID').then((familyID) => {
      setUserState((prev) => ({
        ...prev,
        isJoinedFamily: familyID !== null && parseFloat(familyID) !== -1,
      }));
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
      screenListeners={{
        state: (e) =>
          Analytics.logEvent('screen_change', {
            from: e.data?.state?.routes[0]?.name,
            to: e.data?.state?.routes[1]?.name,
          }),
      }}
    >
      {userState.isOnboardingUnseen && (
        <Stack.Screen name="Onboarding">
          {({ navigation, route }: { navigation: any; route: any }) => (
            <OnboardingScreen
              navigation={navigation}
              route={route}
              setOnboardingSeen={() =>
                setUserState((prev) => ({
                  ...prev,
                  isOnboardingUnseen: false,
                }))
              }
            />
          )}
        </Stack.Screen>
      )}
      {!userState.isLoggedIn && (
        <>
          <Stack.Screen name="SignUpMain" component={SignUpMainScreen} />
          <Stack.Screen name="Login">
            {({ navigation, route }: { navigation: any; route: any }) => (
              <LoginScreen
                navigation={navigation}
                route={route}
                setLogin={(hasFamily: boolean) =>
                  setUserState((prev) => ({
                    ...prev,
                    isLoggedIn: true,
                    isJoinedFamily: hasFamily,
                  }))
                }
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="EmailInput" component={EmailInputScreen} />
          <Stack.Screen name="NicknameInput">
            {({ navigation, route }: { navigation: any; route: any }) => (
              <NicknameInputScreen
                navigation={navigation}
                route={route}
                setLogin={() =>
                  setUserState((prev) => ({ ...prev, isLoggedIn: true }))
                }
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="PasswordInput" component={PasswordInputScreen} />
          <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
          <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
          <Stack.Screen name="PasswordIssue" component={PasswordIssueScreen} />
        </>
      )}
      {userState.isLoggedIn && !userState.isJoinedFamily && (
        <>
          <Stack.Screen
            name="Greet"
            component={GreetScreen}
            initialParams={{ nickname: '' }}
          />
          <Stack.Screen name="GroupCodeInput">
            {({ navigation, route }: { navigation: any; route: any }) => (
              <GroupCodeInputScreen
                navigation={navigation}
                route={route}
                setJoinFamily={() =>
                  setUserState((prev) => ({ ...prev, isJoinedFamily: true }))
                }
              />
            )}
          </Stack.Screen>
        </>
      )}
      {userState.isLoggedIn && userState.isJoinedFamily && (
        <>
          <Stack.Screen name="Main" component={BottomNavigation} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="MapDetail" component={MapDetailScreen} />
          <Stack.Screen
            name="GroupCodeShare"
            component={GroupCodeShareScreen}
          />
          <Stack.Screen
            name="GroupCodeReissue"
            component={GroupCodeReissueScreen}
          />
          <Stack.Screen name="MyPage">
            {({ navigation, route }: { navigation: any; route: any }) => (
              <MyPageScreen
                navigation={navigation}
                route={route}
                resetUserState={() =>
                  setUserState((prev) => ({
                    ...prev,
                    isLoggedIn: false,
                    isJoinedFamily: false,
                  }))
                }
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Notice" component={NoticeScreen} />
          <Stack.Screen name="Record" component={RecordScreen} />
          <Stack.Screen
            name="PhoneAuthFromMypage"
            component={PhoneAuthScreen}
          />
          <Stack.Screen
            name="PhoneInputFromMypage"
            component={PhoneInputScreen}
          />
          <Stack.Screen
            name="PasswordChange"
            component={PasswordChangeScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Screens;
