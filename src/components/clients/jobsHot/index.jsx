import { Pagination, Tabs } from "antd";


import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getListJobsFeatured, getListJobsLevels, getListJobsSalarys } from "../../../services/clients/jobsApi";

import "./jobsHot.scss"
import { decData } from "../../../helpers/decData";

function JobsHot() {
    const [listJobsFeatured, setListJobsFatured] = useState([]);
    const [listJobsSalary, setListJobsSalary] = useState([]);
    const [listJobsLevel, setListJobsLevel] = useState([]);



    //phân trang cho job nổi bật
    const changePaginationFeture = async (page) => {
        getListJobsFature(page);
    }

    //phân trang cho job lương trên 1000 đô
    const changePaginationSalary = async (page) => {
        getListJobsSalary(page);
    }
    //phân trang cho job cần kinh nghiệm
    const changePaginationLevel = async (page) => {
        getListJobsLevel(page);
    }


    //Lấy công việc có cần kinh nghiệm
    const getListJobsLevel = async (page) => {
        const recordEmployersLevel = await getListJobsLevels(page);

        if (recordEmployersLevel.code === 200) {
            setListJobsLevel({
                record: decData(recordEmployersLevel.data),
                //Nếu mà số lượng lớn hơn 5 thì cho nó là 5 thôi
                countPagination: recordEmployersLevel.countJobs > 5 ? 5 : recordEmployersLevel.countJobs
            });
        }
    }

    //Lấy công việc lương trên 1000 đô
    const getListJobsSalary = async (page) => {
        const recordEmployersSalary = await getListJobsSalarys(page);
        if (recordEmployersSalary.code === 200) {
            setListJobsSalary({
                record: decData(recordEmployersSalary.data),
                //Nếu mà số lượng lớn hơn 5 thì cho nó là 5 thôi
                countPagination: recordEmployersSalary.countJobs > 5 ? 5 : recordEmployersSalary.countJobs
            });
        }
    }

    //Lấy công việc nổi bật
    const getListJobsFature = async (page) => {
        const recordEmployersFeture = await getListJobsFeatured(page);
        if (recordEmployersFeture.code === 200) {
            setListJobsFatured({
                record: decData(recordEmployersFeture.data),
                //Nếu mà số lượng lớn hơn 5 thì cho nó là 5 thôi
                countPagination: recordEmployersFeture.countJobs > 5 ? 5 : recordEmployersFeture.countJobs
            });

        }
    }




    useEffect(() => {
        const fetchApi = async () => {
            //Vào sẽ mặc định là page 1
            await getListJobsFature(1);
            await getListJobsSalary(1);
            await getListJobsLevel(1)
        }
        fetchApi();
    }, [])



    const items = [
        {
            key: '1',
            label: 'Việc Làm Nổi Bật',
            children:
                (
                    <div className="job__featured">
                        <div className="row job__featured-change">
                            {
                                listJobsFeatured?.record?.length > 0 && (
                                    listJobsFeatured.record.slice(0, 8).map((dataMap, index) => (
                                        <div key={index} className="col-lg-6 ">
                                            <div className="job__item">
                                                <div className="col-12">
                                                    <div className="row job__item-box justify-content-center align-items-center">
                                                        <div className="job__featured-boxImage col-2">
                                                            <img src={dataMap.employerId.image} alt={dataMap.employerId.companyName}></img>
                                                        </div>
                                                        <div className="job__featured-content col-10">
                                                            <h2 >{dataMap.title}</h2>
                                                            <h3 className="mt-1">Bảo Mật</h3>
                                                            <h4 className="mt-1">Lương: {dataMap.salary}</h4>
                                                            <h5 className="mt-1 "><FontAwesomeIcon icon={faLocationDot} /> </h5>
                                                        </div>
                                                        <div className="job__item-box-icon">
                                                            <span className="top">TOP</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            }



                        </div>
                        {
                            listJobsFeatured?.record?.length > 0 && (
                                <Pagination onChange={changePaginationFeture} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5.8rem" }} defaultCurrent={1} total={(listJobsFeatured.countPagination) * 10} />
                            )
                        }

                    </div>),
        },
        {
            key: '2',
            label: 'Việc Làm Ngàn Đô',
            children:
                (
                    <div className="job__featured">
                        <div className="row job__featured-change">
                            {
                                listJobsSalary?.record?.length > 0 && (
                                    listJobsSalary.record.slice(0, 8).map((dataMap, index) => (
                                        <div key={index} className="col-lg-6 ">
                                            <div className="job__item">
                                                <div className="col-12">
                                                    <div className="row job__item-box justify-content-center align-items-center">
                                                        <div className="job__featured-boxImage col-2">
                                                            <img src={dataMap.employerId.image} alt={dataMap.employerId.companyName}></img>
                                                        </div>
                                                        <div className="job__featured-content col-10">
                                                            <h2 >{dataMap.title}</h2>
                                                            <h3 className="mt-1">Bảo Mật</h3>
                                                            <h4 className="mt-1">Lương: {dataMap.salary}</h4>
                                                            <h5 className="mt-1 "><FontAwesomeIcon icon={faLocationDot} /> </h5>
                                                        </div>
                                                        <div className="job__item-box-icon">
                                                            <span className="salary">Mới</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            }



                        </div>
                        {
                            listJobsSalary?.record?.length > 0 && (
                                <Pagination onChange={changePaginationSalary} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5.8rem" }} defaultCurrent={1} total={(listJobsSalary.countPagination) * 10} />
                            )
                        }

                    </div>),

        },
        {
            key: '3',
            label: 'Việc Làm Không Cần Kinh Nghiệm',
            children:
                (
                    <div className="job__featured">
                        <div className="row job__featured-change">
                            {
                                listJobsLevel?.record?.length > 0 && (
                                    listJobsLevel.record.slice(0, 8).map((dataMap, index) => (
                                        <div key={index} className="col-lg-6 ">
                                            <div className="job__item">
                                                <div className="col-12">
                                                    <div className="row job__item-box justify-content-center align-items-center">
                                                        <div className="job__featured-boxImage col-2">
                                                            <img src={dataMap.employerId.image} alt={dataMap.employerId.companyName}></img>
                                                        </div>
                                                        <div className="job__featured-content col-10">
                                                            <h2 >{dataMap.title}</h2>
                                                            <h3 className="mt-1">Bảo Mật</h3>
                                                            <h4 className="mt-1">Lương: {dataMap.salary}</h4>
                                                            <h5 className="mt-1 "><FontAwesomeIcon icon={faLocationDot} /> </h5>
                                                        </div>
                                                        <div className="job__item-box-icon">
                                                            <span className="level">HOT</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            }



                        </div>
                        {
                            listJobsLevel?.record?.length > 0 && (
                                <Pagination onChange={changePaginationLevel} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5.8rem" }} defaultCurrent={1} total={(listJobsLevel.countPagination) * 10} />
                            )
                        }

                    </div>),
        },
    ];
    return (
        <div className="jobs cb-section">
            <div className="container">
                <h2 className="text-center title-text">CÔNG VIỆC ĐƯỢC YÊU THÍCH</h2>
                <Tabs size="large " centered defaultActiveKey="1" items={items} />
            </div>
        </div>
    );
}
export default JobsHot;
