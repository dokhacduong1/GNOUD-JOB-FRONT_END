import { decData } from "../../../../helpers/decData";

import { getAllJobs } from "../../../../services/admins/jobsApi";


export const fetchApiJobsManage = async (setJobs, valueStatus = "", keyword = "", sortKey = "", sortValue = "") => {
    //Cái valueStatus nếu người dùng muốn lọc theo status thì điền giá trị vào mặc định là 1
    //Nếu có tree thì nó mới tạo ra một cây không thì thôi
    const records = await getAllJobs(valueStatus, keyword, sortKey, sortValue);

    if (records.code === 200) {
        const convertData = decData(records.data).map((dataMap, index) => ({
            ...dataMap,
            key: index
        }))
     
        setJobs(convertData)
    }

}