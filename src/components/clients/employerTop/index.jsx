import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./employerTop.scss";


import { memo } from "react";

function EmployerTop(props) {
  const { listEmployers } = props;


  return (
    <div className="employer__top cb-section">
      <div className="container">
        <h2 className="text-center title-text">NHÀ TUYỂN DỤNG HÀNG ĐẦU</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4 gap-md-5 employer__grid">
          {listEmployers.slice(0, 4).map((data, index) => (
            <div key={index} className="employer__top-item ">
              <div className="image">
                <img
                  src={data.logoCompany}
                  alt={`Anh${data.companyName}`}
                  className="img-fluid"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const MemoizedEmployerTop = memo(EmployerTop);
export default MemoizedEmployerTop;
