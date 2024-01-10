export const authenticationAdmin= (status,infoUser= {})=>{

    return{
        type:"CHECK_AUTH",
        dataCheck:{
            status,
            infoUser
        }
    }
}
