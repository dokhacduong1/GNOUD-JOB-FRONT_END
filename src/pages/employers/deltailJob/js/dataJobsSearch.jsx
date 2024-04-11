import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcaseMedical,faPlane,faUsd,faUserMd,faGraduationCap,faLineChart,faLaptop,faMoneyBill,
    faTaxi,faUserTie,faBriefcase,faHeartbeat
} from '@fortawesome/free-solid-svg-icons'
export const dataJobType = [
    {
        value:"official-employee",
        label:"Nhân Viên Chính Thức"
    },
    {
        value:"part-time",
        label:"Bán Thời Gian"
    },
    {
        value:"seasonal-freelance",
        label:"Thời Vụ - Nghề Tự Do"
    },
    {
        value:"intern",
        label:"Thực Tập"
    }
]

export const dataExperience  = [
    {
        value:"no-required",
        label:"Không Yêu Cầu Kinh Nghiệm"
    },
    {
        value:"experienced",
        label:"Có Kinh Nghiệm"
    },
    {
        value:"no-experience-yet",
        label:"Chưa Có Kinh Nghiệm"
    },

]

export const dataReceiveEmail  = [
    {
        value:"vietnamese",
        label:"Tiếng Việt"
    },
    {
        value:"english",
        label:"Tiếng Anh"
    },
    {
        value:"no-email",
        label:"Không Nhận Email"
    },
   
]


export const dataDegree  = [
    {
        value:"high-school",
        label:"Trung Học"
    },
    {
        value:"intermediate-level",
        label:"Trung Cấp"
    },
    {
        value:"college",
        label:"Cao Đẳng"
    },
    {
        value:"iniversity",
        label:"Đại Học"
    },
    {
        value:"after-university",
        label:"Cao Đẳng"
    },
    {
        value:"other",
        label:"Khác"
    },

]

export const dataLevel = [
    {
        value:"student-intern",
        label:"Sinh Viên/Thực Tập Sinh"
    },
    {
        value:"just-have-graduated",
        label:"Mới Tốt Nghiệp"
    },
    {
        value:"staff",
        label:"Nhân Viên"
    },
    {
        value:"teamleader-supervisor",
        label:"Trường Nhóm/Giám Sát"
    },
    {
        value:"manage",
        label:"Quản Lý"
    },
    {
        value:"vice-director",
        label:"Phó Giám Đốc"
    },
    {
        value:"manager",
        label:"Giám Đốc"
    },
    {
        value:"general-manager",
        label:"Tổng Giám Đốc"
    },
    {
        value:"president-vicepresident",
        label:"Chủ Tịch/Phó Chủ Tịch"
    },

]

export const dataProfileRequirement = [
    {
        value:"english",
        label:"Tiếng Anh"
    },
    {
        value:"vietnamese",
        label:"Tiếng Việt"
    },
   
    {
        value:"french",
        label:"Tiếng Pháp"
    },
    {
        value:"chinese",
        label:"Tiếng Trung"
    },
    {
        value:"japanese",
        label:"Tiếng Nhật"
    },
    {
        value:"korean",
        label:"Tiếng Hàn"
    },
]

export const dataWelfare = [
    {
        value:"insurance",
        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faSuitcaseMedical} /></span> 
            <span>Chế Độ Bảo Hiểm</span>
        </>),
       
    },
  
   
    {
        value:"bonus",
        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faUsd} /></span> 
            <span>Chế Độ Thưởng</span>
        </>),
       
       
    },
   
    {
        value:"health-care",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faUserMd} /></span> 
            <span>Chăm Sóc Sức Khỏe</span>
        </>),
       
    },
    {
        value:"training",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faGraduationCap} /></span> 
            <span>Đào Tạo</span>
        </>),
       
    },
    {
        value:"salary-increase",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faLineChart} /></span> 
            <span>Tăng Lương</span>
        </>),
    },
    {
        value:"laptop",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faLaptop} /></span> 
            <span>Laptop</span>
        </>),
       
    },
    {
        value:"allowance",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faMoneyBill} /></span> 
            <span>Phụ Cấp</span>
        </>),
       
    },
    {
        value:"shuttle",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faTaxi} /></span> 
            <span>Xe Đưa Đón</span>
        </>),
       
    },
    {
        value:"tourism",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faPlane} /></span> 
            <span>Du Lịch</span>
        </>),
       
    },
    {
        value:"uniform",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faUserTie} /></span> 
            <span>Đồng Phục</span>
        </>),
    },
    {
        value:"seniority-allowances",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faMoneyBill} /></span> 
            <span>Phụ Cấp Thâm Niên</span>
        </>),
    },
    {
        value:"annual-leave",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faBriefcase} /></span> 
            <span>Nghỉ Phép Năm</span>
        </>),
    },
    {
        value:"sport-club",

        label:(<>
            <span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faHeartbeat} /></span> 
            <span>Câu Lạc Bộ Thể Thao</span>
        </>),
    },
    
]