export const authenticationClient= (status,infoUser= {})=>{

    return{
        type:"CHECK_AUTH_CLIENT",
        dataCheck:{
            status,
            infoUser
        }
    }
}
