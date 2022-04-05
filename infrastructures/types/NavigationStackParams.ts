/* eslint no-undef: "off" */

export type NavigationStackParams = {
  SignUpMain: undefined;
  Login: undefined;
  EmailInput: {
    phoneNumber: string;
    countryCode: string;
    alarmStatus: boolean;
  };
  Greet: { nickname: string } | undefined;
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
    phoneNumber: string;
    countryCode: string;
    email: string;
    alarmStatus: boolean;
  };
  PhoneInput: undefined;
  PhoneAuth: { phoneNumber: string; countryCode: string; alarmStatus: boolean };
  Main: { screen: 'Home' | 'Map' | 'Feed' };
  EditProfile: { nickname: string };
  MapDetail: { nickname: string; profileImgUrl: string; heartDistance: number };
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
  PasswordFind: undefined;
  PhoneAuthFromMypage: undefined;
  PhoneInputFromMypage: undefined;
  GroupCodeShareFromMap: undefined | { code: string };
};
