import { Get} from "../../utils/clients/request"

export const getListEmployers = async (page="",limit="")=>{
    const result = await Get(`/employers?page=${page}&limit=${limit}`);
    return result;
}
