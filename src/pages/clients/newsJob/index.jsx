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

import { decData } from "../../../helpers/decData";
import { fetchApi, reloadData } from "./js/fetchApi";
import { dataLevel, optionsSalary } from "./js/options";
import { getJobAdvancedSearch } from "../../../services/clients/jobsApi";
import ItemBoxNews from "../../../components/clients/itemBoxNews";
import MayBeInterested from "../../../components/clients/mayBeInterested";
import CompanyOutstanding from "../../../components/clients/companyOutstanding";
function NewJob() {
  const [jobCategories, setJobCategories] = useState([]);
  const [recordItem, setRecordItem] = useState([]);

  const [value, setValue] = useState(1);
  const [page] = useState(1);
  const [limit] = useState(10);
  const [sort_key, setSort_key] = useState("createdAt");
  const [sort_value, setSort_value] = useState("desc");
  const [keyword, setKeyword] = useState("");
  const [job_categorie, setJob_categorie] = useState("");
  const [job_type] = useState("");
  const [job_level, setJob_level] = useState("");
  const [salary_min, setSalary_min] = useState("");
  const [salary_max, setSalary_max] = useState("");
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
      setCoutJob,
    );
  }, []);

  const handleForm = useCallback(
    async (valuesForm) => {
      const { job_categories, job_level, kewword, salary } = valuesForm;
      const objectNew = {
        job_categories: job_categories || "",
        job_level: job_level || "",
        kewword: kewword || "",
        salary_min: salary.split("-")[0] || "",
        salary_max: salary.split("-")[1] || "",
      };
      const result = await getJobAdvancedSearch(
        1,
        10,
        sort_key,
        sort_value,
        objectNew.kewword,
        objectNew.job_categories,
        "",
        objectNew.job_level,
        objectNew.salary_min,
        objectNew.salary_max
      );
      if (result.code === 200) {
        setJob_categorie(objectNew.job_categories);
        setJob_level(objectNew.job_level);
        setKeyword(objectNew.kewword);
        setSalary_min(objectNew.salary_min);
        setSalary_max(objectNew.salary_max);
        const data = decData(result.data);
        setRecordItem(data);
      }
    },
    [sort_key, sort_value]
  );

  const onChangeRaido = useCallback(
    (e) => {
      const value = e.target.value;
      switch (value) {
        case 1:
          reloadData(
            setJobCategories,
            setRecordItem,
            page,
            limit,
            "createdAt",
            "desc",
            keyword,
            job_categorie,
            job_type,
            job_level,
            salary_min,
            salary_max
          );
          setSort_key("createdAt");
          setSort_value("desc");
          break;
        case 2:
          reloadData(
            setJobCategories,
            setRecordItem,
            page,
            limit,
            "salaryMax",
            "desc",
            keyword,
            job_categorie,
            job_type,
            job_level,
            salary_min,
            salary_max
          );
          setSort_key("salaryMax");
          setSort_value("desc");
          break;
      }
      setValue(value);
    },
    [
      page,
      limit,
      keyword,
      job_categorie,
      job_type,
      job_level,
      salary_min,
      salary_max,
    ]
  );
  const handleChangePreview = useCallback((e) => {
    const value = e.target.value;
    const element = document.querySelector(".may-be-interested");
    if (value === "sticky") {
      element.classList.add("sticky-add");
    } else {
      element.classList.remove("sticky-add");
    }
  }, []);
 
  const handleChangePagination = useCallback((value)=>{
    reloadData(
      setJobCategories,
      setRecordItem,
      value,
      limit,
      sort_key,
      sort_value,
      keyword,
      job_categorie,
      job_type,
      job_level,
      salary_min,
      salary_max
    );
  },[])
  return (
    <div className="cb-section bg-grey2">
      <div className="container">
        <div className="news__job">
          <MemoizedNewsJobHeader />
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
                      defaultValueOk=""
                    />
                  </Form.Item>
                </div>
                <div className="col-custom">
                  <Form.Item name="job_level">
                    <SearchCustomVip
                      prefix={<FontAwesomeIcon icon={faBuilding} />}
                      options={dataLevel}
                      defaultValueOk=""
                    />
                  </Form.Item>
                </div>
                <div className="col-custom">
                  <Form.Item name="salary">
                    <SearchCustomVip
                      prefix={<FontAwesomeIcon icon={faBuilding} />}
                      options={optionsSalary}
                      defaultValueOk=""
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
                <h4>Ưu tiên hiển thị</h4>
                <Radio.Group onChange={onChangeRaido} value={value}>
                  <Radio value={1}>Tin mới nhất</Radio>
                  <Radio value={2}>Lương cao nhất</Radio>
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
              <ItemBoxNews recordItem={recordItem} handleChangePagination ={handleChangePagination} countPagination = {coutJob}/>
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
