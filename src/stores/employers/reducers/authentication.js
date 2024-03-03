const authenticationReducerEmployer = (state = {}, action) => {
  
    switch (action.type) {
       case "CHECK_AUTH_EMPLOYER":
          return action.dataCheck;
       default:
          return state;
    }
 }
 
 export default authenticationReducerEmployer;