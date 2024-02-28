
import { EditOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { Card, Form, Image, Input, InputNumber, Modal, Radio, Select, Spin, notification } from 'antd';
import TinyMce from '../../../components/admins/tinyEditor';
import { LoadingOutlined } from '@ant-design/icons';
import { editCategories, getTreeCategories } from '../../../services/admins/jobsCategoriesApi';
import { SelectTree } from '../../../helpers/selectTree';
import { convertThumbUrl } from '../../../helpers/convertThumbUrl';
import { decData } from '../../../helpers/decData';
import { handleCancel, handleUpdateDataCategories } from '../../../helpers/modelHelper';
import { handleFileChange } from '../../../helpers/imagesHelper';
import { getContentTiny } from '../../../helpers/getContentTinymce';

function FormEdit(props) {
    const { record, fetchApiLoad } = props;

    //Notification
    const [api, contextHolder] = notification.useNotification();
    //Reff
    const tinyMceRef = useRef(null);
    //Sate
    const [fileImage, setFileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModal, setIsModalOpen] = useState(false);
    const [optionsSelectTree, setOptionsSelectTree] = useState([]);
    //Form
    const [form] = Form.useForm();

    //Function fetch api
    const fetchApi = async () => {
        const record = await getTreeCategories();
        if (record.code === 200) {
            setOptionsSelectTree(SelectTree(decData(record.data)))
        }
    }
    useEffect(() => {

        fetchApi()
    }, [])



    //Function handleForm
    const handleForm = async (valueForm) => {
        try {
            //Lấy ra id của record
            const id = record._id;
            //Khi mới chạy vào cho loading = true
            setLoading(true);
            //Hàm này để lấy dữ liệu từ tinymce
            if (getContentTiny(tinyMceRef)) {
                valueForm.description = getContentTiny(tinyMceRef);
            }

            // Chuyển mã tách thành base64
            valueForm.thumbUrl = convertThumbUrl(fileImage);
            const result = await editCategories(id, valueForm);
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
        setFileImage(null);
        fetchApiLoad();
        setIsModalOpen(false);
        //Khi chạy xong ta cho loading = false
        setLoading(false);
    }

    return (
        <>
            {contextHolder}
            {/* //Do đoạn này ta truyển form và record lên ta sẽ không cần setDefaultForm nữa vì bên handleUpdateDataJobs đã setDefaultForm rồi */}
            <span onClick={() => handleUpdateDataCategories(form, setIsModalOpen,record)} className="button-edit">
                <EditOutlined />
            </span>
            <Modal
                style={{
                    top: 20,
                }}
                title="Chỉnh Sửa Danh Mục"
                open={isModal}
                onCancel={() => handleCancel(form, setIsModalOpen)}
                footer={null}
            >
                <Card className="addCategories">

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
                                <Form.Item label="Danh Mục Cha" name="parent_id">
                                    <Select
                                        placeholder="Chọn Danh Mục Cha (Hoặc Để Trống)"


                                        options={optionsSelectTree}
                                    />
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
                                    <div>
                                        <Input type='file' accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e, setFileImage, api)} />
                                        <Image
                                            style={{ padding: "10px", borderRadius: "10px" }}
                                            width={100}
                                            src={fileImage === null ? record.thumbnail : fileImage}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Vị Trí" name="position">
                                    <InputNumber placeholder='Để Trống Là Tự Tăng' />
                                </Form.Item>
                                <Form.Item>
                                    <button className='button-submit-admin' type="submit" >
                                        Tạo Danh Mục Công Việc
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