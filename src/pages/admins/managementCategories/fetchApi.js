import { decData } from "../../../helpers/decData";
import { SelectTreeArr } from "../../../helpers/selectTree";
import { getAllJobsCategories } from "../../../services/admins/jobsCategoriesApi";

export const fetchApiCategorieManage = async (setJobsCategories, valueStatus = "", keyword = "", sortKey = "", sortValue = "", tree = "false") => {
    //Cái valueStatus nếu người dùng muốn lọc theo status thì điền giá trị vào mặc định là 1
    //Nếu có tree thì nó mới tạo ra một cây không thì thôi
    const records = await getAllJobsCategories(valueStatus, keyword, sortKey, sortValue,tree);
   
    if (records.code === 200) {
        const convertData = decData(records.data).map((dataMap, index) => ({
            ...dataMap,
            key: index
        }))
        let convertTree =convertData
        //Nếu muốn lọc theo kiểu cha con thì nó là true
        if (tree === "true") {
            //Tạo ra cây và thêm index cho từng item
            convertTree = SelectTreeArr(convertData).map((data, index) => ({
                key: index,
                ...data
            }))
        }

        setJobsCategories(convertTree)
    }

}