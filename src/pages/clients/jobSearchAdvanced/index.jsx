import "./jobSearchAdvanced.scss";

import { ConfigProvider, Form, Radio, Select } from "antd";
import {
  dataExperience,
  dataJobType,
  dataLevel,
  optionsSalary,
} from "./js/options";
import GroupSearch from "../../../components/clients/groupSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faBuilding,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MemoizedSearchCustomVip from "../../../components/clients/searchCustomVip";
import { useEffect, useState } from "react";
import { fetchApi } from "./js/fetchApi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../helpers/getQuery";
import moment from "moment";
import MemoizedItemBoxNews from "../../../components/clients/itemBoxNews";
import MemoizedMayBeInterested from "../../../components/clients/mayBeInterested";
import MemoizedCompanyOutstanding from "../../../components/clients/companyOutstanding";

const buildQueryString = (params) => {

  window.scrollTo(0, 0);
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value || ""}`)
    .join("&");
};
function JobSearchAdvanced() {
  const [form] = Form.useForm();
  const [hiden, setHiden] = useState(true);
  const query = useQuery();
  const keyword = query.get("keywords") || "";
  const page = query.get("page") || 1;
  const limit = query.get("limit") || 10;
  const sort_key = query.get("sort_key") || "createdAt";
  const sort_value = query.get("sort_value") || "desc";
  const job_categorie = query.get("job_categorie") || "";
  const job_type = query.get("job_type") || "";
  const job_level = query.get("job_level") || "";
  const salary_min = query.get("salary_min") || "";
  const salary_max = query.get("salary_max") || "";
  const workExperience = query.get("workExperience") || "";
  const city = query.get("city") || "";
  const [optionCategories, setOptionCategories] = useState([]);

  const [recordItem, setRecordItem] = useState([]);
  const [coutJob, setCoutJob] = useState(0);
  const navigate = useNavigate();

  const handleFinish = (values) => {
    const { groupDataSearch } = values;
    if (groupDataSearch === undefined) {
      values.groupDataSearch = { city: "", keyword: "" };
    }
    const { keyword, city } = values.groupDataSearch;
    const { workExperience, salary } = values;
    //city
    const params = {
      keywords: keyword,
      page: 1,
      city,
      sort_key: sort_key,
      sort_value,
      job_categorie,
      job_type,
      job_level,
      limit,
      workExperience,
      salary_min: salary?.split("-")[0] || "",
      salary_max: salary?.split("-")[1] || "",
    };
    navigate(`?${buildQueryString(params)}`);
  };
  useEffect(() => {
    fetchApi(
      setOptionCategories,
      setRecordItem,
      page,
      limit,
      sort_key,
      sort_value,
      keyword,
      job_categorie,
      job_type,
      job_level,
      salary_min,
      salary_max,
      city,
      workExperience,
      setCoutJob
    );
  }, [
    city,
    job_categorie,
    job_level,
    job_type,
    keyword,
    limit,
    page,
    salary_max,
    salary_min,
    sort_key,
    sort_value,
    workExperience,
  ]);
  const handleChangeHiden = () => {
    setHiden(!hiden);
  };


  const handleChangeJobCategories = (value) => {
    const params = {
      keywords: keyword,
      page: 1,
      city: city,
      sort_key: sort_key,
      sort_value: sort_value,
      job_categorie: value,
      job_type: job_type,
      job_level: job_level,
      limit: limit,
      workExperience: workExperience,
      salary_min: salary_min || "",
      salary_max: salary_max || "",
    };
    navigate(`?${buildQueryString(params)}`);
  };
  const handleChangeJobType = (value) => {
    const params = {
      keywords: keyword,
      page: 1,
      city: city,
      sort_key: sort_key,
      sort_value: sort_value,
      job_categorie: job_categorie,
      job_type: value,
      job_level: job_level,
      limit: limit,
      workExperience: workExperience,
      salary_min: salary_min || "",
      salary_max: salary_max || "",
    };
    navigate(`?${buildQueryString(params)}`);
  };
  const handleChangeJobLevel = (value) => {
    const params = {
      keywords: keyword,
      page: 1,
      city: city,
      sort_key: sort_key,
      sort_value: sort_value,
      job_categorie: job_categorie,
      job_type: job_type,
      job_level: value,
      limit: limit,
      workExperience: workExperience,
      salary_min: salary_min || "",
      salary_max: salary_max || "",
    };
    navigate(`?${buildQueryString(params)}`);
  };
  const onChangeRaido = (e) => {
    const value = e.target.value;
    const params = {
      keywords: keyword,
      page: 1,
      city: city,
      sort_key: value,
      sort_value: sort_value,
      job_categorie: job_categorie,
      job_type: job_type,
      job_level: job_level,
      limit: limit,
      workExperience: workExperience,
      salary_min: salary_min || "",
      salary_max: salary_max || "",
    };
    navigate(`?${buildQueryString(params)}`);
  };
  const handleChangePagination = (value) => {
    const params = {
      keywords: keyword,
      page: value,
      city: city,
      sort_key: sort_key,
      sort_value: sort_value,
      job_categorie: job_categorie,
      job_type: job_type,
      job_level: job_level,
      limit: limit,
      workExperience: workExperience,
      salary_min: salary_min || "",
      salary_max: salary_max || "",
    };
    navigate(`?${buildQueryString(params)}`);
  }
  return (
    <div className="cb-section cb-section-padding-bottom">
      <div className="search-addvance">
        <div className="header-search-addvance ">
          <div className="container">
            <div className="box-normal mb-3">
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionPadding: "8px 12px",
                      singleItemHeightLG: 50,
                      optionSelectedBg: "#7acff3",
                      optionSelectedColor: "#fff",
                    },
                  },
                  token: {},
                }}
              >
                <Form
                  initialValues={{ workExperience: "", salary: "" }}
                  form={form}
                  layout="inline row gx-0"
                  onFinish={handleFinish}
                >
                  <Form.Item className="col-5" name="groupDataSearch">
                    <GroupSearch
                      valueCity={city}
                      valueKeyword={keyword}
                      onValueChange={(value) =>
                        form.setFieldsValue({ groupDataSearch: value })
                      }
                    />
                  </Form.Item>

                  <Form.Item className="col-2" name={"workExperience"}>
                    <Select size="large" options={dataExperience} />
                  </Form.Item>
                  <Form.Item className="col-2" name={"salary"}>
                    <Select size="large" options={optionsSalary} />
                  </Form.Item>
                  <Form.Item
                    className="col-2"
                    style={{ flex: "1", marginRight: 0 }}
                  >
                    <button
                      className="button-submit"
                      size="large"
                      type="submit"
                    >
                      Tìm kiếm
                    </button>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </div>
            <div className="box-count mb-3">
              <div className="count-job">
                Tổng{" "}
                <span style={{ color: "rgb(255 239 0)", fontWeight: "600" }}>
                  {recordItem?.length}
                </span>{" "}
                kết quả
              </div>
              <div className="button-addvance" onClick={handleChangeHiden}>
                <FontAwesomeIcon icon={faBars} />
                <span>Lọc nâng cao</span>
                {hiden ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </div>
            </div>
            <div className={`select-addvance ${hiden ? "hiden-select" : ""}`}>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionPadding: "8px 12px",
                      singleItemHeightLG: 50,
                      optionSelectedBg: "#7acff3",
                      optionSelectedColor: "#fff",
                    },
                  },
                  token: {},
                }}
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="select">
                      <MemoizedSearchCustomVip
                        prefix={<FontAwesomeIcon icon={faBuilding} />}
                        defaultValueOk={job_categorie}
                        value={job_categorie}
                        options={optionCategories}
                        onChange={handleChangeJobCategories}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="select">
                      <MemoizedSearchCustomVip
                        options={dataJobType}
                        prefix={<FontAwesomeIcon icon={faBuilding} />}
                        defaultValueOk={job_type}
                        value={job_type}
                        onChange={handleChangeJobType}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="select">
                      <MemoizedSearchCustomVip
                        options={dataLevel}
                        prefix={<FontAwesomeIcon icon={faBuilding} />}
                        defaultValueOk={job_level}
                        onChange={handleChangeJobLevel}
                        value={job_level}
                      />
                    </div>
                  </div>
                </div>
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div className="body-searh-advance bg-grey2 pt-3">
          <div className="container">
            <div className="box-heading-content">
              <div className="heading mb-2">
                <h1>
                  Tuyển dụng {recordItem?.length} việc làm mới nhất{" "}
                  {new Date().getFullYear("YYYY/MM/Đ")}
                </h1>
              </div>
              <div className="breadcrumb-custom mb-2">
                <a href="/">Trang chủ</a>
                <FontAwesomeIcon icon={faChevronRight} />
                <p>
                  Tuyển dụng {recordItem?.length}{" "}
                  {keyword
                    ? `${keyword} [Update ${moment(new Date()).format(
                        "YYYY/MM/DD"
                      )}]`
                    : `việc làm mới nhất ${new Date().getFullYear(
                        "YYYY/MM/Đ"
                      )}`}
                </p>
              </div>
              <div className="box-sort mb-2">
                <div className="radio">
                  <h4 style={{ fontWeight: "500" }}>Ưu tiên hiển thị theo:</h4>
                  <ConfigProvider
                    theme={{
                      components: {
                        Radio: {
                          radioSize: 23,
                          dotSize: 13,
                        },
                      },
                    }}
                  >
                    <Radio.Group onChange={onChangeRaido} value={sort_key}>
                      <Radio value={"createdAt"}>Tin mới nhất</Radio>
                      <Radio value={"updatedAt"}>Ngày cập nhật</Radio>
                      <Radio value={"salaryMax"}>Lương cao nhất</Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>
              </div>
              <div className="row">
                <MemoizedItemBoxNews
                  recordItem={recordItem}
                  handleChangePagination={handleChangePagination}
                  defaultValue={page}
                  countPagination={coutJob}
                />
                  <div className="suggested-job col-md-4">
                <MemoizedMayBeInterested />
                <hr />
                <MemoizedCompanyOutstanding />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JobSearchAdvanced;
