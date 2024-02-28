import { Checkbox, Col, Row } from "antd";
import { memo } from "react";

function CheckBoxCustom(props) {
  const { data, gutter, col, value } = props;

  const onChange = (checkedValues) => {
    // Notify the form that the value has changed
    props.onChange(checkedValues);
  };
  return (
    <Checkbox.Group
      style={{
        width: "100%",
      }}
      onChange={onChange}
      value={value} // Set the default value
    >
      <Row gutter={gutter}>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <Col key={index} span={col}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </Col>
            );
          })}
      </Row>
    </Checkbox.Group>
  );
}

const MemoizedCheckBoxCustom= memo(CheckBoxCustom);
export default MemoizedCheckBoxCustom;