import { Avatar, Card, List, Tag } from "antd";
import { useEffect, useState } from "react";

import "./setPermission.scss";
import { decData } from "../../../helpers/decData";

import FormEdit from "./formEdit";
import {getInfoRoles } from "../../../services/admins/rolesApi";
import ViewPermission from "./viewPermission";
function SetPermission() {
    const [data, setInfo] = useState([]);
    const [roleId, setRoleIdMain] = useState([]);
    const fectApi = async () => {
        const record = await getInfoRoles();
        if (record.code === 200) {
            const convertData = decData(record.data);
           
            setInfo(convertData);
            setRoleIdMain(record.role_id);
        }

    }
    useEffect(() => {
       
        fectApi()
    }, [])
   
    
    return (
        <Card>
            <h2 className="title-main-admin">Phân Quyền</h2>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <FormEdit record={item} fetchApiLoad ={()=>fectApi()}/>,
                            <ViewPermission record={item} />,

                        ]}
                    >

                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="https://ant.design">{item.title} {""} {roleId === item._id ?  <Tag  color="geekblue">Đây Là Quyền Của Bạn</Tag> : ""}</a>}
                            description={<div dangerouslySetInnerHTML={{ __html: item.description }} />}
                        />
                    </List.Item>
                )}
            />
        </Card>

    )
}
export default SetPermission;