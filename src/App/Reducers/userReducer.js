import * as Action from "../Actions/ActionCreater";
const User = {
  name: "",
  email: "",
  photo: "",
};
const UserRed = (state = User, action) => {
  switch (action.type) {
    case Action.USER_LOGIN:
      return {
        name: action.payload.name,
        email: action.payload.email,
        photo: action.payload.photo,
      };
    case Action.USER_LOGOUT:
      return {
        name: null,
        email: null,
        photo: null,
      };
    default:
      return state;
  }
};

export default UserRed;
