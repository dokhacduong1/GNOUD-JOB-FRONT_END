
import LayoutMainClient from "../layouts/clients";

import Home from "../pages/clients/home/index";
import LayoutMainAdmin from "../layouts/admins";
import CheckRoutes from "../components/admins/checkRoutes";
import LoginAdmin from "../pages/admins/login";
import PrivateRoutes from "../components/admins/privateRoutes";
import DashBoard from "../pages/admins/dashboard";
import AddCategories from "../pages/admins/addCategories";
import ManagementCategories from "../pages/admins/managementCategories";
import AddJobs from "../pages/admins/addJobs";
import AddGroupPermission from "../pages/admins/addGroupPermission";
import ManagementGroupPermission from "../pages/admins/managementGroupPermission";
import SetPermission from "../pages/admins/setPermission";



export const routes = [
  //client
  {
    path: "/",
    element: <LayoutMainClient />,
    children: [
      {
        index: true,
        element: <Home />,
      }
    ],
  },
   //admin
   {
    path: "/admin",
    element: <LayoutMainAdmin />,
    children: [
      {
        path: "login",
        element: <LoginAdmin />,
      }
      // {
      //   element: <CheckRoutes />,
      //   children: [
      //     {
      //       path: "login",
      //       element: <LoginAdmin />,
      //     }
      //   ]
      // },

      // {
      //   element: <PrivateRoutes />,
      //   children: [
      //     {
      //       index: true,
      //       element: <DashBoard />,
      //     },
      //     //Danh mục công việc
      //     {
      //       path: "add-categories",
      //       element: <AddCategories />
      //     },
      //     {
      //       path: "management-categories",
      //       element: <ManagementCategories />
      //     },
      //     //Quản lý công việc
      //     {
      //       path: "add-jobs",
      //       element: <AddJobs />
      //     },
      //     {
      //       path: "management-jobs",
      //       element: <ManagementCategories />
      //     },
      //     //Quyền
      //     {
      //       path: "add-group-permission",
      //       element: <AddGroupPermission />
      //     },
      //     {
      //       path: "management-group-permission",
      //       element: <ManagementGroupPermission />
      //     },
      //     {
      //       path: "set-permission",
      //       element: <SetPermission />
      //     }

      //   ]
      // },

    ],
  }
  
];
