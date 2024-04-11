import { convertToSlug } from "../../../../helpers/convertSlug";
import { decData } from "../../../../helpers/decData";
import { getJobSearchPosition } from "../../../../services/clients/jobsApi";

import { getSkillList } from "../../../../services/clients/skillApi";
import { getCityApiDuong } from "../../../../services/clients/user-userApi";

export const fetchApi = async (setCity, setSkill) => {
  const [city, skill] = await Promise.all([
    getCityApiDuong(),
    getSkillList(),
  ]);

  if (city.code === 200) {
    const arrCity = city.data.map((item) => {
      return {
        value: item.slug,
        label: item.name,
      };
    });
    setCity(arrCity);
  }

  if (skill.code === 200) {
    const convertData = decData(skill.data).map((item) => {
      return {
        value: item._id,
        label: item.title,
      };
    });
    setSkill(convertData);
  }

};

export const loadApi = async (setJobPosition,valueDebounce) => {
  //gọi api lấy danh sách vị trí công việc
  let result = await getJobSearchPosition(valueDebounce);
  //convert dữ liệu trả về từ api
  const arrTag = result.data.map((element) => ({
    value: element.listTagSlug,
    label: element.listTagName,
  }));
  //nếu valueDebounce khác rỗng thì thêm valueDebounce vào đầu mảng
  if (valueDebounce !== "") {
    const valueNew = {
      label: valueDebounce,
      value: `${convertToSlug(valueDebounce)}`,
    };
    setJobPosition([valueNew, ...arrTag]);
    //nếu valueDebounce rỗng thì setJobPosition bằng arrTag
  }else{
    setJobPosition(arrTag);
  }
};