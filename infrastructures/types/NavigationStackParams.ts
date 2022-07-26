/* eslint no-undef: "off" */

export type NavigationStackParams = {
  SignUpMain: undefined;
  Login: undefined;
  EmailInput: {
    phoneNumber: string;
    countryCode: string;
    alarmStatus: boolean;
  };
  Greet: { nickname: string };
  GroupCodeInput: undefined;
  GroupCodeShare: { code: string };
  NicknameInput: {
    phoneNumber: string;
    countryCode: string;
    email: string;
    password: string;
    alarmStatus: boolean;
  };
  PasswordInput: {
    userInformation?: {
      phoneNumber: string;
      countryCode: string;
      email: string;
      alarmStatus: boolean;
    };
  };
  PasswordIssue: { phoneNumber: string };
  PhoneInput: undefined | { forPassword: boolean };
  PhoneAuth:
    | { phoneNumber: string; countryCode: string; alarmStatus: boolean }
    | { phoneNumber: string; countryCode: string; forPassword: boolean };
  Main: { screen: 'Home' | 'Map' | 'Feed' };
  EditProfile: undefined;
  MapDetail: {
    nickname: string;
    profileImgUrl: string;
    familyDistance: number;
    myDistance: number;
  };
  MyPage: undefined;
  Notice: undefined;
  Record:
    | undefined
    | {
        category: string;
        question: string;
        feedID: number;
        content: string;
        type: string;
      }
    | { category: string; question: string };
  Home: undefined;
  Map: undefined;
  Feed: undefined;
  Onboarding: undefined;
  PhoneAuthFromMypage: undefined;
  PhoneInputFromMypage: undefined;
  GroupCodeReissue: undefined;
  PasswordChange: undefined;
};
