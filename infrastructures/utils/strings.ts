/* eslint-disable no-useless-escape */

export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  return emailRegex.test(email);
};

export const validateNickName = (nickName: string): boolean => {
  const nickNameRegex = /(^[0-9a-zA-Z,\.\*\_\-\+\?\!ㄱ-ㅎㅏ-ㅣ가-힣]*$)/;
  return nickNameRegex.test(nickName);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
