import { faArrowLeft, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner from "./images/banner-info.png";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";

import ChangeInfoCompany from "../changeInfoCompany";
import { dataNumberOfWorkers } from "./js/options";



function InfoCompany() {
  const [infoUserEmployer, setInfoUserEmployer] = useState({});
  const [changeInfo, setChangeInfo] = useState(false);
  const [imageLogo, setImageLogo] = useState(
    "https://res.cloudinary.com/dmmz10szo/image/upload/v1710149283/GNOUD_2_pxldrg.png"
  );
  const authenMainEmployer = useSelector(
    (status) => status.authenticationReducerEmployer
  );
  useEffect(() => {
    if (authenMainEmployer?.status) {
      const { infoUserEmployer } = authenMainEmployer;

      if(infoUserEmployer?.logoCompany){
        setImageLogo(infoUserEmployer?.logoCompany);
      }
      const newObject = { 
        ...infoUserEmployer,
        numberOfWorkers: dataNumberOfWorkers.find((item)=>item.value === infoUserEmployer.numberOfWorkers)?.label
       };

      setInfoUserEmployer(newObject);
    }
  }, [authenMainEmployer]);

  return (
    <>
      {Object.keys(infoUserEmployer).length > 0 && (
        <>
          <div className="pd-title title-settings ">Thông tin công ty</div>
          <div className="card-employer">
            <div className="info__company">
              <div className="info__company-banner ">
                <div className="item-1">
                  <div className="image">
                    <img src={banner} alt="icon" />
                  </div>
                  <div className="dest">
                    <p>Xác thực tài khoản điện tử</p>
                    <ul>
                      <li>
                        <span>
                          Tăng mức độ uy tín thương hiệu tuyển dụng của công ty
                        </span>
                      </li>
                      <li>
                        <span>
                          Bảo vệ thương hiệu tuyển dụng trước các đối tượng giả
                          mạo
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="item-2">
                  <a href="#!">
                    <FontAwesomeIcon icon={faShieldHalved} />
                    <span>Xác thực ngay</span>
                  </a>
                </div>
              </div>
              <div className="info__company-body mt-4">
              {
                !changeInfo ? (<>
                   <div   className="header-info mb-2 p-3">
                  <div className="d-flex align-items-center">
                    <div className="image">
                      <img
                        src={imageLogo}
                        alt="logo"
                      />
                    </div>
                    <div className="info">
                      <p className="mb-1">
                        {infoUserEmployer?.companyName}
                      </p>
                      <p>
                      {infoUserEmployer?.addressCompany}
                      </p>
                    </div>
                  </div>
                  <a href="#!" onClick={()=>{setChangeInfo(!changeInfo)}} className="button-edit-info">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span>Chỉnh sửa</span>
                  </a>
                </div>
                <div className="body-info px-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-5 font-weight-bold  text-muted">
                          Mã số thuế:
                        </div>
                        <div className="col-md-7 deg">  {infoUserEmployer?.taxCodeCompany}</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-5 font-weight-bold  text-muted">
                          Lĩnh vực hoạt động:
                        </div>
                        <div className="col-md-7 deg">{infoUserEmployer?.activityFieldListName}</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-5 font-weight-bold  text-muted">
                          Email:{" "}
                        </div>
                        <div className="col-md-7 deg">
                        {infoUserEmployer?.emailCompany}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row mb-2">
                        <div className="col-md-5 font-weight-bold  text-muted">
                          Website:
                        </div>
                        <div className="col-md-7 deg"> {infoUserEmployer?.website}</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-5 font-weight-bold  text-muted">
                          Quy mô:
                        </div>
                        <div className="col-md-7 deg">{infoUserEmployer?.numberOfWorkers}</div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-5 font-weight-bold  text-muted">
                          Số điện thoại
                        </div>
                        <div className="col-md-7 deg">{infoUserEmployer?.phoneCompany}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row mb-2">
                        <div className="col-md-2 font-weight-bold fix-flex1  text-muted">
                          Địa chỉ:{" "}
                        </div>
                        <div className="col-md-10 fix-flex2 deg">
                        {infoUserEmployer?.addressCompany}
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-2 font-weight-bold fix-flex1  text-muted">
                          Mô tả công ty:{" "}
                        </div>
                        <div className="col-md-10 fix-flex2 deg" dangerouslySetInnerHTML={{ __html: infoUserEmployer?.descriptionCompany }} />
              
                      </div>
                    </div>
                  </div>
                </div>
                </>) : (<>
                  <a onClick={()=>{setChangeInfo(!changeInfo)}} className="button-back-link">
                  <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Quay lại</span>
                  </a>
                  <ChangeInfoCompany/>
                </>)
              }
             
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
const MemoizedInfoCompany = memo(InfoCompany);
export default MemoizedInfoCompany;
