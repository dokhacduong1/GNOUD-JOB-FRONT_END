

import { decData } from "../../../../helpers/decData";

import { getJobSearch } from "../../../../services/clients/jobsApi";


export const fetchApiJobSearch = async (setRecordMain,slug="",navigate="") => {

    //Cái valueStatus nếu người dùng muốn lọc theo status thì điền giá trị vào mặc định là 1
    //Nếu có tree thì nó mới tạo ra một cây không thì thôi
    const records = await getJobSearch(slug);

    if (records.code === 200) {
        const convertData = decData(records.data)
        setRecordMain(convertData)
    }
    if(records.code===500){
        // window.location.href="/not-found"
        navigate("/not-found")
    }

}