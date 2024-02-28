import { decData } from "../../../../helpers/decData";
import { SelectTree } from "../../../../helpers/selectTree";
import { getListEmployers } from "../../../../services/admins/employersApi";
import { getCity } from "../../../../services/admins/headerApi";
import { getTreeCategories } from "../../../../services/admins/jobsCategoriesApi";

export const fetchApi = async (setOptionsSelectTree, setOptionsEmployers, setOptionsCity) => {
  //Laays danh sách danh mục công việc
  const recordJobsCategory = await getTreeCategories();
  const recordEmployers = await getListEmployers();
  const recordCity = await getCity();
  //Lấy danh mục công việc
  if (recordJobsCategory.code === 200) {
    setOptionsSelectTree(SelectTree(decData(recordJobsCategory.data)));
  }
  //Lấy thông tin công ty
  if (recordEmployers.code === 200) {
    const convertData = decData(recordEmployers.data).map((item) => ({
      value: item._id,
      label: item.companyName
    }));

    setOptionsEmployers(convertData);
  }
  if(recordCity.code === 200){
    const options = recordCity.data.map((item) => {
      return {
        value: `${item.code}&${item.slug}&${item.name}`,
        label: item.name
      }
    })
    setOptionsCity(options)
  }
 
};