import { decData } from "../../../../helpers/decData";
import { getAllJobsEmployer } from "../../../../services/employers/jobsApi";

export const fetchApi = async (setData,valueStatus = "",keywords="") => {
    const result = await getAllJobsEmployer(valueStatus,keywords);
    if (result.code === 200) {
        
        setData(decData(result.data));
    }
};