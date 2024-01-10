import { Card, Popconfirm, Space, Table, Tag, notification } from "antd";


import { useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { formatDate } from "../../../helpers/formartDate";
import "./managementCategories.scss"

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { changeSingleStatusId } from "./changeSingleStatus";
import { deleteSingleId } from "./deleteSingle";
import { fetchApiCategorieManage } from "./fetchApi";
import ChangeMultipleBox from "../../../components/admins/changeMultipleBox";
import { changeMultipleCategories } from "../../../services/admins/jobsCategoriesApi";
import FilterBox from "../../../components/admins/filterBox";

import { optionsChangeMultiple, optionsFilterStartus, optionsSort } from "./options";
import SortBox from "../../../components/admins/sortBox";
import FormEdit from "./formEdit";
import { useSelector } from "react-redux";



function ManagementCategories() {
    const [jobsCategories, setJobsCategories] = useState([]);
    const [listDeleteId, setDeleteId] = useState([]);
    const [statuss, setStatus] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [tree, setTree] = useState("false");
    const [sortValue, setSortValue] = useState("");
    const [keywords, setKeywords] = useState("");
    const [api, contextHolder] = notification.useNotification();
    //Lấy thông tin quyền từ store của  redux
    const userAdmin = useSelector((dataCheck) => dataCheck.authenticationReducerAdmin);

    useEffect(() => {
        fetchApiCategorieManage(setJobsCategories, statuss, keywords, sortKey, sortValue, tree);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            title: 'Tiêu Đề',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Vị Trí',
            dataIndex: 'position',
            key: 'position',
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
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',

            render: (_, { _id, status }) => (
                status === "active" ?
                    (
                        <Tag onClick={() => changeSingleStatusId(_id, "inactive", fetchApiCategorieManage, setJobsCategories, api, statuss, keywords, sortKey, sortValue, tree)} style={{ cursor: "pointer" }} icon={<CheckCircleOutlined />} color="success">
                            Hoạt Động
                        </Tag>
                    ) :
                    (
                        <Tag onClick={() => changeSingleStatusId(_id, "active", fetchApiCategorieManage, setJobsCategories, api, statuss, keywords, sortKey, sortValue, tree)} style={{ cursor: "pointer" }} icon={<CloseCircleOutlined />} color="error">
                            Dừng Hoạt Động
                        </Tag>
                    )
            )
        },
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',

            render: (_, { thumbnail }) => (
                <img src={thumbnail} alt={`${thumbnail}.jpg`}></img>
            )
        },
        {
            title: 'Hành Động',
            key: 'action',

            render: (_, record) => (
                <Space size="small">

                    {
                        //Kiểm tra xem người dùng có quyền edit hay không
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('job-categories-edit') === true && (
                            <>
                                <FormEdit record={record} fetchApiLoad={() => fetchApiCategorieManage(setJobsCategories, statuss, keywords, sortKey, sortValue, tree)} />
                            </>
                        )
                    }
                    {
                        //Kiểm tra xem người dùng có quyền xóa hay không
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('job-categories-delete') === true && (
                            <>
                                <Popconfirm
                                    title="Xóa Danh Mục"
                                    description="Bạn Có Muốn Xóa Danh Mục Này Không ?"
                                    okText="Ok"
                                    cancelText="No"
                                    onConfirm={() => deleteSingleId(record._id, fetchApiCategorieManage, setJobsCategories, api, statuss, keywords, sortKey, sortValue, tree)}
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
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('job-categories-delete') === true && (
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
            case "inactive":
                newRecord = {
                    ids: listDeleteId,
                    key: "status",
                    value: "inactive"
                }

                break;
            case "active":
                newRecord = {
                    ids: listDeleteId,
                    key: "status",
                    value: "active"
                }

                break;
            default:
                break;
        }

        const result = await changeMultipleCategories(newRecord);
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
        fetchApiCategorieManage(setJobsCategories, statuss, keywords, sortKey, sortValue, tree);
    }

    //Hàm này cho người dùng lọc những sản phẩm theo status
    const handleChangeStatus = async (value) => {
        const valueStatus = value.target.value
        fetchApiCategorieManage(setJobsCategories, valueStatus, keywords, sortKey, sortValue, tree);
        setStatus(valueStatus)
    }

    const handleSearchKeyword = async (value) => {
        const keyword = value
        //Nếu value bằng rỗng thì gọi lại hàm vẽ ra dữ liệu
        fetchApiCategorieManage(setJobsCategories, statuss, keyword, sortKey, sortValue, tree);
        setKeywords(keyword)
    }
    const handleSort = async (value) => {
        const sortKeySelect = value.split("-")[0];
        const sortValueSelect = value.split("-")[1];

        if (sortKeySelect === "tree") {
            fetchApiCategorieManage(setJobsCategories, statuss, keywords, "", "", "true");
            setTree("true");
            return;
        }
        fetchApiCategorieManage(setJobsCategories, statuss, keywords, sortKeySelect, sortValueSelect, "false");

        setSortKey(sortKeySelect);
        setSortValue(sortValueSelect);
        setTree("false");
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
            <h2 className="title-main-admin">Quản Lý Danh Mục Công Việc</h2>
            <FilterBox optionsFilter={optionsFilterStartus} handleChange={handleChangeStatus} handleSearch={handleSearchKeyword} />
            <SortBox handleChange={handleSort} options={optionsSort} />
            <div className="managementCategories mt-3 box-card">
                <div className="managementCategories__head mb-2 card-header">
                    <h2 className="title-header"><i>Danh Mục Công Việc</i></h2>
                </div>
                <div className="managementCategories__body card-body mt-2">
                    {/* Đoạn này là khối thực hiện nhiều hành động */}
                    {
                        //Kiểm tra xem người dùng có quyền edit hay không
                        userAdmin?.status && userAdmin.infoUser.permissions.includes('job-categories-edit') === true && (
                            <>
                                <ChangeMultipleBox
                                    checkActiveButton={listDeleteId.length > 0 ? false : true}
                                    options={optionsChangeMultiple}
                                    handleSubmit={handleSubmitChangeMultiple}
                                />
                            </>
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
export default ManagementCategories