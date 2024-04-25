import { useEffect, useState } from "react";
import "./overViewCompany.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faLink,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { dataNumberOfWorkers } from "./js/options";
import JobByCompany from "../../../components/clients/jobByCompany";
function OverviewCompany({ record }) {
  const [infoCompany, setInfoCompany] = useState({});
  useEffect(() => {
    if (Object.keys(record).length > 0) {
      record.employerId.numberOfWorkers = dataNumberOfWorkers.find(
        (item) => item.value === record?.employerId?.numberOfWorkers
      )?.label;
      setInfoCompany(record?.employerId);
    }
  }, [record]);

  return (
    <div className="container">
      <div className="box-info-company">
        <div className="box-info mt-3 mb-3">
          <h3 className="mb-3  title-all">{infoCompany?.companyName}</h3>
          <div className="box-flex">
            <div className="image-company">
              <img src={infoCompany?.logoCompany} alt="" />
            </div>
            <div className="content">
              <div className="address mb-2">
                <strong>Địa điểm </strong>
                {infoCompany?.specificAddressCompany?.split("-")[0]}
              </div>

              <div className="title-info mb-2">Thông tin công ty</div>
              <div className="contact-company row gx-0 gy-2">
                <div className="col-6">
                  <div className="item">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Người liên hệ: Ms {infoCompany?.fullName}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="item">
                    <FontAwesomeIcon icon={faUserGroup} />
                    <span>Quy mô công ty: {infoCompany?.numberOfWorkers}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="item">
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span>Loại hình hoạt động: Trách nhiệm hữu hạn</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="item">
                    <FontAwesomeIcon icon={faLink} />
                    <span>Website: {infoCompany?.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dest-info mb-3">
          <h3 className="mb-3 title-all">GIỚI THIỆU VỀ CÔNG TY</h3>
          <hr />
          <div className="content">
            <div
              dangerouslySetInnerHTML={{
                __html: infoCompany?.descriptionCompany,
              }}
            />
          </div>
        </div>
        <div className="job-company">
        <h3 className="mb-3 title-all">TUYỂN DỤNG</h3>
        <hr />
          <JobByCompany slug={infoCompany?.slug}/>
        </div>
      </div>
    </div>
  );
}
export default OverviewCompany;
