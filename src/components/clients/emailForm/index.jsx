

import { Input } from 'antd';
import "./emailForm.scss"
function EmailForm(props) {
    const { Search } = Input;
    const handleFormSearch = (value) => {
        

      }
    return (
        <div className="cb-section">
            <div className="email ">
                <div className="mbr-overlay" style={{ backgroundColor: "rgb(0,0,0" }}></div>
                <div className="email__box container ">
                    <div className="row justify-content-center">
                        <div className="email__box-title col-12">
                            <h2 className="text-center">Hãy Đăng Ký Theo Dõi Để Nhận Cơ Hội Làm Việc Mới Nhất</h2>
                        </div>
                        <div className="email__box-form col-6">
                            <Search
                                className="search__form "
                                placeholder="Nhập địa chỉ email của bạn"
                                onSearch={handleFormSearch}
                                enterButton="Đăng Ký Ngay"
                            />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
export default EmailForm;
