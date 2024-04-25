import { memo, useCallback, useEffect, useState } from "react";
import "./companyOutstanding.scss";
import { getCountJobEmployers } from "../../../services/clients/employersApi";
import { decData } from "../../../helpers/decData";
function CompanyOutstanding() {
  const [recordItem, setRecordItem] = useState([]);
  const fetchApi = useCallback(async () => {
    const result = await getCountJobEmployers();
    if (result.code === 200) {
      const convertData = decData(result.data);
      setRecordItem(convertData);
    }
  },[]);
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      {recordItem.length > 0 && (
        <>
          <h2 className="heading-title">Top công ty nổi bật</h2>
          <div className="company-outstanding">
            <div className="company-outstanding__box">
              {recordItem.map((item, index) => (
                <div key={index} className="company-outstanding__item">
                  <div className="immge-box">
                    <a href="#!" title={item?.companyName}>
                      <img
                        className="img-box"
                        src={item?.logoCompany}
                        alt={item?.companyName}
                      />
                    </a>
                  </div>
                  <div className="text-box">
                    <a title={item?.companyName} className="title" href={"/cong-ty/"+item?.slug}>
                      Công ty {item?.companyName}
                    </a>
                    <p className="des">Đang có {item?.countJobs} việc làm</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
const MemoizedCompanyOutstanding = memo(CompanyOutstanding);
export default MemoizedCompanyOutstanding;
