import { Card, Popconfirm, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { formatDate } from "../../../helpers/formartDate";
import "./managementCategories.scss"
import { deleteSingleId } from "./deleteSingle";
import ChangeMultipleBox from "../../../components/admins/changeMultipleBox";
import FilterBox from "../../../components/admins/filterBox";
import { optionsChangeMultiple, optionsSort } from "./js/options";
import SortBox from "../../../components/admins/sortBox";
import FormEdit from "./formEdit";
import { fetchApiRoleManage } from "./js/fetchApi";
import { changeMultipleRoles } from "../../../services/admins/rolesApi";
import { useSelector } from "react-redux";
function ManagementGroupPermission() {
    const [jobsCategories, setJobsCategories] = useState([]);
    const [listDeleteId, setDeleteId] = useState([]);

    const [sortKey, setSortKey] = useState("");

    const [sortValue, setSortValue] = useState("");
    const [keywords, setKeywords] = useState("");
    const [api, contextHolder] = notification.useNotification();

    //Lấy thông tin quyền từ store của  redux
    const userAdmin = useSelector((dataCheck) => dataCheck.authenticationReducerAdmin);
    useEffect(() => {
        fetchApiRoleManage(setJobsCategories, keywords, sortKey, sortValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const columns = [
        {
            title: 'Tiêu Đề',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Mô Tả Ngắn',
            dataIndex: 'description',
            key: 'description',
            render: (_, { description }) => (
                <div dangerouslySetInnerHTML={{ __html: description }} />
            )
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',

            render: (_, { createdAt }) => (
                <span>{formatDate(createdAt)}</span>
            )
        },
        {
            title: 'Ngày Cập Nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',

            render: (_, { updatedAt }) => (
                <span>{formatDate(updatedAt)}</span>
            )
        },


        {
            title: 'Hành Động',
            key: 'action',

            render: (_, record) => (
                <Space size="small">
                    {
                        //Kiểm tra xem người dùng có quyền edit hay không
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('roles-edit') === true && (
                            <>
                                <FormEdit record={record} fetchApiLoad={() => fetchApiRoleManage(setJobsCategories, keywords, sortKey, sortValue)} />
                            </>
                        )
                    }

                    {
                        //Kiểm tra xem người dùng có quyền xóa hay không
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('roles-delete') === true && (
                            <>
                                <Popconfirm
                                    title="Xóa Quyền"
                                    description="Bạn Có Muốn Xóa Quyền Này Không ?"
                                    okText="Ok"
                                    cancelText="No"
                                    onConfirm={() => deleteSingleId(record._id, fetchApiRoleManage, setJobsCategories, api, keywords, sortKey, sortValue)}
                                >
                                    <span className="button-delete">
                                        <DeleteOutlined />
                                    </span>
                                </Popconfirm>

                            </>
                        )
                    }
                    {
                        //Kiểm tra xem người dùng có quyền xem hay không
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('roles-view') === true && (
                            <>
                                <span className="button-eye">
                                    <EyeOutlined />
                                </span>
                            </>
                        )
                    }


                </Space>
            ),
        },
    ];


    //hàm này được gọi khi form submit lên
    const handleSubmitChangeMultiple = async (valueForm) => {
        let newRecord;
        //Check xem người dùng muốn gửi theo phương thức gì
        switch (valueForm.action) {
            case "deleted":
                newRecord = {
                    ids: listDeleteId,
                    key: "deleted"
                }

                break;

            default:
                break;
        }

        const result = await changeMultipleRoles(newRecord);
        if (result.code === 200) {
            api.success({
                message: `Success`,
                description: (
                    <>
                        <i>{result.success}</i>
                    </>
                ),
            });
        } else {
            api.error({
                message: <span style={{ color: "red" }}>Failed</span>,
                description: (
                    <>
                        <i>{result.error}</i>
                    </>
                ),
            });
        }
        fetchApiRoleManage(setJobsCategories, keywords, sortKey, sortValue);
    }


    const handleSearchKeyword = async (value) => {
        const keyword = value
        //Nếu value bằng rỗng thì gọi lại hàm vẽ ra dữ liệu
        fetchApiRoleManage(setJobsCategories, keyword, sortKey, sortValue);
        setKeywords(keyword)
    }
    const handleSort = async (value) => {
        const sortKeySelect = value.split("-")[0];
        const sortValueSelect = value.split("-")[1];

        if (sortKeySelect === "tree") {
            fetchApiRoleManage(setJobsCategories, keywords, "", "", "true");
            return;
        }
        fetchApiRoleManage(setJobsCategories, keywords, sortKeySelect, sortValueSelect);

        setSortKey(sortKeySelect);
        setSortValue(sortValueSelect);

    }

    //hàm này để lấy các id mà người dụng chọn ở ô checkbox
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            //Lấy ra danh sách id
            const listId = selectedRows.map(dataMap => dataMap._id)
            //Lưu danh sách id đó vào mảng listId
            setDeleteId(listId);

        },
    };


    return (
        <Card>
            {contextHolder}
            <h2 className="title-main-admin">Quản Lý Nhóm Quyền</h2>
            {/* Bộ Lọc và tìm kiếm */}
            <FilterBox handleSearch={handleSearchKeyword} />
            {/* Sắp Xếp */}
            <SortBox handleChange={handleSort} options={optionsSort} />
            <div className="managementCategories mt-3 box-card">
                <div className="managementCategories__head mb-2 card-header">
                    <h2 className="title-header"><i>Danh Mục Công Việc</i></h2>
                </div>
                <div className="managementCategories__body card-body mt-2">
                    {/* Đoạn này là khối thực hiện nhiều hành động */}
                    {
                        //Kiểm tra xem người dùng có quyền edit hay không
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('roles-edit') === true && (
                            <ChangeMultipleBox
                                checkActiveButton={listDeleteId.length > 0 ? false : true}
                                options={optionsChangeMultiple}
                                handleSubmit={handleSubmitChangeMultiple}
                            />
                        )
                    }

                    {/* Hết khối thực hiện nhiều hành động */}



                    {/* Đoạn này về table */}
                    <Table
                        pagination={{
                            pageSize: 7,
                            position: ["bottomCenter"],
                        }}
                        scroll={{
                            y: 600,
                        }}
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}

                        columns={columns} dataSource={jobsCategories}
                    />
                    {/* Hết Khối Table */}
                </div>

            </div>
        </Card>

    )
}
export default ManagementGroupPermission;