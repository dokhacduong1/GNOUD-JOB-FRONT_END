import { Button, Form, Select} from "antd";
import "./changeMultiple.scss"
import { memo } from "react";

function ChangeMultipleBox(props) {
    const { options, handleSubmit, checkActiveButton } = props

    return (
        <>
            <Form className="changeMultiple"
                name="customized_form_controls"
                style={{

                    margin: '0 0 20px 0',
                }}
                layout="inline"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="action"
                    label="Chọn Nhiều Hành Động"

                >
                    <Select
                        style={{
                            width: 190,
                            margin: '0 8px',
                        }}
                     
                        options={options} />
                </Form.Item>
                <Form.Item>
                    <Button disabled={checkActiveButton} type="primary" htmlType="submit">
                        Thực Hiện
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

const MemoizedChangeMultipleBox= memo(ChangeMultipleBox);
export default MemoizedChangeMultipleBox;