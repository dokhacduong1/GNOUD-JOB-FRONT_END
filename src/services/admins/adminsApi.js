import { Post} from "../../utils/admins/request"
import { AuthPost } from "../../utils/admins/requestAuth";
const API_PATCH = "/admins"
export const loginAdmin = async (data)=>{
    const result = await Post(API_PATCH+`/login`,data);
    return result;
}

export const checkAuthenAccountAdmin = async (data,token)=>{
    const result = await AuthPost(API_PATCH+"/authen",data,token);
    return result;
}
export const getInfo = async (data={},token)=>{
    const result = await AuthPost(API_PATCH+"/info",data,token);
    return result;
}