/* eslint no-undef: "off" */

export type NavigationStackParams = {
  SignUpMain: undefined;
  Login: undefined;
  EmailInput: undefined;
  Greet: { nickname: string };
  GroupCodeInput: undefined;
  GroupCodeShare: { code: string };
  NicknameInput: undefined;
  PasswordInput: undefined;
  PhoneInput: undefined;
  PhoneAuth: undefined;
  Main: { screen: 'Home' | 'Map' | 'Feed' };
  EditProfile: undefined;
  MapDetail: undefined;
  MyPage: undefined;
  Notice: undefined;
  Record: undefined | { category: string; question: string };
  Home: undefined;
  Map: undefined;
  Feed: undefined;
  Onboarding: undefined;
  PasswordFind: undefined;
  PhoneAuthFromMypage: undefined;
  PhoneInputFromMypage: undefined;
  GroupCodeShareFromMap: undefined | { code: string };
};
// questionID: number