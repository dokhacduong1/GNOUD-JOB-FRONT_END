import { decData } from "../../../../helpers/decData";
import { getJobAdvancedSearch } from "../../../../services/clients/jobsApi";
import { getAllJobsCategories } from "../../../../services/clients/jobsCategoriesApi";

export const fetchApi = async (setJobCategories, setRecordItem, page, limit, sort_key, sort_value, keyword, job_categorie, job_type, job_level, salary_min, salary_max,setCoutJob) => {
  const [resultgetAllJobsCategories, resultgetJobAdvancedSearch] = await Promise.all([
    getAllJobsCategories(),
    getJobAdvancedSearch(page, limit, sort_key, sort_value, keyword, job_categorie, job_type, job_level, salary_min, salary_max)
  ]);
  
  if (resultgetAllJobsCategories.code === 200) {
    const convertData = decData(resultgetAllJobsCategories.data).map((item) => {
      return {
        value: item._id,
        label: item.title,
      };
    });
    convertData.unshift({ value: "", label: "Tất cả lĩnh vực" });
    setJobCategories(convertData);
  }

  if (resultgetJobAdvancedSearch.code === 200) {

    setCoutJob(resultgetJobAdvancedSearch.countJobs);
    const convertDataRecord = decData(resultgetJobAdvancedSearch.data);
    setRecordItem(convertDataRecord);
  }
}

export const reloadData = async (setJobCategories, setRecordItem, page, limit, sort_key, sort_value, keyword, job_categorie, job_type, job_level, salary_min, salary_max) => {
  const result = await getJobAdvancedSearch(page, limit, sort_key, sort_value, keyword, job_categorie, job_type, job_level, salary_min, salary_max);
  if (result.code === 200) {
    const data = decData(result.data);
    setRecordItem(data);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tùy chọn, để làm mềm dịch chuyển
  });
  }
}
