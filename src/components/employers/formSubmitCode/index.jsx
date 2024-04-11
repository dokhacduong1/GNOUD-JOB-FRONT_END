/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input } from "antd";
import "./formSubmitCode.scss";
import { memo, useCallback, useEffect, useState, useRef } from "react";

function FormSubmitCode({ handleCancel, handleForm }) {
  const [form] = Form.useForm();
  const [pasteValue, setPasteValue] = useState({});
  const inputRefs = Array(6).fill().map(() => useRef(null)); // Mảng refs được tạo trong phạm vi component

  const handleInputChange = (index) => (e) => {
    if (e.target.value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    } else if (e.target.value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    form.setFieldsValue(pasteValue);
  }, [form, pasteValue]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const numbers = pasteData.split("").filter((n) => !isNaN(n));
    if (numbers.length === 6) {
      const objectNew = {
        "number-1": numbers[0],
        "number-2": numbers[1],
        "number-3": numbers[2],
        "number-4": numbers[3],
        "number-5": numbers[4],
        "number-6": numbers[5]
      }
      
      if(JSON.stringify(objectNew) !== JSON.stringify(pasteValue)){
        setPasteValue(objectNew);
      }
    }
  }, [pasteValue]);

  return (
    <Form form={form} onFinish={handleForm} className="row form-submit-code">
      {inputRefs.map((ref, index) => (
        <Form.Item
          className="col-2"
          name={`number-${index + 1}`}
          rules={[{ required: true, message: "" }]}
          key={index}
        >
          <Input
            ref={ref}
            maxLength={1}
            autoComplete="off"
            pattern="[0-9]"
            type="tel"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onPaste={handlePaste}
            onChange={handleInputChange(index)}
          />
        </Form.Item>
      ))}
      <div className="button-form">
        <div className="button-cance">
          <button onClick={handleCancel} className="cancel-veri">
            Hủy
          </button>
        </div>
        <Form.Item>
          <button className="submit-veri" type="submit">
            Xác Thực
          </button>
        </Form.Item>
      </div>
    </Form>
  );
}

const MemoizedFormSubmitCode = memo(FormSubmitCode);
export default MemoizedFormSubmitCode;
