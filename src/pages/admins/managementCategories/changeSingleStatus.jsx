
import { changeStatusSingleCategories } from "../../../services/admins/jobsCategoriesApi";

export const changeSingleStatusId = async (id, status, fetchApi, setState, api,statusFetch,keywordFetch,sortKeyFetch,sortValueFetch,treeFetch) => {
    //Tạo status muốn gửi lên
    const record = {
        status: status
    }

    const result = await changeStatusSingleCategories(id, record);
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
    }
    else {
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