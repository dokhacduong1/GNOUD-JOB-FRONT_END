import { getCookie } from "../../helpers/cookie";
import { AuthPost } from "../../utils/locations/requestAuth";
const checkToken = getCookie("token-employer") || "";
export const geAreaDetail= async (keyword)=>{
    const result = await AuthPost(`/get_area_deltail`,keyword,checkToken);
    return result;
}
export const getDetailedAddress= async (arr)=>{
    const result = await AuthPost(`/get-detailed-address`,arr,checkToken);
    return result;
}
export const getCoordinateAddress= async (placeid="")=>{
    const result = await AuthPost(`/coordinate`,placeid,checkToken);
    return result;
}
export const getFullAddress= async (keyword={})=>{
    const result = await AuthPost(`/get-full-address`,keyword,checkToken);
    return result;
}