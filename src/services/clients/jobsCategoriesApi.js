import { Get } from "../../utils/clients/request";

export const getCountJobToOccupation = async ()=>{
    const result = await Get(`/job-categories/count-job`);
    return result;
}
export const getAllJobsCategories = async (valueStatus = "",keyword="",sortKey="",sortValue ="",tree ="false")=>{
    const result = await Get(`/job-categories?findAll=true&status=${valueStatus}&keyword=${keyword}&sortKey=${sortKey}&sortValue=${sortValue}&tree=${tree}`);
    return result;
}
