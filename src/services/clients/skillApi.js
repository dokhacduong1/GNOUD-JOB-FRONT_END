import { Get } from "../../utils/clients/request";

export async function getSkillList() {
    const result = await Get("/skill");
    return result;
}