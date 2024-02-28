import { allowSettingUser } from "../../../../services/clients/user-userApi";

export const valueAllowChangeSearch = async (value, setAllowSearch, allowSearch, setLoading) => {
    try {
        setLoading(true);


        const objectNew = {
            keyword: "allow-search",
            status: value,
        };
        const result = await allowSettingUser(objectNew);

        if (result.code === 200) {
            setAllowSearch(!allowSearch);
            setLoading(false);
            return;
        }

    } catch (error) {
        return;
    }
};
export const valueActivateChangeJobSearch = async (value, setActiveJobSearch, activeJobSearch, setLoading) => {
    try {
        setLoading(true);
      
        const objectNew = {
            keyword: "activate-job-search",
            status: value,
        };
        const result = await allowSettingUser(objectNew);

        if (result.code === 200) {
            setActiveJobSearch(!activeJobSearch);
            setLoading(false);
            return;
        }

    } catch (error) {
        return;
    }
};