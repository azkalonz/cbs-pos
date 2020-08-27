const { combineReducers } = require("redux");

const userInfo = (state = {}, payload) => {
  switch (payload.type) {
    case "SET_USER":
      return payload.user;
    default:
      return state;
  }
};

export default combineReducers({ userInfo });
