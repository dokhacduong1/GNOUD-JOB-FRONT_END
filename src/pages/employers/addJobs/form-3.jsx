import { Card, Form, InputNumber, Radio, Select } from "antd";
import { memo, useCallback, useEffect } from "react";
import { dataDegree, dataExperience, dataLevel } from "./js/dataAddJobs";

function FormThree({ form_three, setForm_three, next, prev }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (Object.keys(form_three).length > 0) {
      form.setFieldsValue(form_three);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFinish = useCallback((values) => {
    try {
      setForm_three(values);
      next();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            <strong>YÊU CẦU CHUNG</strong>
          </h2>
        </div>
        <Form.Item
          name="gender"
          label="Giới Tính"
          rules={[
            {
              required: true,
              message: "Vui Lòng Chọn Giới Tính!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="all"> Nam/Nữ </Radio>
            <Radio value="boy"> Nam </Radio>
            <Radio value="girl"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>

        <h3 style={{ marginBottom: "10px" }}>Tuổi</h3>
        <Form.Item
          name="ageMin"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          <InputNumber min={18} placeholder="Từ" />
        </Form.Item>

        <Form.Item name="ageMax" style={{ display: "inline-block" }}>
          <InputNumber min={18} placeholder="Đến" />
        </Form.Item>
        <div className="row">
          <Form.Item
            name="workExperience"
            label="Kinh Nghiệm"
            className="col-5"
            rules={[
              {
                required: true,
                message: "Vui Lòng Chọn Kinh Nghiệm!",
              },
            ]}
          >
            <Select
              placeholder="Chọn Kinh Nghiệm"
              options={dataExperience}
              dropdownRender={(menu) => {
                return (
                  <>
                    <div className="search-custom-info-company">
                      <span className="item">{menu}</span>
                    </div>
                  </>
                );
              }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="level"
            label="Cấp Bậc"
            className="col-4"
            rules={[
              {
                required: true,
                message: "Vui Lòng Chọn Cấp Bậc!",
              },
            ]}
          >
            <Select
              placeholder="Chọn Cấp Bậc"
              options={dataLevel}
              dropdownRender={(menu) => {
                return (
                  <>
                    <div className="search-custom-info-company">
                      <span className="item">{menu}</span>
                    </div>
                  </>
                );
              }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="educationalLevel"
            label="Bằng Cấp"
            className="col-3"
            rules={[
              {
                required: true,
                message: "Vui Lòng Chọn Bằng Cấp!",
              },
            ]}
          >
            <Select
              placeholder="Chọn Bằng Cấp"
              options={dataDegree}
              dropdownRender={(menu) => {
                return (
                  <>
                    <div className="search-custom-info-company">
                      <span className="item">{menu}</span>
                    </div>
                  </>
                );
              }}
              size="large"
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
        </div>
      </Card>
    </Form>
  );
}
const MemoizedFormThree = memo(FormThree);
export default MemoizedFormThree;
