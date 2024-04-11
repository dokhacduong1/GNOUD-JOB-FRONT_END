import { Card, Spin, Steps, message, theme } from "antd";
import { useState } from "react";
import FormOne from "./form-1";
import "./addJobsEmployer.scss";
import FormTwo from "./form-2";
import FormThree from "./form-3";
import FormFour from "./form-4";
import { createJobs } from "../../../services/employers/jobsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { LoadingOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
function AddJobsEmployer() {
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [form_one, setForm_one] = useState({});
  const [form_two, setForm_two] = useState({});
  const [form_three, setForm_three] = useState({});
  const [form_four, setForm_four] = useState({});
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const handleFinishAll = async () => {
    try {
      setLoading(true);
      const data = {
        ...form_one,
        ...form_two,
        ...form_three,
        ...form_four,
      };

      const result = await createJobs(data);
      if (result.code === 201) {
        messageApi.open({
          type: "success",
          content: result.success,
          icon: (
            <span className="icon-message-employer-success">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ),
        });
        navigate("/nha-tuyen-dung/app/management-jobs");
      } else {
        messageApi.open({
          type: "error",
          content: result.error,
          icon: (
            <span className="icon-message-employer-error">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Lỗi không xác định",
        icon: (
          <span className="icon-message-employer-error">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        ),
      });
    }
  };

  const steps = [
    {
      title: "Thông tin tuyển dụng",
      content: (
        <div className="fomr-one">
          <FormOne
            current={current}
            form_one={form_one}
            setForm_one={setForm_one}
            next={next}
            prev={prev}
          />
        </div>
      ),
    },
    {
      title: "Phúc lợi",
      content: (
        <div className="form-two">
          <FormTwo
            form_two={form_two}
            current={current}
            setForm_two={setForm_two}
            next={next}
            prev={prev}
          />
        </div>
      ),
    },
    {
      title: "Yêu cầu chung",
      content: (
        <FormThree
          form_three={form_three}
          current={current}
          setForm_three={setForm_three}
          next={next}
          prev={prev}
        />
      ),
    },
    {
      title: "Thông tin liên hệ",
      content: (
        <FormFour
          form_four={form_four}
          setForm_four={setForm_four}
          current={current}
          handleFinishAll={handleFinishAll}
          prev={prev}
        />
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",

    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,

    marginTop: 16,
  };
  return (
    <div className="container-fluid page-content mt-4 add-jobs-employer reset-button-employer">
      {contextHolder}
      <div className="title title-employer-setting  ">
        <h3>Đăng tin tuyển dụng</h3>
      </div>
      <div className="add-job-employer__steps">
        <Card className="card-step">
          <Spin
            spinning={loading}
            size="large"
            tip={
              <span style={{ color: "#fda4c8", fontSize: "20px" }}>
                Vui Lòng Đợi...
              </span>
            }
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 36,
                  color: "#fda4c8",
                }}
                spin
              />
            }
          >
            <Steps current={current} items={items} />
          </Spin>
        </Card>

        <div className="" style={contentStyle}>
          {steps[current].content}
        </div>
      </div>
    </div>
  );
}
export default AddJobsEmployer;
