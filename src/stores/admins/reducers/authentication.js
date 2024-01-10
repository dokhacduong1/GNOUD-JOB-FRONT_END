const authenticationReducerAdmin = (state = false, action) => {
   switch (action.type) {
      case "CHECK_AUTH":
         return action.dataCheck;
      default:
         return state;
   }
}

export default authenticationReducerAdmin;