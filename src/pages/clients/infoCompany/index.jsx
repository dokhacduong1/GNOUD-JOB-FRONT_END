import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../services/clients/employersApi";
import { decData } from "../../../helpers/decData";
import "./infoCompany.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faLink,
  faLocationDot,
  faMap,
  faPhone,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import MemoizedJobByCompany from "../../../components/clients/jobByCompany";
import { ConfigProvider, Input } from "antd";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faSquareInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import MemoizedBoxGoogleMap from "../../../components/clients/boxGoogleMap";
import { getCoordinateAddress } from "../../../services/locations/locationsApi";

import { dataNumberOfWorkers } from "./js/options";

function InfoCompany() {
  const { Search } = Input;
  const [currentPath] = useState(window.location);
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState([0,0]);
  const { slug } = useParams();
  const [recordItem, setRecordItem] = useState([]);
  const [employersWithJobCounts, setEmployersWithJobCounts] = useState([]);
  // Sử dụng useEffect để thực hiện các tác vụ bất đồng bộ khi component được render hoặc khi giá trị của slug thay đổi
  useEffect(() => {
    // Hàm fetchCompanyData thực hiện việc lấy dữ liệu công ty từ API
    const fetchCompanyData = async () => {
      // Gọi API để lấy thông tin công ty dựa trên slug
      const result = await getCompany(slug);
      // Nếu mã trạng thái không phải là 200, kết thúc hàm
      if (result.code !== 200) return;

      // Giải mã dữ liệu nhận được từ API
      const dectDataConvert = decData(result.data);
      // Xử lý địa chỉ của công ty
      handleAddress(dectDataConvert);
      handleNumberOfWorkers(dectDataConvert)
      // Cập nhật trạng thái của component với dữ liệu công ty đã được giải mã
      setRecordItem(dectDataConvert);
      // Cập nhật trạng thái của component với số lượng công việc của nhà tuyển dụng
      setEmployersWithJobCounts(result.employersWithJobCounts);
    };

    const handleNumberOfWorkers = (data)=>{
      data.numberOfWorkers = dataNumberOfWorkers.find((item)=>item?.value === data?.numberOfWorkers)?.label
      
    }
    // Hàm handleAddress xử lý địa chỉ của công ty
    const handleAddress = async (data) => {
      // Kiểm tra xem địa chỉ có hợp lệ không
      if (!isAddressValid(data?.specificAddressCompany)) return;

      // Lấy placeId từ địa chỉ
      const placeId = getPlaceIdFromAddress(data.specificAddressCompany);
      // Lấy vị trí dựa trên placeId
      const location = await fetchLocation(placeId);
      // Nếu có vị trí, cập nhật trạng thái của component với vị trí đó
      if (location) setLocation(location);

      // Lấy địa chỉ từ chuỗi địa chỉ
      const address = getAddressFromAddressString(data.specificAddressCompany);
      // Cập nhật địa chỉ của công ty trong dữ liệu
      data.specificAddressCompany = address;
    };

    // Hàm isAddressValid kiểm tra xem địa chỉ có hợp lệ không
    const isAddressValid = (address) => {
      return typeof address === "string" && address.includes("-");
    };

    // Hàm getPlaceIdFromAddress lấy placeId từ địa chỉ
    const getPlaceIdFromAddress = (address) => {
      return address.split("-")[1];
    };

    // Hàm fetchLocation lấy vị trí dựa trên placeId
    const fetchLocation = async (placeId) => {
      // Gọi API để lấy vị trí dựa trên placeId
      const result = await getCoordinateAddress({ placeid: placeId });
      // Nếu mã trạng thái không phải là 200, trả về null
      if (result.code !== 200) return null;
      // Trả về vị trí
      return [result?.data?.location?.lat, result?.data?.location?.lng];
    };

    // Hàm getAddressFromAddressString lấy địa chỉ từ chuỗi địa chỉ
    const getAddressFromAddressString = (address) => {
      return address.split("-")[0];
    };

    // Gọi hàm fetchCompanyData để bắt đầu quá trình lấy dữ liệu
    fetchCompanyData();
  }, [slug]); // useEffect sẽ chạy lại mỗi khi giá trị của slug thay đổi

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="cb-section cb-section-padding-bottom bg-grey2">
      <div className="container">
        <div className="full-info-company">
          <div className="box-info-company mb-3">
            <div className="header-company ">
              <div className="banner">
                <img src={recordItem?.bannerCompany} alt="" />
              </div>
              <div className="comapany-logo">
                <div className="company-image-logo">
                  <img src={recordItem?.logoCompany} alt="logo" />
                </div>
              </div>
              <div className="company-detail">
                <div className="box-detail">
                  <h1>CÔNG TY {recordItem?.companyName}</h1>
                 
                  <div className="box-icon">
                    <div className="item">
                      <FontAwesomeIcon icon={faLink} />
                      <span>{recordItem?.website}</span>
                    </div>
                    <div className="item">
                      <FontAwesomeIcon icon={faUserGroup} />
                      <span>{recordItem?.numberOfWorkers} nhân viên</span>
                    </div>
                    <div className="item">
                      <FontAwesomeIcon icon={faPhone} />
                      <span>{recordItem?.phoneCompany}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <div className="description-box mb-3">
                <div className="title-header1">
                  <h2>Giới thiệu công ty</h2>
                </div>
                <div className="box-item-content">
                  <div
                    className={"dest " + (isExpanded ? "expanded " : "")}
                    dangerouslySetInnerHTML={{
                      __html: recordItem?.descriptionCompany,
                    }}
                  />
                  {!isExpanded && <div className="filter-blue"></div>}

                  <div className="view " onClick={toggleExpand}>
                    {isExpanded ? (
                      <div>
                        <span>Thu gọn</span>
                        <FontAwesomeIcon icon={faChevronUp} />
                      </div>
                    ) : (
                      <div>
                        <span>Xem thêm</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="job-box mb-4">
                <div className="title-header1">
                  <h2>Tuyển dụng</h2>
                </div>
                <div className="box-item-content">
                  <MemoizedJobByCompany slug={recordItem?.slug} />
                </div>
              </div>
              {employersWithJobCounts.length > 0 && (
                <div className="job-box-cutstom">
                  <div className="mb-3">
                    <h3>Công ty cùng lĩnh vực</h3>
                  </div>
                  <div className="record-with-job">
                    {employersWithJobCounts.length > 0 &&
                      employersWithJobCounts.map((item, index) => (
                        <div key={index} className="record mb-4">
                          <div className="flex">
                            <div className="logo-company">
                              <img src={item?.logoCompany} alt="" />
                            </div>
                            <div className="content">
                              <div>
                                <a href={item?.slug} className="name-company">
                                  CÔNG TY {item?.companyName}
                                </a>
                              </div>

                              <div className="count-job">
                                {item?.countJobs} việc làm
                              </div>
                            </div>
                          </div>
                          <div className="tag-tag">Cùng lĩnh vực</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-4">
              <div className="info-contact">
                <div className="box-contact mb-2">
                  <div className="title-header1">
                    <h2>Thông tin liên hệ</h2>
                  </div>
                  <div className="box-item-content">
                    <div className="box-address">
                      <div className="item-grid mb-2">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Địa chỉ công ty</span>
                      </div>
                      <div className="content-grid">
                        {recordItem?.specificAddressCompany}
                      </div>
                    </div>
                    <hr />
                    <div className="box-map">
                      <div className="item-grid mb-2">
                        <FontAwesomeIcon icon={faMap} />
                        <span>Xem bản đồ</span>
                      </div>
                      <div className="content-grid">
                        <div
                          style={{ borderRadius: "10px", overflow: "hidden" }}
                        >
                          <MemoizedBoxGoogleMap
                          height={300}
                            latitude={location[0]}
                            longitude={location[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-contact">
                <div className="box-contact mb-2">
                  <div className="title-header1">
                    <h2>Chia sẻ công ty tới bạn bè</h2>
                  </div>
                  <div className="box-item-content">
                    <div className="share-box mb-3">
                      <div className="p-content mb-2">Sao chép đường dẫn</div>
                      <div className="input">
                        <ConfigProvider
                          theme={{
                            token: {
                              colorPrimary: "#5dcaf9",
                            },
                            components: {
                              Input: {
                                paddingInlineLG: 16,
                                paddingBlockLG: 7,
                              },
                            },
                          }}
                        >
                          <Search
                            defaultValue={currentPath}
                            placeholder="Text..."
                            allowClear
                            enterButton={<FontAwesomeIcon icon={faCopy} />}
                            size="large"
                            onSearch={(value) => {
                              navigator.clipboard.writeText(value);
                            }}
                          />
                        </ConfigProvider>
                      </div>
                    </div>
                    <div className="box-icon">
                      <div className="p-content mb-2">
                        Chia sẻ qua mạng xã hội
                      </div>
                      <div className="icon-icon">
                        <div className="facebook">
                          <FontAwesomeIcon icon={faFacebook} />
                        </div>
                        <div className="twitter">
                          <FontAwesomeIcon icon={faTwitter} />
                        </div>
                        <div className="instagram">
                          <FontAwesomeIcon icon={faSquareInstagram} />
                        </div>
                      </div>
                    </div>
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
export default InfoCompany;
