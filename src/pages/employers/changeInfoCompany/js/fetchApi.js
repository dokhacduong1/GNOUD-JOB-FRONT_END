import { decData } from "../../../../helpers/decData";
import { getAllJobsCategories } from "../../../../services/employers/jobsCategoriesApi";

export const fetchApi = async (setJobCategories) => {
  const resultJobCategories = await getAllJobsCategories();
  if (resultJobCategories.code === 200) {
    const convertData = decData(resultJobCategories.data).map((item) => {
      return {
        label: item.title,
        value: item._id,
      };
    });
    setJobCategories(convertData)
  }
}