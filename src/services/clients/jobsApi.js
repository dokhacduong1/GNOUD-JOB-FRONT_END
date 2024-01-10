import { Get} from "../../utils/clients/request"

export const getListJobs = async ()=>{
    const result = await Get("/jobs");
    return result;
}

export const getListJobsFeatured = async (page=1)=>{
    const result = await Get(`/jobs?page=${page}&limit=8&featured=true`);
    return result;
}


export const getListJobsSalarys = async (page=1)=>{
    const result = await Get(`/jobs?page=${page}&limit=8&salaryKey=gt&salaryValue=1000&sortKey=salary&sortValue=desc`);
    return result;
}

export const getListJobsLevels = async (page=1)=>{
    const result = await Get(`/jobs?page=${page}&limit=8&jobLevel=Intern&sortKey=salary&sortValue=desc`);
    return result;
}

export const getListJobsOccupation = async (CategoriesKey,page=1)=>{
    const result = await Get(`/jobs?page=${page}&limit=3&jobCategoriesKey=${CategoriesKey}`);
    return result;
}