import { decData } from "../../../helpers/decData";
import { getAllRoles } from "../../../services/admins/rolesApi";

export const fetchApiRoleManage = async (setJobsCategories, keyword = "", sortKey = "", sortValue = "") => {
    //Cái valueStatus nếu người dùng muốn lọc theo status thì điền giá trị vào mặc định là 1
    //Nếu có tree thì nó mới tạo ra một cây không thì thôi
    const records = await getAllRoles( keyword, sortKey, sortValue);
    if (records.code === 200) {
        const convertData = decData(records.data).map((dataMap, index) => ({
            ...dataMap,
            key: index
        }))
        //Nếu muốn lọc theo kiểu cha con thì nó là true
        setJobsCategories(convertData)
    }

}