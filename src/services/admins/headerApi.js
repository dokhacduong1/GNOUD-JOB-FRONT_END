import {Get} from "../../utils/admins/request"

export const getCity = async ()=>{
    const result = await Get("",{},"https://provinces.open-api.vn/api/?depth=2");
    return result;
}

export const getCitySearch = async (code)=>{
    const result = await Get("",{},`https://provinces.open-api.vn/api/p/${code}?depth=2`);
    return result;
}
