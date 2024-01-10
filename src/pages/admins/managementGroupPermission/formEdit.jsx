
import { EditOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { Card, Form, Input, Modal, Spin, notification } from 'antd';
import TinyMce from '../../../components/admins/tinyEditor';
import { LoadingOutlined } from '@ant-design/icons';

import { handleCancel, handleShowModal } from '../../../helpers/modelHelper';
import { getContentTiny } from '../../../helpers/getContentTinymce';

import { editRoles } from '../../../services/admins/rolesApi';
function FormEdit(props) {
    const { record, fetchApiLoad } = props;
    //Notification
    const [api, contextHolder] = notification.useNotification();
    //Reff
    const tinyMceRef = useRef(null);
    //Sate
    const [loading, setLoading] = useState(false);
    const [isModal, setIsModalOpen] = useState(false);
    //Form
    const [form] = Form.useForm();
   
    //Function handleForm
    const handleForm = async (valueForm) => {
        //Tạo trycath bắt lỗi cho tối ưu chương trình
        try {
            //Lấy ra id của record
            const id = record._id;
            //Khi mới chạy vào cho loading = true
            setLoading(true);
            //Hàm này để lấy dữ liệu từ tinymce
            if (getContentTiny(tinyMceRef)) {
                valueForm.description = getContentTiny(tinyMceRef);
            };

            const result = await editRoles(id, valueForm);
            if (result.code === 200) {
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
        fetchApiLoad();
        setIsModalOpen(false);
        //Khi chạy xong ta cho loading = false
        setLoading(false);
    }

    //Lấy giá trị măc định cho form
    const defaultValue = {
        title: record.title,
        description: record.description,
    }
    return (
        <>
            {contextHolder}
            <span onClick={() => handleShowModal(form, setIsModalOpen)} className="button-edit">
                <EditOutlined />
            </span>
            <Modal
                style={{
                    top: 20,
                }}
                title="Chỉnh Sửa Nhóm Quyền"
                open={isModal}
                onCancel={() => handleCancel(form, setIsModalOpen)}
                footer={null}
            >
                <Card className="addGroupPermission">

                    {contextHolder}
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
                                initialValues={defaultValue}
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
                                        Sửa Nhóm Quyền
                                    </button>
                                </Form.Item>
                            </Form>
                        </Spin>

                    </div>
                </Card>
            </Modal>
        </>
    )
}
export default FormEdit;