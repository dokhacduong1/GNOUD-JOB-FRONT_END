import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import "./jobByCompany.scss";
import { memo, useEffect, useState } from "react";
import { getCityApiDuong } from "../../../services/clients/user-userApi";
import { jobByCompany } from "../../../services/clients/jobsApi";
import MemoizedItemBoxNews from "../itemBoxNews";
import { removeAccents } from "../../../helpers/removeAccents";
function JobByCompany({ slug }) {
  const [city, setCity] = useState([]);
  const [recordItem, setRecordItem] = useState([]);
  const [coutJob, setCoutJob] = useState(0);
  const [page, setPage] = useState(1);
  const [kewword, setKeyword] = useState("");
  const [city_select, setCitySelect] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCityApiDuong();

      if (result.code === 200) {
        const convertData = result.data.map((item) => ({
          label: item.name,
          value: item.slug,
        }));
        convertData.unshift({
          label: "Tất cả tỉnh/thành phố",
          value: "",
        });
        setCity(convertData);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (!slug) return;
    const fetchApi = async () => {
      const result = await jobByCompany(slug, page, kewword, city_select);
      if (result.code === 200) {
        setRecordItem(result.data);
        setCoutJob(result.countJobs);
      }
    };
    fetchApi();
  }, [slug, page, kewword, city_select]);

  const handleChangePagination = (page_select) => {
    window.scrollTo(0, 1000);
    setPage(page_select);
  };
  const handleForm = (value) => {
    const keyword_form = value.keyword || "";
    const city_select_form = value.city_select || "";
    setKeyword(keyword_form);
    setCitySelect(city_select_form);
  };
  return (
    <div className="job-by-company">
      <ConfigProvider
        theme={{
          components: {
            Input: {
              paddingBlockLG: 14,
              addonBg: "#fff",
              activeShadow: "none",
              hoverBorderColor: "#fff",
            },
            Select: {
              singleItemHeightLG: 53,
              optionActiveBg: "rgba(0, 0, 0, 0.04)",
              optionSelectedBg: "#fff",
              optionPadding: "15px 10px",
              optionSelectedColor: "#5dcaf9",
            },
            Button: {
              colorPrimaryActive: "#5dcaf9",
              colorPrimaryBorder: "#5dcaf9",
              colorPrimaryHover: "#5dcaf9",
              defaultHoverBorderColor: "#5dcaf9",
              defaultHoverColor: "#fff",
              groupBorderColor: "#5dcaf9",
              colorPrimary: "#5dcaf9",
              paddingBlockLG: 25,
            },
          },
          token: {
            fontSize: 16,
            /* here is your global tokens */
          },
        }}
      >
        <Form
          onFinish={handleForm}
          initialValues={{
            kewword: kewword,
            city_select: city_select,
          }}
          className="row gx-0 align-items-center"
          layout="inline"
        >
          <Form.Item name="keyword" className="col-4">
            <Input
              placeholder="Tên công việc, vị trí ứng tuyển..."
              size="large"
              addonBefore={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
          </Form.Item>
          <Form.Item name="city_select" className="col-4">
            <Select
              showSearch
              filterOption={(input, option) =>
                removeAccents(option.label)
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase()) ||
                removeAccents(option.value)
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase())
              }
              size="large"
              options={city}
            />
          </Form.Item>
          <Form.Item className="col-3" style={{ flex: "1", marginRight: "0" }}>
            <Button
              style={{ width: "100%" }}
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>

      <MemoizedItemBoxNews
        recordItem={recordItem}
        defaultValue={page}
        handleChangePagination={handleChangePagination}
        countPagination={coutJob}
        colGrid="col-md-12"
      />
    </div>
  );
}
const MemoizedJobByCompany = memo(JobByCompany);
export default MemoizedJobByCompany;
