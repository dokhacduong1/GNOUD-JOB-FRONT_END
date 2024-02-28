
import { deleteSingleJobs } from "../../../services/admins/jobsApi";



export const deleteSingleId = async (id,fetchApi,setState,api,statusFetch,keywordFetch,sortKeyFetch,sortValueFetch,treeFetch) => {
    const result = await deleteSingleJobs(id);
    if (result.code === 200) {
        api.success({
            message: `Success`,
            description: (
                <>
                    <i>{result.success}</i>
                </>
            ),
        }); 
        fetchApi(setState,statusFetch,keywordFetch,sortKeyFetch,sortValueFetch,treeFetch);
    }else{
        api.error({
            message: <span style={{ color: "red" }}>Failed</span>,
            description: (
                <>
                    <i>{result.error}</i>
                </>
            ),
        });
    }

} 