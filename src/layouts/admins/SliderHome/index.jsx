import "./SliderHome.scss"
import { Menu } from 'antd';

import { HomeOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPersonMilitaryPointing, faGbp } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";

function SliderHome(props) {
  const { collapsed, setCollapsed } = props
  //Lấy thông tin quyền từ store của  redux
  const permissions = useSelector((status) => status.authenticationReducerAdmin.infoUser.permissions);

  const location = useLocation()

  function getItem(key, label, icon, children) {
    return {
      key,
      icon,
      label,
      children,

    };
  }
  const items = [
    getItem('/dashboard', <span className="layout__slider-item">Trang Chủ</span>, <span className="layout__slider-item"><HomeOutlined /></span>, [
      getItem('/admin/', <Link to="/admin/">Go Home</Link>, null),
    ]),
    //nếu user có quyền xem thì mới hiển thị danh mục công việc
    permissions.includes('job-categories-view') &&
    getItem('categories', <span className="layout__slider-item">Danh Mục Cv</span>, <span className="layout__slider-item"><FontAwesomeIcon icon={faList} /></span>, [
      getItem('/admin/add-categories', <Link to="add-categories">Thêm Danh Mục Công Việc</Link>, null),
      getItem('/admin/management-categories', <Link to="management-categories">Quản Lý Danh Mục</Link>, null)
    ]),
    //nếu user có quyền xem thì mới hiển thị danh mục công việc
    permissions.includes('job-categories-view') &&
    getItem('jobs', <span className="layout__slider-item">Công Việc</span>, <span className="layout__slider-item"><FontAwesomeIcon icon={faGbp} /></span>, [
      getItem('/admin/add-jobs', <Link to="add-jobs">Thêm Công Việc</Link>, null),
      getItem('/admin/management-jobs', <Link to="management-jobs">Quản Lý Công Việc</Link>, null)
    ]),
    //nếu user có quyền xem thì mới hiển thị quyền
    permissions.includes('roles-view') &&
    getItem('permission', <span className="layout__slider-item">Quyền</span>, <span className="layout__slider-item"><FontAwesomeIcon icon={faPersonMilitaryPointing} /></span>, [
      getItem('/admin/add-group-permission', <Link to="add-group-permission">Thêm Nhóm Quyền</Link>, null),
      getItem('/admin/management-group-permission', <Link to="management-group-permission">Quản Lý Nhóm Quyền</Link>, null),
      getItem('/admin/set-permission', <Link to="set-permission">Phân Quyền</Link>, null)
    ]),

  ];
  function clickCollapsed() {
    setCollapsed(!collapsed);
  }
  return (
    <>

      <Menu className="layout__slider-menu"

        defaultSelectedKeys={location.pathname}
        defaultOpenKeys={['categories']}
        mode="inline"
        items={items}
        theme="light"
      />
      {
        collapsed ? (
          <span onClick={clickCollapsed} className="layout_slider-collab"><CaretRightOutlined /></span>
        ) : (
          <span onClick={clickCollapsed} className="layout_slider-collab-no-active"><CaretLeftOutlined /></span>
        )
      }
    </>
  )
}
export default SliderHome