
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Card, Checkbox, Col, Form, Modal, Row, Spin, notification } from 'antd';
import { handleCancel, handleShowModal } from '../../../helpers/modelHelper';
import { dataPermission } from './options';
import { editRolesPermissions } from '../../../services/admins/rolesApi';

function FormEdit(props) {
    const { record, fetchApiLoad } = props;
    //Notification
    const [api, contextHolder] = notification.useNotification();
  
    //Sate
    const [loading, setLoading] = useState(false);
    const [isModal, setIsModalOpen] = useState(false);
    //Function handleForm
    const handleForm = async (valueForm) => {
        try {
            //Khi mới chạy vào cho loading = true
            setLoading(true);
            //Lấy ra id của record
            const id = record._id;
            //Lấy ra các quyền được chọn
            const roles = {
                permissions: []
            }
            //duyệt qua các key của valueForm xong lấy ra các value của key đó nhét vào mảng permissions
            for (let key in valueForm) {
                if (valueForm[key].length > 0 && valueForm[key] !== undefined) {

                    valueForm[key].map(item =>
                        roles.permissions.push(item)
                    )
                }
            }

            //Gọi api
            const result = await editRolesPermissions(id, roles);
            //Nếu thành công thì reset form và thông báo thành công
            if (result.code === 200) {

                api.success({
                    message: `Success`,
                    description: (
                        <>
                            <b style={{ fontWeight: "600" }}>{record.title}</b> <i>{result.success}</i>
                        </>
                    ),
                });

            } else {

                //Nếu thất bại thì thông báo lỗi
                api.error({
                    message: <span style={{ color: "red" }}>Failed</span>,
                    description: (
                        <>
                            <i>{result.error}</i>
                        </>
                    ),
                });
            }
            fetchApiLoad();
            // fetchApiLoad();
            setIsModalOpen(false);
            //Khi chạy xong ta cho loading = false
            setLoading(false);
            

        } catch (error) {
            //Nếu lỗi thì thông báo lỗi
            api.error({
                message: <span style={{ color: "red" }}>Failed</span>,
                description: (
                    <>
                        <i>Lỗi Gì Đó Rồi!</i>
                    </>
                ),
            });
        }



    }
    //Lấy giá trị măc định cho form
    const objectConvertData = {}
    // duyệt qua các key của record.permissions xong lấy ra các value của key đó nhét vào mảng objectConvertData
    dataPermission.forEach(item => {
        //Lấy ra các quyền được chọn dựa theo tên của dataPerssion  ví dụ dataPermission.name có tên job-categories thì sẽ lấy ra các quyền có tên job-categories-view,job-categories-create,job-categories-edit,job-categories-delete
        objectConvertData[item.name] = record.permissions.filter(itemFilter => itemFilter.includes(item.name))

    })

    return (
        <>
            {contextHolder}
            <span onClick={() => handleShowModal("", setIsModalOpen)} className="button-edit-role">
                <EditOutlined />
            </span>
            <Modal
                style={{
                    top: 20,
                }}
                title="Sửa Danh Sách Phân Quyền"
                open={isModal}
                onCancel={() => handleCancel("", setIsModalOpen)}
                footer={null}
            >
                <Card className="setPermission">
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
                               
                                onFinish={handleForm}
                                name={record.title}
                                autoComplete="off"
                                initialValues={objectConvertData}
                            >
                                {
                                    dataPermission.map((item, index) => (
                                        <div key={index}>
                                            <h2 className='permission-form'>{item.title}</h2>
                                            <Form.Item
                                                name={item.name}
                                            >
                                                <Checkbox.Group style={{ width: '100%' }}>
                                                    <Row>
                                                        {
                                                            item.children.map((itemChildren, indexChildren) => (
                                                                <Col key={indexChildren} span={6}>
                                                                    <Checkbox value={itemChildren.value}>{itemChildren.label}</Checkbox>
                                                                </Col>
                                                            ))
                                                        }
                                                    </Row>
                                                </Checkbox.Group>
                                            </Form.Item>
                                            <hr />
                                        </div>

                                    ))
                                }

                                <Form.Item

                                >
                                    <button className='button-submit-admin' type="submit">
                                        Sửa Quyền
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