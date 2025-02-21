import {Get} from "../../utils/admins/request"

export const getCity = async ()=>{
    const result = await Get("",{},"https://api-city-vn-beta.vercel.app/api/v1/duongits/city");
    return result;
}

export const getCitySearch = async (code)=>{
    const result = await Get("",{},`https://api-city-vn-beta.vercel.app/api/v1/duongits/district/${code}`);
    return result;
}
