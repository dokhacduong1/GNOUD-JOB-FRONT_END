import {Form, Input, Tag } from "antd";
import "./phoneVerify.scss";
import banner from "./images/banner.png";
import vari from "./images/veri.png";
import chart from "./images/chart.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModelVerify from "./modelVerify";
function PhoneVerify() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [infoUserEmployer, setInfoUserEmployer] = useState({});
  const [phone, setPhone] = useState("");
  const authenMainEmployer = useSelector(
    (status) => status.authenticationReducerEmployer
  );
  useEffect(() => {
    if (authenMainEmployer?.status) {
      const { infoUserEmployer } = authenMainEmployer;
      setInfoUserEmployer(infoUserEmployer);
      form.setFieldsValue(infoUserEmployer);
    }
  }, [authenMainEmployer,form]);
  const handleForm = (values) => {

    setOpen(true);
    setPhone(values.phoneNumber);
  };
  return (
    <div className="container-fluid page-content mt-4">
      <div className="phone-verify">
        <div className="model-verifi">
          <ModelVerify openModel={open} phone={phone} setOpen={setOpen} />
        </div>
        <div className="phone-verify__bg ">
          <div className="box-image">
            <img src={banner} alt="banner" />
          </div>
          <div className="verify pt-3 pb-4 px-4">
            <div className="heading pt-3 px-4">
              <h4>Cập nhật và xác thực số điện thoại của bạn</h4>
            </div>
            {infoUserEmployer?.activePhone === true && (
              <div className="pb-4 px-4 text-left">
                <Tag style={{fontSize:"15px",padding:"10px"}} className="px-4" color="#fda4c8">
                  SĐT <strong>{infoUserEmployer?.phoneNumber}</strong> Đã Xác Thực
                </Tag>
              </div>
            )}
            {infoUserEmployer?.activePhone === false && (
              <div className="form-verify-phone px-4 mb-4">
                <Form
                  onFinish={handleForm}
                  form={form}
                  layout="inline"
                  className="align-items-center"
                >
                  <div className="col-5">
                    <Form.Item name="phoneNumber">
                      <Input
                        disabled={infoUserEmployer?.activePhone}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-3">
                    <Form.Item className="col-12 button-v">
                      {infoUserEmployer?.activePhone === false && (
                        <button className="button-submit" type="submit">
                          Gửi mã Xác thực
                        </button>
                      )}
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}

            <div className="box-help px-4">
              <h5 className="mb-4">Lợi ích khi xác thực số điện thoại</h5>
              <div className="row mb-4">
                <div className="col-md-6 d-flex align-items-start align-items-center">
                  <div className="mr-3">
                    <img src={vari} width="48px" alt="" className="img-fluid" />
                  </div>{" "}
                  <div className="text-des">
                    Tăng cường bảo mật tài khoản nhà tuyển dụng, chống kẻ xấu{" "}
                    <br /> giả mạo và lợi dụng tài khoản.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex align-items-start align-items-center">
                  <div className="mr-3">
                    <img
                      src={chart}
                      width="48px"
                      alt=""
                      className="img-fluid"
                    />
                  </div>{" "}
                  <div className="text-des">
                    Nâng cao mức độ uy tín của thương hiệu tuyển dụng, <br />{" "}
                    tăng khả năng hiển thị tin tuyển dụng với ứng viên phù hợp.
                  </div>
                </div>{" "}
                <div className="col-md-6 d-flex align-items-start align-items-center">
                  <div className="mr-3">
                    <img src={vari} width="48px" alt="" className="img-fluid" />
                  </div>{" "}
                  <div className="text-des">
                    Được đội ngũ GNOUD hỗ trợ nhanh chóng qua số điện thoại đã
                    xác thực <br /> khi có vấn đề phát sinh, rút ngắn tối đa
                    thời gian xử lý thắc mắc, khiếu nại.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PhoneVerify;
