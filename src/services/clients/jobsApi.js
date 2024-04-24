import { getCookie } from "../../helpers/cookie";
import { Get, Post } from "../../utils/clients/request"
import { AuthGet, AuthPost } from "../../utils/clients/requestAuth";

const checkToken = getCookie("token-user") || "";
export const getListJobs = async () => {
    const result = await Get("/jobs");
    return result;
}

export const getListJobsFeatured = async (page = 1, select = "") => {
    const result = await Get(`/jobs?page=${page}&limit=8&featured=true&selectItem=${select}`);
    return result;
}


export const getListJobsSalarys = async (page = 1, select = "") => {
    const result = await Get(`/jobs?page=${page}&limit=8&salaryKey=gt&salaryValue=20000000&sortKey=salaryMax&sortValue=desc&selectItem=${select}`);
    return result;
}

export const getListJobsLevels = async (page = 1, select = "") => {
    const result = await Get(`/jobs?page=${page}&limit=8&workExperience=no-required&sortKey=salary&sortValue=desc&selectItem=${select}`);
    return result;
}

export const getListJobsOccupation = async (CategoriesKey, page = 1, select = "") => {
    const result = await Get(`/jobs?page=${page}&limit=3&jobCategoriesKey=${CategoriesKey}&selectItem=${select}`);
    return result;
}
export const getJobSearch = async (slug = "") => {
    const result = await Get(`/jobs/search-job/${slug}`);
    return result;
}
export const getJobByCategoriesCorresponding = async (listId = []) => {
    const result = await Post(`/jobs/job-by-categories`, listId);
    return result;
}
export const getJobSearchPosition = async (value) => {
    const result = await Get(`/jobs/search-position?keyword=${value}`);
    return result;
}
export const getJobAdvancedSearch = async (page = 1, limit = 10, sort_key = "", sort_value = "", keyword = "", job_categorie = "", job_type = "", job_level = "", salary_min = "", salary_max = "",city="",workExperience="",select="") => {

    const result = await Get(`/jobs/advanced-search?page=${page}&limit=${limit}&sort_key=${sort_key}&sort_value=${sort_value}&keyword=${keyword}&job_categories=${job_categorie}&job_type=${job_type}&job_level=${job_level}&salary_min=${salary_min}&salary_max=${salary_max}&workExperience=${workExperience}&city=${city}&selectItem=${select}`);
    return result;
}
export const getMayBeInterested = async (value) => {
    const result = await Post(`/jobs/may-be-interested`, value);
    return result;
}
export const userViewJob = async (data) => {
    const result = await Post(`/jobs/user-view-job`,data);
    return result;
}
export const getPdfToDriverClient = async (data)=>{
    const result = await AuthPost(`/jobs/get-pdf`,data,checkToken);
    return result;
}
export const jobApplyUser = async (status="",page=1)=>{
    const result = await AuthGet(`/jobs/job-apply?status=${status}&page=${page}`,checkToken);
    return result;
}
export const jobSaveUser = async (sort_key="",page=1)=>{
    const result = await AuthGet(`/jobs/job-save?sortKey=${sort_key}&sortValue=desc&page=${page}`,checkToken);
    return result;
}
export const jobByCompany = async (slug="",page=1,keyword="",city_select="")=>{
    const result = await AuthGet(`/jobs/job-by-company/${slug}?page=${page}&keyword=${keyword}&city=${city_select}`,checkToken);
    return result;
}