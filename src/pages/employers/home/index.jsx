import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.scss";
import {
  faArrowRight,
  faCheck,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import banner2 from "./images/banner2.png";
import banner3 from "./images/banner3.png";
import banner4 from "./images/banner4.png";
import item6 from "./images/item6.png";
import item7 from "./images/item7.png";
import ContactUsers from "../../../components/employers/contact-users";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useEffect } from "react";
import MemoizedCherryBlossom from "../../../components/employers/cherryBlossom";

function HomeEmployers() {
  // Defining WOW

  const blossoms = Array(Math.floor(Math.random() * 9) + 2).fill(null);

  useEffect(() => {
    AOS.init({
      duration: 2500,
    });
  }, []);
  return (
    <div className="cb-section">
      <div className="">
        <div className="home-employer">
          {/* section1 */}
          <section className="section-1 bg-main " style={{position:"relative"}}>
            {blossoms.map((_, index) => (
              <MemoizedCherryBlossom key={index} />
            ))}
            <h1 className="heading">
              Đăng tin tuyển dụng <br /> tìm kiếm ứng viên thật hiệu quả
            </h1>
            <div className="button-link">
              <a className="button-link-link" href="#!">
                Đăng tin miễn phí
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </section>
          {/* section2 */}
          <div className="bg-color-blur">
            <div className="container">
              <section
                className="section-2
              content-check row justify-content-center align-items-center"
              >
                <div className="items col-6">
                  <div className="big-update">BIG UPDATE</div>
                  <h2 className="heading">GNOUD Leading Platform</h2>
                  <p className="description">
                    Nền tảng hàng đầu về xin việc của chúng tôi kết hợp
                    Marketing Tuyển dụng và công nghệ hiện đại để cung cấp các
                    giải pháp toàn diện giúp doanh nghiệp tối ưu hóa quy trình
                    tuyển dụng. Từ việc tạo nguồn CV đến sàng lọc hồ sơ ứng
                    viên, đánh giá và đo lường hiệu quả, chúng tôi cam kết mang
                    lại trải nghiệm tốt nhất cho việc thu hút và tuyển dụng nhân
                    tài cho doanh nghiệp của bạn.
                  </p>
                  <div className="free-consultation ">
                    <a href="#!" className="button-link-link">
                      Tư vấn tuyển dụng miễn phí
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </div>
                <div className="images col-6 " data-aos="fade-left">
                  <img src={banner2} alt="banner2" />
                </div>
              </section>
            </div>
          </div>
          {/* section3 */}
          <div className="container">
            <section className="section-3 padding-convert">
              <div className="box-content">
                <h2 className="hedings">
                  Công nghệ đăng tin tuyển dụng mới. Tính năng mới. Trải nghiệm
                  mới
                </h2>
              </div>
              <div className="box-item content-check row justify-content-center align-items-center ">
                <div className="images col-6" data-aos="fade-right">
                  <img src={banner3} alt="banner3" />
                </div>
                <div className="items col-6">
                  <div className="big-update">
                    New technology in recruitment
                  </div>
                  <h2 className="heading">Tương lai mới của tuyển dụng</h2>
                  <p className="description">
                    Tương lai của tuyển dụng đang dần chuyển hướng sang sự kết
                    hợp giữa trí tuệ nhân tạo và tự động hóa. Công nghệ mới như
                    AI và dữ liệu lớn đang giúp tạo ra các hệ thống tuyển dụng
                    thông minh, từ việc phân tích hồ sơ ứng viên đến dự đoán
                    hiệu suất làm việc. Đồng thời, trải nghiệm ứng viên cũng trở
                    nên quan trọng hơn, với sự tập trung vào việc xây dựng quy
                    trình tuyển dụng linh hoạt và thân thiện. Tương lai của
                    tuyển dụng không chỉ là việc điều chỉnh quy trình hiện tại
                    mà còn là việc khám phá và sáng tạo để tạo ra một môi trường
                    làm việc đa dạng và phát triển cho mọi ứng viên.
                  </p>
                  <div className="free-consultation ">
                    <a href="#!" className="button-link-link">
                      Tư vấn tuyển dụng miễn phí
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* section4 */}
          <div className="bg-color">
            <div className="container">
              <section className="section-4 padding-convert">
                <div className="headers box-content">
                  <div className="text-pink">
                    CORE FUNCTIONS OF GNOUD SMART RECRUITMENT PLATFORM
                  </div>
                  <h2 className="hedings">
                    Các tính năng mới cập nhật trên GNOUD Recruitment Platform
                  </h2>
                  <p className="description">
                    Với sự tiên tiến của công nghệ, nền tảng GNOUD Smart
                    Recruitment đã trải qua một quá trình nâng cấp toàn diện và
                    cung cấp một trải nghiệm đầy độc đáo và tiện ích, giúp doanh
                    nghiệp khai thác mọi tiềm năng từ các phương tiện số trong
                    quá trình tuyển dụng, đồng thời tối ưu hóa hiệu quả và kết
                    quả cuối cùng.
                  </p>
                </div>
                <div className="bodys">
                  <div className="row gy-4 gx-4">
                    <div className="col-4">
                      <div className="items">
                        <div className="item-box">
                          <h3 className="headings-h3">Đề xuất bởi GNOUD</h3>
                          <div className="images">
                            <img src={item6} alt="" />
                          </div>
                          <p className="description">
                            GNOUD sẽ tiến hành phân tích dữ liệu doanh nghiệp,
                            nhu cầu tuyển dụng và hành vi tìm việc của ứng viên
                            để đề xuất những hoạt động, giải pháp tuyển dụng
                            giúp nhà tuyển dụng gia tăng hiệu quả tuyển dụng.
                          </p>
                          <div className="preview mt-3">
                            <a href="#!">Tìm hiểu thêm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="items">
                        <div className="item-box">
                          <h3 className="headings-h3">Chiến dịch Tuyển Dụng</h3>
                          <div className="images">
                            <img src={item6} alt="" />
                          </div>
                          <p className="description">
                            Giúp doanh nghiệp hoàn thiện được cấu trúc cơ bản
                            của quá trình tuyển dụng và quản lý được các nguồn
                            mang lại hiệu quả cho hoạt động tuyển dụng đó. Từ
                            đó, nhà tuyển dụng có thể tối ưu các phương pháp tìm
                            nguồn ứng viên và tuyển dụng hiệu quả hơn.
                          </p>
                          <div className="preview mt-3">
                            <a href="#!">Tìm hiểu thêm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="items">
                        <div className="item-box">
                          <h3 className="headings-h3">Tính năng quản lý CV</h3>
                          <div className="images">
                            <img src={item6} alt="" />
                          </div>
                          <p className="description">
                            Giúp nhà tuyển dụng quản lý kho CV ứng viên của mình
                            một cách đầy đủ, có tính hệ thống và không bị mất
                            mát dữ liệu.
                          </p>
                          <div className="preview mt-3">
                            <a href="#!">Tìm hiểu thêm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="items">
                        <div className="item-box">
                          <h2 className="headings-h3">
                            Hệ thống báo cáo tuyển dụng
                          </h2>
                          <div className="images">
                            <img src={item6} alt="" />
                          </div>
                          <p className="description">
                            Giúp nhà tuyển dụng biết được chính xác số lượng CV
                            ứng viên qua từng vòng từ vòng nhận CV đến đi làm.
                            Đồng thời cũng đo lường chi phí tuyển dụng theo giá
                            trị thực tế mà doanh nghiệp đã chi trả để tìm kiếm
                            ứng viên.
                          </p>
                          <div className="preview mt-3">
                            <a href="#!">Tìm hiểu thêm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="items">
                        <div className="item-box">
                          <h3 className="headings-h3">
                            Hệ thống đánh giá ứng viên
                          </h3>
                          <div className="images">
                            <img src={item6} alt="" />
                          </div>
                          <p className="description">
                            Với nền tảng GNOUD Smart Recruitment Platform giúp
                            nhà tuyển dụng đánh giá ứng viên toàn diện và khách
                            quan thông qua bài test online, từ đó tối ưu tỷ lệ
                            chuyển đổi, tìm kiếm ứng viên tài năng từ nguồn CV
                            ứng viên thu được từ Chiến dịch tuyển dụng.
                          </p>
                          <div className="preview mt-3">
                            <a href="#!">Tìm hiểu thêm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="items">
                        <div className="item-box">
                          <h3 className="headings-h3">
                            Tăng hiệu quả qua hình thức trả phí
                          </h3>
                          <div className="images">
                            <img src={item6} alt="" />
                          </div>
                          <p className="description">
                            Nhà tuyển dụng hoàn toàn chủ động trong việc lựa
                            chọn và kích hoạt dịch vụ phù hợp để gia tăng số
                            lượng CV ứng viên ứng tuyển và tìm kiếm ứng viên tài
                            năng. Với các phương pháp tìm nguồn ứng viên thông
                            minh, hiệu quả, nhà tuyển dụng sẽ dễ dàng tìm kiếm
                            ứng viên cho Chiến dịch tuyển dụng của mình khi sử
                            dụng GNOUD Smart Recruitment Platform.
                          </p>
                          <div className="preview mt-3">
                            <a href="#!">Tìm hiểu thêm</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* section5 */}
          <div className="container">
            <section className="section-5 padding-convert">
              <div className="box-content text-center">
                <div className="text-pink">RECRUITMENT SERVICES</div>
                <h2 className="hedings">Dịch vụ đăng tin tuyển dụng</h2>
              </div>
              <div className="box-item content-check row justify-content-center align-items-center ">
                <div className="images col-6 " data-aos="zoom-in-left">
                  <img src={banner4} alt="banner2" />
                </div>
                <div className="items col-6">
                  <h2 className="heading-2">Đăng tin tuyển dụng miễn phí</h2>
                  <ul className="list-item">
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                        Đăng tin tuyển dụng miễn phí và không giới hạn số lượng
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>Đăng tin tuyển dụng dễ dàng, không quá 1 phút</span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>
                        Tiếp cận nguồn CV ứng viên khổng lồ, tìm kiếm ứng viên
                        từ kho dữ liệu hơn 1 triệu hồ sơ
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      <span>Dễ dàng kiểm duyệt và đăng tin trong 24h</span>
                    </li>
                  </ul>
                  <div className="free-consultation ">
                    <a href="#!" className="button-link-link">
                      Tư vấn tuyển dụng miễn phí
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* section6 */}
          <div className="container">
            <section className="section-6 padding-convert">
              <div className="box-item content-check row justify-content-center align-items-center ">
                <div className="items col-6">
                  <div>
                    <h2 className="heading-2">
                      Top công việc - Quảng cáo tin tuyển dụng
                    </h2>
                    <ul className="list-item">
                      <li>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>
                          Tăng lượt tiếp cận người tìm việc thêm 300% khi đăng
                          tuyển.
                        </span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>
                          Tin tuyển dụng hiển thị ở những vị trí nổi bật.
                        </span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>
                          Tự động gợi ý tin tuyển dụng với ứng viên phù hợp,
                          giúp tuyển dụng hiệu quả hơn.
                        </span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Dễ dàng kiểm duyệt và đăng tin trong 24h</span>
                      </li>
                    </ul>
                    <div className="free-consultation ">
                      <a href="#!" className="button-link-link">
                        Tư vấn tuyển dụng miễn phí
                        <FontAwesomeIcon icon={faArrowRight} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="images col-6 " data-aos="zoom-in-right">
                  <img src={banner4} alt="banner2" />
                </div>
              </div>
            </section>
          </div>
          {/* section7 */}
          <div className="bg-color">
            <div className="container">
              <section className="section-7 padding-convert">
                <div className="box-content text-center">
                  <div className="text-pink">FIGURES</div>
                  <h2 className="hedings">
                    Những con số của trang tuyển dụng GNOUD
                  </h2>
                </div>
                <div className="row gy-4 gx-4 content-check row justify-content-center align-items-center ">
                  <div className="col-4">
                    <div className="item-box">
                      <div className="title">2.100.000+</div>
                      <p className="description">
                        Ứng viên đang bật tìm việc trung bình/thời điểm
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="item-box">
                      <div className="title">200.000+</div>
                      <p className="description">
                        Doanh nghiệp tuyển dụng sử dụng dịch vụ tuyển dụng hiệu
                        quả của TopCV
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="item-box">
                      <div className="title">350.000+</div>
                      <p className="description">
                        Nhà tuyển dụng sử dụng thường xuyên để đăng tin tuyển
                        dụng, tìm kiếm ứng viên tiềm năng chỉ với những thao tác
                        đơn giản, nhanh gọn
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="item-box">
                      <div className="title">200.000+</div>
                      <p className="description">
                        Ứng viên tạo mới tài khoản trên TopCV mỗi tháng
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="item-box">
                      <div className="title">5.400.000+</div>
                      <p className="description">
                        Lượt ứng viên truy cập hàng tháng, là một trong những
                        trang tuyển dụng có lượng truy cập lớn nhất tại Việt Nam
                        tại thời điểm này.
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="item-box">
                      <div className="title">7.100.000+</div>
                      <p className="description">
                        Ứng viên tiềm năng, trong đó có 50% là ứng viên có kinh
                        nghiệm từ 3 năm trở lên
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* section8 */}
          <div className="bg-color">
            <div className="container">
              <section className="section-8">
                <div className="box-header">
                  <div className="text-1">
                    Đâu là giải pháp phù hợp cho doanh nghiệp của bạn
                  </div>
                  <p className="description">
                    Hãy để lại thông tin và các chuyên viên tư vấn tuyển dụng
                    của GNOUD sẽ liên hệ ngay với bạn
                  </p>
                </div>
                <div className="box-body">
                  <ContactUsers />
                </div>
              </section>
            </div>
          </div>

          {/* section9 */}
          <div className="bg-color">
            <div className="container">
              <section className="section-9 padding-convert">
                <div className="box-content text-center">
                  <div className="text-pink">VALUES</div>
                  <h2 className="hedings">
                    Giá trị khi sử dụng GNOUD Smart Recruitment Platform
                  </h2>
                </div>
                <div className="bodys content-check row ">
                  <div className=" col-6">
                    <div className="items-box items">
                      <div className="images">
                        <img
                          src="https://res.cloudinary.com/dmmz10szo/image/upload/v1709038706/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_4_mdhklh.png"
                          alt="image-ok-1"
                        />
                      </div>
                      <div className="content ">
                        <h2 className="heading">Đối với Doanh nghiệp</h2>
                        <ul className="list-items">
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              Biến tuyển dụng thành một vũ khí cạnh tranh cho
                              doanh nghiệp:{" "}
                              <strong>
                                tăng cơ hội chọn lựa nhân tài phù hợp
                              </strong>
                              , đẩy mạnh hiệu suất kinh doanh và thúc đẩy thành
                              công trong chuyển đổi số.
                            </span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              Chuẩn hóa toàn bộ quy trình tuyển dụng thống nhất
                              và bài bản.
                            </span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              Xây dựng <strong>thương hiệu tuyển dụng</strong>{" "}
                              uy tín, chuyên nghiệp.
                            </span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              <strong>Tiết kiệm</strong> thời gian, chi phí cho
                              hoạt động tuyển dụng.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className=" col-6">
                    <div className="items-box items">
                      <div className="images">
                        <img
                          src="https://res.cloudinary.com/dmmz10szo/image/upload/v1709038797/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_5_nf1bow.png"
                          alt="s"
                        />
                      </div>
                      <div className="content ">
                        <h2 className="heading">Đối với Nhà tuyển dụng</h2>
                        <ul className="list-items">
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              <strong>Tối ưu hóa</strong> việc quản lý các hoạt
                              động tuyển dụng cho từng vị trí thông qua các
                              chiến dịch tuyển dụng
                            </span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              Đăng tin tuyển dụng, tạo & quản lý{" "}
                              <strong>nguồn ứng viên</strong> hiệu quả.
                            </span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              <strong>Đánh giá ứng viên</strong> một cách toàn
                              diện dựa trên dữ liệu cụ thể, giúp quyết định
                              tuyển dụng chính xác hơn và giảm thiểu tỷ lệ sai
                              lầm trong quá trình tuyển chọn.
                            </span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              Chủ động lên kế hoạch &{" "}
                              <strong>tối ưu chi phí</strong> tuyển dụng theo
                              các số liệu đo lường.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* section10 */}
          <div className="container">
            <section className="section-10 padding-convert">
              <div className="box-content text-center">
                <div className="text-pink">ABOUT US</div>
                <h2 className="hedings">Về chúng tôi</h2>
              </div>
              <div className="bodys row ">
                <div className="col-8 convert-col">
                  <div className="content">
                    <p>
                      GNOUD là một nền tảng mới nổi trong lĩnh vực công nghệ
                      tuyển dụng dành cho sinh viên tại Việt Nam, tập trung vào
                      việc kết nối sinh viên với cơ hội việc làm phù hợp với hệ
                      sinh thái đa dạng.
                    </p>
                    <p>
                      Với ứng dụng GNOUD, sinh viên có thể tìm kiếm và ứng tuyển
                      vào các vị trí thực tập và việc làm phù hợp với nhu cầu và
                      kỹ năng của mình. Nền tảng cung cấp công cụ để sinh viên
                      thiết lập và đánh giá năng lực cá nhân, từ đó giúp họ tăng
                      cơ hội được chọn lựa bởi các doanh nghiệp.
                    </p>
                    <p>
                      Với sứ mệnh tạo ra cơ hội việc làm cho sinh viên và đồng
                      thời hỗ trợ doanh nghiệp tìm kiếm nhân tài trẻ, GNOUD đã
                      kết nối thành công hàng ngàn sinh viên với các cơ hội việc
                      làm phù hợp mỗi năm.
                    </p>
                    <p>
                      Chúng tôi không ngừng nghiên cứu và phát triển công nghệ
                      để mang lại trải nghiệm tuyển dụng tốt nhất cho cả sinh
                      viên và doanh nghiệp, hướng tới một tương lai nền kinh tế
                      phát triển bền vững cho Việt Nam.
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="images" data-aos="zoom-out-down">
                    <img src={item7} alt="item-7" />
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* section11 */}
          <div className="bg-color">
            <div className="container">
              <section className="section-11 padding-convert ">
                <div className="content-check">
                  <div className="items text-left">
                    <h2 className="heading">
                      GNOUD Việt Nam mong muốn được hợp tác cùng Doanh nghiệp
                    </h2>
                    <p className="description">
                      Đội ngũ hỗ trợ của GNOUD luôn sẵn sàng để tư vấn giải pháp
                      tuyển dụng và đồng hành cùng các Quý nhà tuyển dụng
                    </p>
                  </div>
                </div>
                <div className="bodys row">
                  <div className="col-4 custon-col">
                    <div className="item-box">
                      <h3 className="title">
                        Hotline Tư vấn Tuyển dụng miền Bắc
                      </h3>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 custon-col">
                    <div className="item-box">
                      <h3 className="title">
                        Hotline Tư vấn Tuyển dụng miền Nam
                      </h3>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Đỗ Khắc Dương</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 custon-col">
                    <div className="item-box">
                      <h3 className="title">
                        Hỗ trợ khách hàng và khiếu nại dịch vụ
                      </h3>
                      <div className="box-hotline">
                        <div className="icon warning-icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content warning-content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Admin</p>
                        </div>
                      </div>
                      <div className="box-hotline">
                        <div className="icon warning-icon">
                          <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="content warning-content">
                          <a href="tel:0879279678">0879 279 678</a>
                          <p>Admin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeEmployers;
