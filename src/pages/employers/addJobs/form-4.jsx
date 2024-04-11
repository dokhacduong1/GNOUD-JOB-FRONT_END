/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Form, Input, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { phoneCheck } from "../../admins/addJobs/js/validate";
import { dataReceiveEmail } from "./js/dataAddJobs";

function FormFour({ setForm_four, form_four, prev, handleFinishAll }) {
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);
  const handleFinish = useCallback((values) => {
    try {
      setForm_four(values);
      setSubmit(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(form_four).length > 0) {
      form.setFieldsValue(form_four);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!submit) return;

    handleFinishAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      encType="multipart/form-data"
    >
      <Card className="card-form-admin">
        <div
          className="card-header-job"
          style={{ borderBottom: "none !important" }}
        >
          <h2 className="title-header">
            <strong>THÔNG TIN LIÊN HỆ</strong>
          </h2>
        </div>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Vui Lòng Chọn Bằng Cấp!",
            },
          ]}
        >
          <Input size="large" type="email" placeholder="Nhập Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số Điện Thoại"
          rules={[
            {
              validator: async (_, value) => {
                await phoneCheck(value);
              },
            },
          ]}
        >
          <Input size="large" placeholder="Nhập Số Điện Thoại" />
        </Form.Item>
        <Form.Item name="website" label="Website">
          <Input size="large" placeholder="Nhập Website" />
        </Form.Item>
        <Form.Item
          name="receiveEmail"
          label="Nhận Nội Dung Email Ngôn Ngữ"
          rules={[
            {
              required: true,
              message: "Vui Lòng Chọn Ngôn Ngữ Gửi Email!",
            },
          ]}
        >
          <Select
            size="large"
            options={dataReceiveEmail}
            dropdownRender={(menu) => {
              return (
                <>
                  <div className="search-custom-info-company">
                    <span className="item">{menu}</span>
                  </div>
                </>
              );
            }}
            placeholder="Ngôn Ngữ Nhận Email"
          />
        </Form.Item>
        <div className="group-pre-next">
          <Form.Item className="form-button">
            <a href="#!" onClick={prev}>
              Quay lại
            </a>
          </Form.Item>

          <Form.Item className="form-button">
            <button className="form-button">Hoàn tất</button>
          </Form.Item>
        </div>
      </Card>
    </Form>
  );
}
export default FormFour;
