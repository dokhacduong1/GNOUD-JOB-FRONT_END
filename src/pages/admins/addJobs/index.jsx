import { Card, Form, Input, InputNumber, Radio, Select, Spin, notification } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from "react";
import TinyMce from "../../../components/admins/tinyEditor";
import { getTreeCategories } from "../../../services/admins/jobsCategoriesApi";
import { decData } from "../../../helpers/decData";
import { SelectTree } from "../../../helpers/selectTree";



import ModelMapAddress from "./modelMapAddress";
import "./addJobs.scss"

import BoxGoogleMap from "../../../components/admins/mapView/boxGoogleMap";
import { getListJobsAdmin } from "../../../services/admins/jobsApi";
function AddJobs() {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState([0, 0]);

    const [optionsSelectTree, setOptionsSelectTree] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    //Khai báo một biến ref để lấy dữ liệu cho tinymece
    const tinyMceRef = useRef(null);
    const [form] = Form.useForm();
    const fetchApi = async () => {

        //Laays danh sách danh mục công việc
        const recordJobsCategory = await getTreeCategories();
        const recordJobs = await getListJobsAdmin();
        console.log(recordJobs);
        if (recordJobsCategory.code === 200) {
            setOptionsSelectTree(SelectTree(decData(recordJobsCategory.data)))
        }
        if (recordJobs.code === 200) {
            console.log(decData(recordJobsCategory.data))
        }

    }
    useEffect(() => {
        fetchApi()
    }, [])

    const handleForm = async (valueForm) => {
        setLoading(true);
        api.success({
            message: `Success`,
            description: (
                <>
                    <i>{"result.success"}</i>
                </>
            ),
        });
    }

    return (

        <Card className="addJobs">
            {/* <MapView drag={true} /> */}
            {contextHolder}
            <h2 className="title-main-admin">Thêm Công Việc</h2>
            <div className="row justify-content-center align-items-center">
                <Spin spinning={loading} size="large" tip={<span style={{ color: "#35b9f1", fontSize: "20px" }}>Vui Lòng Đợi...</span>}
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 36,
                                color: "#35b9f1"
                            }}
                            spin
                        />
                    }
                >
                    <Form
                        layout="vertical"
                        encType='multipart/form-data'
                        onFinish={handleForm}
                        form={form}

                    >
                        <Form.Item
                            label="Chức Danh Tuyển Dụng"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui Lòng Nhập Chức Danh Tuyển Dụng!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tiêu đề danh mục" />
                        </Form.Item>
                        <Form.Item
                            label="Ngành Nghề"
                            name="job_categorie_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui Lòng Chọn Ngành Nghề!',
                                },
                            ]}
                        >

                            <Select
                                placeholder="Chọn Ngành Nghề"
                                options={optionsSelectTree}
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <>
                                    <span>Nơi Làm Việc</span>
                                    <ModelMapAddress setLocation={setLocation} />
                                    {
                                        (location[0] > 0 && location[1] > 0) &&
                                        (
                                            <p style={{ marginTop: "20px" }}>
                                                <BoxGoogleMap latitude={location[0]} longitude={location[1]} />

                                            </p>
                                        )
                                    }
                                </>
                            }
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui Lòng Nhập Chi Tiết Địa Chỉ!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Chi Tiết Địa Chỉ" />
                        </Form.Item>
                        <Form.Item
                            label="Công Ty"
                            name="employerId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui Chọn Công Ty!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Chi Tiết Địa Chỉ" />
                        </Form.Item>
                        <Form.Item label="Mô Tả" name="description">
                            <TinyMce ref={tinyMceRef} />
                        </Form.Item>
                        <Form.Item label="Trạng Thái" name="status"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui Lòng Chọn Trạng Thái!',
                                },
                            ]}
                        >
                            <Radio.Group >
                                <Radio value="active"> Hoạt Động </Radio>
                                <Radio value="inactive"> Dừng Hoạt Động </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Ảnh Danh Mục"
                            name="thumbUrl"
                        >
                            <TinyMce ref={tinyMceRef} />
                        </Form.Item>
                        <Form.Item label="Vị Trí" name="position">
                            <InputNumber placeholder='Để Trống Là Tự Tăng' />
                        </Form.Item>
                        <Form.Item >
                            <button className='button-submit-admin' type="submit" >

                                Tạo Danh Mục Công Việc
                            </button>
                            <p>

                            </p>
                        </Form.Item>
                    </Form>
                </Spin>

            </div>
        </Card>
    );
}
export default AddJobs;