export const authenticationEmployer= (status,infoUserEmployer= {})=>{

    return{
        type:"CHECK_AUTH_EMPLOYER",
        dataCheck:{
            status,
            infoUserEmployer
        }
    }
}
