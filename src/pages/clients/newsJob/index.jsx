import { Form, Input, Radio } from "antd";
import MemoizedNewsJobHeader from "../../../components/clients/newsJobHeader";
import "./newsJob.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import SearchCustomVip from "../../../components/clients/searchCustomVip";
import { useCallback, useEffect, useState } from "react";

import { fetchApi } from "./js/fetchApi";
import { dataLevel, optionsSalary } from "./js/options";

import ItemBoxNews from "../../../components/clients/itemBoxNews";
import MayBeInterested from "../../../components/clients/mayBeInterested";
import CompanyOutstanding from "../../../components/clients/companyOutstanding";
import { useQuery } from "../../../helpers/getQuery";
import { useNavigate } from "react-router-dom";

function NewJob() {
  const navigate = useNavigate();
  const [jobCategories, setJobCategories] = useState([]);
  const [recordItem, setRecordItem] = useState([]);
  const query = useQuery();
  const page = query.get("page") || 1;
  const limit = query.get("limit") || 10;
  const sort_key = query.get("sort_key") || "createdAt";
  const sort_value = query.get("sort_value") || "desc";
  const keyword = query.get("keywords") || "";
  const job_categorie = query.get("job_categories") || "";
  const job_type = query.get("job_type") || "";
  const job_level = query.get("job_level") || "";
  const salary_min = query.get("salary_min") || "";
  const salary_max = query.get("salary_max") || "";
  const [listTag] = useState([
    {
      name: "Tài chính",
    },
    {
      name: "Kinh doanh",
    },
    {
      name: "Marketing",
    },
    {
      name: "Nhân sự",
    },
  ]);
  const [coutJob, setCoutJob] = useState(0);

  useEffect(() => {
    fetchApi(
      setJobCategories,
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
      setCoutJob
    );
  }, [
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
  ]);

  const buildQueryString = (params) => {
    window.scrollTo(0, 0);
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value || ""}`)
      .join("&");
  };

  const handleForm = useCallback(
    async (valuesForm) => {
      const { job_categories, job_level, kewword, salary } = valuesForm;

      const params = {
        keywords: kewword,
        job_categories,
        job_level,
        salary_min: salary?.split("-")[0] || "",
        salary_max: salary?.split("-")[1] ||"",
        sort_key: sort_key,
        sort_value,
        page: 1,
      };
      navigate(`?${buildQueryString(params)}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, page, sort_key, sort_value]
  );

  const onChangeRaido = (e) => {
    const value = e.target.value;

    const params = {
      keywords: keyword,
      job_categories: job_categorie,
      job_level,
      salary_min,
      salary_max,
      sort_key: value,
      sort_value,
      page,
    };
    navigate(`?${buildQueryString(params)}`);
  };

  const handleChangePreview = (e) => {
    const value = e.target.value;
    const element = document.querySelector(".may-be-interested");
    if (value === "sticky") {
      element.classList.add("sticky-add");
    } else {
      element.classList.remove("sticky-add");
    }
  };

  const handleChangePagination = (page_select) => {
    const params = {
      keywords: keyword,
      job_categories: job_categorie,
      job_level,
      salary_min,
      salary_max,
      sort_key,
      sort_value,
      page: page_select,
    };
    navigate(`?${buildQueryString(params)}`);
  };

  return (
    <div className="cb-section cb-section-padding-bottom bg-grey2">
      <div className="container">
        <div className="news__job">
          <MemoizedNewsJobHeader
            listTag={listTag}
            title={"Việc làm mới nhất"}
            description={
              "Nâng tầm sự nghiệp với các cơ hội việc làm mới nhất tại các công ty hàng đầu. Thu nhập xứng tầm, đãi ngộ hấp dẫn, trải nghiệm đáng giá, khám phá ngay!"
            }
          />
          <div className="news__job-body">
            <div className="news__job-form-search">
              <Form
                className="form-ok align-items-center gx-3"
                onFinish={handleForm}
                layout="inline"
              >
                <div className="col-custom col-6">
                  <Form.Item name="kewword">
                    <Input
                      value={keyword}
                      size="large"
                      placeholder="Tên công việc, vị trí bạn muốn ứng tuyển..."
                      prefix={
                        <span className="news__jobs-searchIcon">
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                      }
                    />
                  </Form.Item>
                </div>
                <div className="col-custom">
                  <Form.Item name="job_categories">
                    <SearchCustomVip
                      prefix={<FontAwesomeIcon icon={faBuilding} />}
                      options={jobCategories}
                      defaultValueOk={job_categorie}
                    />
                  </Form.Item>
                </div>
                <div className="col-custom">
                  <Form.Item name="job_level">
                    <SearchCustomVip
                      prefix={<FontAwesomeIcon icon={faBuilding} />}
                      options={dataLevel}
                      defaultValueOk={job_level}
                    />
                  </Form.Item>
                </div>
                <div className="col-custom">
                  <Form.Item name="salary">
                    <SearchCustomVip
                      prefix={<FontAwesomeIcon icon={faBuilding} />}
                      options={optionsSalary}
                      defaultValueOk={
                        salary_max && salary_min
                          ? salary_min + "-" + salary_max
                          : ""
                      }
                    />
                  </Form.Item>
                </div>
                <div className="col-custom">
                  <Form.Item name="button-submitok">
                    <button className="button-search-job" type="primary">
                      {" "}
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                      <span>Tìm kiếm</span>
                    </button>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className="cout__job">
              <h3>
                Tìm thấy <span>{recordItem?.length}</span> việc làm phù hợp với
                yêu cầu của bạn
              </h3>
            </div>
            <div className="job-sort-news">
              <div className="radio">
                <h4 style={{fontWeight:"500"}}>Ưu tiên hiển thị:</h4>
                <Radio.Group onChange={onChangeRaido} value={sort_key}>
                  <Radio value={"createdAt"}>Tin mới nhất</Radio>
                  <Radio value={"salaryMax"}>Lương cao nhất</Radio>
                </Radio.Group>
              </div>
              <div className="switch">
                <Radio.Group
                  onChange={handleChangePreview}
                  defaultValue="no-sitcky"
                >
                  <Radio.Button value="no-sitcky">Chế Độ Normal</Radio.Button>
                  <Radio.Button value="sticky">Chế Độ Preview</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <div className="job-full-search">
              <ItemBoxNews
                recordItem={recordItem}
                handleChangePagination={handleChangePagination}
                defaultValue={page}
                countPagination={coutJob}
              />
              <div className="suggested-job col-md-4">
                <MayBeInterested />
                <hr />
                <CompanyOutstanding />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewJob;
