import { Card, Form, Input, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './addGroupPermission.scss';
import TinyMce from '../../../components/admins/tinyEditor';

import { useRef, useState } from 'react';
import { getContentTiny } from '../../../helpers/getContentTinymce';

import { createRoles } from '../../../services/admins/rolesApi';
import { useSelector } from 'react-redux';
import NotFound from '../../../components/admins/notFound';


function AddGroupPermission() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    //Khai báo một biến ref để lấy dữ liệu cho tinymece
    const tinyMceRef = useRef(null);
    //Lấy thông tin quyền từ store của  redux
    const userAdmin = useSelector((dataCheck) => dataCheck.authenticationReducerAdmin);
    const handleForm = async (valueForm) => {
        //Tạo trycath bắt lỗi cho tối ưu chương trình
        try {
            //Khi mới chạy vào cho loading = true
            setLoading(true);
            //Hàm này để lấy dữ liệu từ tinymce
            if (getContentTiny(tinyMceRef)) {
                valueForm.description = getContentTiny(tinyMceRef);
            };

            const result = await createRoles(valueForm);
            if (result.code === 201) {
                form.resetFields();
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
        } catch (error) {
            api.error({
                message: <span style={{ color: "red" }}>Failed</span>,
                description: (
                    <>
                        <i>Lỗi Gì Đó Rồi!</i>
                    </>
                ),
            });
        }
        //Khi chạy xong ta cho loading = false
        setLoading(false);
    };



    return (
        <Card className="addGroupPermission">
            {
                userAdmin?.status && userAdmin.infoUser.permissions.includes('roles-create') === false
                    ? <NotFound />
                    : (
                        <>
                            {contextHolder}
                            <h2 className="title-main-admin">Thêm Nhóm Quyền</h2>
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
                                            label="Tiêu Đề Danh Mục"
                                            name="title"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui Lòng Nhập Tiêu Đề Danh Mục!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập tiêu đề danh mục" />
                                        </Form.Item>
                                        <Form.Item label="Mô Tả" name="description">
                                            <TinyMce ref={tinyMceRef} />
                                        </Form.Item>
                                        <Form.Item >
                                            <button className='button-submit-admin' type="submit" >
                                                Tạo Nhóm Quyền
                                            </button>
                                        </Form.Item>
                                    </Form>
                                </Spin>

                            </div>
                        </>
                    )

            }

        </Card>
    );
}
export default AddGroupPermission;