/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input } from "antd";
import "./formSubmitCode.scss";
import { memo, useState} from "react";
import { useRef } from "react";
function FormSubmitCode({ handleCancel, handleForm }) {

  const inputRefs = Array(6)
    .fill()
    .map(() => useRef(null));
    const handleInputChange = (index) => (e) => {

      if (e.target.value.length === 1 && index < 5) {
      
        inputRefs[index + 1].current.focus();
      } else if (e.target.value.length === 0 && index > 0) {
       
        inputRefs[index - 1].current.focus();

      }
    };
 
  return (
    <Form onFinish={handleForm} className="row form-submit-code">
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
