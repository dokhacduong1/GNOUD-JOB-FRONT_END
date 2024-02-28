
import { EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Card, Checkbox, Col, Form, Modal, Row } from 'antd';

import {  handleCancel, handleUpdateDataViewPermission } from '../../../helpers/modelHelper';
import { dataPermission } from './js/options';

function ViewPermission(props) {
    const { record } = props;
    //Form
    const [form] = Form.useForm();
    const [isModal, setIsModalOpen] = useState(false);
    useEffect(() => {
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, record]);
    //Lấy giá trị măc định cho form
    const objectConvertData = {}
    //duyệt qua các key của record.permissions xong lấy ra các value của key đó nhét vào mảng objectConvertData
    dataPermission.forEach(item => {
        objectConvertData[item.name] = record.permissions

    })
   
    return (
        <>

            <span onClick={() => handleUpdateDataViewPermission(form, setIsModalOpen,record)} className="button-eye-role">
                <EyeOutlined />
            </span>
            <Modal
                style={{
                    top: 20,
                }}
                title="Xem Danh Sách Phân Quyền"
                open={isModal}
                onCancel={() => handleCancel(form, setIsModalOpen)}
                footer={null}
            >
                <Card className="setPermission">
                    <div className="row justify-content-center align-items-center">

                        <Form
                            form={form}
                            name={record.title + "view"}
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
                                            <Checkbox.Group style={{ width: '100%' }} disabled>
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
                        </Form>

                    </div>


                </Card>
            </Modal>
        </>
    )
}
export default ViewPermission;