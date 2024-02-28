const authenticationReducerClient = (state = {}, action) => {
   switch (action.type) {
      case "CHECK_AUTH_CLIENT":
         return action.dataCheck;
      default:
         return state;
   }
}

export default authenticationReducerClient;