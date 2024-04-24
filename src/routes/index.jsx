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
import MangaementJobs from "../pages/admins/managementJobs";
import JobSearch from "../pages/clients/jobSearch";
import NotFound from "../pages/clients/notFound";
import Login from "../pages/clients/login";
import Register from "../pages/clients/register";
import ForgotPassword from "../pages/clients/forgotPassword";
import ResetPassword from "../pages/clients/resetPassword";
import CheckRoutesClient from "../components/clients/checkRoutes";
import InfoUser from "../components/clients/infoUser";
import PrivateRoutesClient from "../components/clients/privateRoutes";
import PasswordClient from "../pages/clients/password";
import SettingsAccount from "../child-element/clients/settings-account";
import InfoUserClient from "../pages/clients/infoUserClientSettings";
import SuggestedClientSettings from "../pages/clients/suggestedClientSettings";
import Test from "../pages/clients/Test";
import EmailSuggestions from "../pages/clients/emailSuggestions";
import NewJob from "../pages/clients/newsJob";

import HomeEmployers from "../pages/employers/home";
import LoginEmployers from "../pages/employers/login";
import RegisterEmployers from "../pages/employers/register";

import ForgotPasswordEmployer from "../pages/employers/forgotPassword";
import ResetPasswordEmployer from "../pages/employers/resetPassword";
import InfoUserEmployer from "../components/employers/infoUser";
import CheckRoutesEmployer from "../components/employers/checkRoutes";
import DashboardEmployer from "../pages/employers/dasboard";
import PrivateRoutesEmployer from "../components/employers/privateRoutes";
import LayoutMainEmployersNoHeaderAndNoFooter from "../layouts/employers/layout-home";
import LayoutMainEmployers from "../layouts/employers/layout-login";
import LayoutMainEmployerAdmin from "../layouts/employersAdmin";
import ManagementJobsEmployer from "../pages/employers/managementJobs";
import SettingEmployer from "../pages/employers/settings-employer";
import PhoneVerify from "../pages/employers/phoneVerify";
import AddJobsEmployer from "../pages/employers/addJobs";
import DetailJob from "../pages/employers/deltailJob";
import UploadCv from "../pages/clients/uploadCv";
import ManagementCv from "../pages/clients/managementCv";
import ChatBox from "../pages/employers/chatBox";
import ChatBoxClient from "../pages/clients/chatBox";
import ManagementCvs from "../pages/employers/managementCvs";
import JobSaves from "../pages/clients/jobSaves";
import ListJobAppy from "../pages/clients/listJobApply";
import InfoCompany from "../pages/clients/infoCompany";
import JobSearchAdvanced from "../pages/clients/jobSearchAdvanced";

export const routes = [
  //client
  {
    path: "/",
    element: <LayoutMainClient />,
    children: [
      {
        element: <InfoUser />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          //Chi tiết công việc
          {
            path: "tim-viec-lam/:slug",
            element: <JobSearch />,
          },

          {
            path: "viec-lam/tat-ca-viec-lam",
            element: <NewJob />,
          },
          {
            path: "viec-lam/tim-viec-lam",
            element: <JobSearchAdvanced />,
          },
          {
            path: "cong-ty/:slug",
            element: <InfoCompany />,
          },
        ],
      },

      {
        element: <CheckRoutesClient />,
        children: [
          {
            path: "login",
            element: <Login />,
          },

          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "reset-password/:token",
            element: <ResetPassword />,
          },
        ],
      },
      {
        element: <PrivateRoutesClient />,
        children: [
          {
            path: "viec-lam",
            element: <SettingsAccount />,
            children: [
              {
                path: "viec-lam-da-ung-tuyen",
                element: <ListJobAppy />,
              },
              {
                path: "viec-lam-da-luu",
                element: <JobSaves />,
              },
            ],
          },
        ],
      },
      {
        element: <PrivateRoutesClient />,
        children: [
          {
            path: "tai-khoan",
            element: <SettingsAccount />,
            children: [
              {
                path: "mat-khau",
                element: <PasswordClient />,
              },
              {
                path: "thong-tin",
                element: <InfoUserClient />,
              },
              {
                path: "cai-dat-goi-y-viec-lam",
                element: <SuggestedClientSettings />,
              },
              {
                path: "cai-dat-thong-bao-email",
                element: <EmailSuggestions />,
              },
      
              {
                path: "test",
                element: <Test />,
              },
            ],
          },
          {
            path: "cv/upload-cv",
            element: <UploadCv />,
          },

          {
            path: "cv",
            element: <SettingsAccount />,
            children: [
              {
                path: "quan-ly-cv",
                element: <ManagementCv />,
              },
            ],
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <PrivateRoutesClient />,
    children: [
      {
        path: "chat-box",
        element: <ChatBoxClient />,
      },
      {
        path: "chat-box/t/:idUser",
        element: <ChatBoxClient />,
      },
    ],
  },
  //admin
  {
    path: "admin",
    element: <LayoutMainAdmin />,
    children: [
      {
        element: <CheckRoutes />,
        children: [
          {
            path: "login",
            element: <LoginAdmin />,
          },
        ],
      },

      {
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          //Danh mục công việc
          {
            path: "add-categories",
            element: <AddCategories />,
          },
          {
            path: "management-categories",
            element: <ManagementCategories />,
          },
          //Quản lý công việc
          {
            path: "add-jobs",
            element: <AddJobs />,
          },
          {
            path: "management-jobs",
            element: <MangaementJobs />,
          },
          //Quyền
          {
            path: "add-group-permission",
            element: <AddGroupPermission />,
          },
          {
            path: "management-group-permission",
            element: <ManagementGroupPermission />,
          },
          {
            path: "set-permission",
            element: <SetPermission />,
          },
        ],
      },
    ],
  },

  //employers
  {
    path: "/nha-tuyen-dung",
    element: <LayoutMainEmployersNoHeaderAndNoFooter />,
    children: [
      {
        element: <CheckRoutesEmployer />,
        children: [
          {
            path: "login",
            element: <LoginEmployers />,
          },
          {
            path: "register",
            element: <RegisterEmployers />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordEmployer />,
          },
          {
            path: "reset-password/:token",
            element: <ResetPasswordEmployer />,
          },
        ],
      },
    ],
  },
  {
    path: "/nha-tuyen-dung",
    element: <LayoutMainEmployers />,
    children: [
      {
        element: <InfoUserEmployer />,
        children: [
          {
            index: true,
            element: <HomeEmployers />,
          },
        ],
      },
    ],
  },
  {
    path: "/nha-tuyen-dung/app",
    element: <LayoutMainEmployerAdmin />,
    children: [
      {
        element: <PrivateRoutesEmployer />,
        children: [
          {
            path: "dashboard",
            element: <DashboardEmployer />,
          },
          {
            path: "management-jobs",
            element: <ManagementJobsEmployer />,
          },
          {
            path: "detail-jobs/:id",
            element: <DetailJob />,
          },
          {
            path: "add-jobs-employer",
            element: <AddJobsEmployer />,
          },
          {
            path: "management-cvs",
            element: <ManagementCvs />,
          },
          {
            path: "account/settings",
            element: <SettingEmployer />,
          },
          {
            path: "account/phone-verify",
            element: <PhoneVerify />,
          },
        ],
      },
    ],
  },
  {
    path: "/nha-tuyen-dung/app",
    element: <PrivateRoutesEmployer />,
    children: [
      {
        path: "chat-box",
        element: <ChatBox />,
      },
      {
        path: "chat-box/t/:idUser",
        element: <ChatBox />,
      },
    ],
  },
];
