import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import BottomNavigation from './Main/BottomNavigation';
import EditProfileScreen from './Main/EditProfile';
import MapDetailScreen from './Main/MapDetail';
import MyPageScreen from './Main/Mypage';
import NoticeScreen from './Main/Notice';
import RecordScreen from './Main/Record';
// import OnboardingScreen from './AppInit/Onboarding';
import EmailInputScreen from './Signup/EmailInput';
import GreetScreen from './Signup/Greet';
import GroupCodeCreateScreen from './Signup/GroupCodeCreate';
import GroupCodeInputScreen from './Signup/GroupCodeInput';
import GroupCodeShareScreen from './Signup/GroupCodeShare';
import LoginScreen from './Signup/Login';
import SignUpMainScreen from './Signup/Main';
import NicknameInputScreen from './Signup/NicknameInput';
import PasswordInputScreen from './Signup/PasswordInput';
import PhoneAuthScreen from './Signup/PhoneAuth';
import PhoneInputScreen from './Signup/PhoneInput';

const AppNavigator = createStackNavigator(
  {
    Main: { screen: BottomNavigation },
    SignUpMain: { screen: SignUpMainScreen },
    EmailInput: { screen: EmailInputScreen },
    Greet: { screen: GreetScreen },
    GroupCodeCreate: { screen: GroupCodeCreateScreen },
    GroupCodeInput: { screen: GroupCodeInputScreen },
    GroupCodeShare: { screen: GroupCodeShareScreen },
    NicknameInput: { screen: NicknameInputScreen },
    PasswordInput: { screen: PasswordInputScreen },
    PhoneInput: { screen: PhoneInputScreen },
    PhoneAuth: { screen: PhoneAuthScreen },
    Login: { screen: LoginScreen },
    EditProfile: { screen: EditProfileScreen },
    MapDetail: { screen: MapDetailScreen },
    MyPage: { screen: MyPageScreen },
    Notice: { screen: NoticeScreen },
    Record: { screen: RecordScreen },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
