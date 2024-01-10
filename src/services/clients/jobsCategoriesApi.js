import { Get } from "../../utils/clients/request";

export const getCountJobToOccupation = async ()=>{
    const result = await Get(`/job-categories/count-job`);
    return result;
}