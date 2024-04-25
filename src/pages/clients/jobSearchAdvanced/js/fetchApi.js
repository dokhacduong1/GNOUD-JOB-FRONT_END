import { decData } from "../../../../helpers/decData";
import { getJobAdvancedSearch } from "../../../../services/clients/jobsApi";
import { getAllJobsCategories } from "../../../../services/clients/jobsCategoriesApi";

export const fetchApi = async (setOptionCategories, setRecordItem, page, limit, sort_key, sort_value, keyword, job_categorie, job_type, job_level, salary_min, salary_max,city,workExperience,setCoutJob) => {

  
    const [resultgetAllJobsCategories, resultgetJobAdvancedSearch] = await Promise.all([
      getAllJobsCategories(),
      getJobAdvancedSearch(page, limit, sort_key, sort_value, keyword, job_categorie, job_type, job_level, salary_min, salary_max,city,workExperience)
    ]);
  
    if (resultgetAllJobsCategories.code === 200) {
      const convertData = decData(resultgetAllJobsCategories.data).map((item) => {
        return {
          value: item._id,
          label: item.title,
        };
      });
      convertData.unshift({ value: "", label: "Tất cả lĩnh vực" });
      setOptionCategories(convertData);
    }
  
    if (resultgetJobAdvancedSearch.code === 200) {
        
     
      const convertDataRecord = decData(resultgetJobAdvancedSearch.data);
      setCoutJob(resultgetJobAdvancedSearch.countJobs);

      setRecordItem(convertDataRecord);
    }
  }
  
  