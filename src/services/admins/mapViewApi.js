import { Get } from "../../utils/clients/request";
const token = "vkcyjsszDz3C7oH2ZOgtCnEolutz0VzA1nGKi5YU"
export const getMapPlaceIdToLocation = async (input) => {
    const result = await Get("",{},`https://rsapi.goong.io/Place/AutoComplete?api_key=${token}&input=${input}`);
    return result;
}
export const getMapLocationToPlaceId = async (place_id) => {
    const result = await Get("",{},`https://rsapi.goong.io/Place/Detail?api_key=${token}&place_id=${place_id}`);
    return result;
}