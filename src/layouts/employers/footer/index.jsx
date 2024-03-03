import { Layout } from 'antd';
import "./footer.scss"

import { NavLink } from 'react-router-dom';
import dk from "./images/dk.webp"

const { Footer } = Layout;

function FooterMain() {
    return (
        <>
            <Footer className='footer'>
                <div className='container footer__main'>
                    <div className="footer__logo col-2">
                        <NavLink className="mr-1 emplo" to={"/"}>GNOUD</NavLink>
                    </div>
                    <div className='row footer__main-body'>
                        <div className='col-2'>
                            <div className='footer__link'>
                                <h2>DÀNH CHO ỨNG VIÊN</h2>
                                <ul style={{listStyle:"none",padding:"0"}}>
                                    <li>Việc Làm Mới Nhất</li>
                                    <li>Cv Hay</li>
                                    <li>Cẩm Nang</li>
                                    <li>GNOUD</li>
                                    <li>It Blogs</li>
                                    <li>Sơ Đồ Trang Web</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='footer__link'>
                                <h2>NHÀ TUYỂN DỤNG</h2>
                                <ul style={{listStyle:"none",padding:"0"}}>
                                    <li>Đăng Tuyển Dụng</li>
                                    <li>Giải Pháp Hay</li>
                                    <li>Cẩm Nang</li>
                                    <li>Sản Phẩm Dịch Vụ</li>

                                </ul>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='footer__link'>
                                <h2>TRUNG TÂM HỖ TRỢ</h2>
                                <ul style={{listStyle:"none",padding:"0"}}>
                                    <li>Về GNOUD</li>
                                    <li>Chính Sách Bảo Vệ Thông Tin</li>
                                    <li>Quy Chế Sàn Giao Dịch</li>
                                    <li>Điều Khoản Sử Dụng</li>
                                    <li>Chính Sách Quyền Riêng Tư</li>
                                    <li>Giải Quyết Tranh Chấp</li>
                                    <li>Trợ Giúp</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='footer__link'>
                                <h2>WEBSITE ĐỐI TÁC</h2>
                                <ul style={{listStyle:"none",padding:"0"}}>
                                    <li>DuongShop.xyz</li>
                                    <li>DuongCompany.xyz</li>
                                    <li>DuongCompanyTree.xyz</li>
                                    <li>ItDuongHoc.com</li>
                                    <li>DuongIt.com</li>
                                    <li>Liên Hệ</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='footer__link'>
                                <h2>XÂY DỰNG SỰ NGHIỆP</h2>
                                <ul style={{listStyle:"none",padding:"0"}}>
                                    <li>Freelancer</li>
                                    <li>Thiết Kế Nội Thất</li>
                                    <li>Giám Sát An Toàn</li>
                                    <li>Nhân Viên Kinh Doanh</li>
                                    <li>Admins</li>
                                    <li>Digital marketing</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-2'>
                            <div className='footer__link'>
                                <h2>TÌM KIẾM MỌI LÚC MỌI NƠI</h2>
                                <div className='footer__logo-icon '>
                                    <div className='logo-face '>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" /></svg>
                                    </div>
                                    <div className='logo-likedin'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                                    </div>
                                    <div className='logo-youtube'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr></hr>
                    <div className='footer__end'>
                        <div className='row'>
                            <div className='col-10 '>
                                <div className='box-title'>
                                    <p>Trụ sở chính: Tầng 3, Tòa Nhà An Dương House, 68 An Đồng, An Dương, TP.Hải Phòng - Tel: (+84)879279678</p>
                                    <p>Văn phòng Kiến An: Tòa nhà 3, 102 Kiến An, TP.Hải Phòng - Tel: (+84)879279678</p>
                                    <p>Email: dokhacduong3@gmail.com</p>
                                    <p>Copyright © GNOUD Vietnam</p>
                                </div>
                            </div>
                            <div className='col-2 text-right'>
                                <img src={dk} alt='dk.jpg'></img>
                            </div>
                        </div>

                    </div>

                </div>

            </Footer>
        </>
    )
}
export default FooterMain