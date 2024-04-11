import { Card, Form } from "antd";
import MemoizedCheckBoxCustom from "../../../components/admins/checkBoxCustom";
import { dataWelfare } from "./js/dataAddJobs";
import { memo, useCallback, useEffect } from "react";

function FormTwo({ setForm_two, form_two, next, prev }) {
  const [form] = Form.useForm();
  const handleFinish = useCallback(
    (values) => {
      setForm_two(values);
      next();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setForm_two]
  );
  useEffect(() => {
    if (Object.keys(form_two).length > 0) {
      form.setFieldsValue(form_two);
    }
  });
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
            <strong>PHÚC LỢI</strong>
          </h2>
        </div>
        <Form.Item
          name="welfare"
          rules={[
            {
              required: true,
              message: "Vui Lòng Chọn Phúc Lợi!",
            },
          ]}
        >
          <MemoizedCheckBoxCustom
            data={dataWelfare}
            gutter={[20, 20]}
            col={6}
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
const MemoizedFormTwo = memo(FormTwo);
export default MemoizedFormTwo;
