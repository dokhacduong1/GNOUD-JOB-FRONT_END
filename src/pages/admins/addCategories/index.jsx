import { Card, Form, Image, Input, InputNumber, Radio, Select, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './addCategories.scss';
import TinyMce from '../../../components/admins/tinyEditor';

import { useEffect, useRef, useState } from 'react';
import { getContentTiny } from '../../../helpers/getContentTinymce';
import { convertThumbUrl } from '../../../helpers/convertThumbUrl';
import { getTreeCategories, uploadCategories } from '../../../services/admins/jobsCategoriesApi';
import { SelectTree } from '../../../helpers/selectTree';
import { decData } from '../../../helpers/decData';
import { handleFileChange } from '../../../helpers/imagesHelper';
import { useSelector } from 'react-redux';
import NotFound from '../../../components/admins/notFound';




function AddCategories() {
  const [optionsSelectTree, setOptionsSelectTree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  //Khai báo một biến ref để lấy dữ liệu cho tinymece
  const tinyMceRef = useRef(null);
  //Lấy thông tin quyền từ store của  redux
  const userAdmin = useSelector((dataCheck) => dataCheck.authenticationReducerAdmin);

  const fetchApi = async () => {
    const record = await getTreeCategories();
    if (record.code === 200) {
      setOptionsSelectTree(SelectTree(decData(record.data)))

    }

  }
  useEffect(() => {
    fetchApi()
  }, [])

  const handleForm = async (valueForm) => {
    //Tạo trycath bắt lỗi cho tối ưu chương trình
    try {
      //Khi mới chạy vào cho loading = true
      setLoading(true);

      //Hàm này để lấy dữ liệu từ tinymce
      if (getContentTiny(tinyMceRef)) {
        valueForm.description = getContentTiny(tinyMceRef);
      };

      // Chuyển mã tách thành base64
      valueForm.thumbUrl = convertThumbUrl(fileImage);

      const result = await uploadCategories(valueForm);

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
      fetchApi();
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


  const defaultValue = {
    status: "active"
  }



  return (
    <Card className="addCategories">
      {
        userAdmin?.status && userAdmin.infoUser.permissions.includes('job-categories-create') === false
          ? <NotFound />
          : (
            <>
              {contextHolder}
              <h2 className="title-main-admin">Thêm Danh Mục Công Việc</h2>
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
                    initialValues={defaultValue}
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
                          src={fileImage}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item label="Vị Trí" name="position">
                      <InputNumber placeholder='Để Trống Là Tự Tăng' />
                    </Form.Item>
                    <Form.Item >
                      <button className='button-submit-admin' type="submit" >

                        Tạo Danh Mục Công Việc
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

export default AddCategories;
