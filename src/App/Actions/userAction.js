import * as Action from "./ActionCreater";
export const SignIn = (payload) => {
  return {
    type: Action.USER_LOGIN,
    payload,
  };
};

export const SignOut = () => {
  return {
    type: Action.USER_LOGOUT,
  };
};
