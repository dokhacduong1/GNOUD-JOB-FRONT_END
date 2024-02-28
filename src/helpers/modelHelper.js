import moment from "moment";
import { dataPermission } from "../pages/admins/setPermission/js/options";

//Function handleShowModal
export const handleShowModal = (form = "", setIsModalOpen) => {
    if (form !== "") {
        form.resetFields();
    }
    setIsModalOpen(true);
};

//Function handleCancel
export const handleCancel = (form = "", setIsModalOpen) => {
    if (form !== "") {
        form.resetFields();
    }
    setIsModalOpen(false);

};

//Function handleCancel
export const handleUpdateDataViewPermission = (form, setIsModalOpen, record) => {

    //tạo một object rỗng để lưu giá trị của form
    const dataFieldUpdate = {}
    //duyệt qua các key của record.permissions xong lấy ra các value của key đó nhét vào mảng objectConvertData
    dataPermission.forEach(item => {
        dataFieldUpdate[item.name] = record.permissions
    })
    //nếu form khác rỗng thì set giá trị cho form
    if (form !== "") {
        form.resetFields();
        form.setFieldsValue(dataFieldUpdate)
    }
    //Mở modal
    setIsModalOpen(true);
};

//Function handleCancel
export const handleUpdateDataPermission = (form, setIsModalOpen, record) => {

    //Lấy giá trị măc định cho form
    const defaultValue = {
        title: record.title,
        description: record.description,
    }
    if (form !== "") {
        form.resetFields();
        form.setFieldsValue(defaultValue)
    }
    //Mở modal
    setIsModalOpen(true);
};


//Function
export const handleUpdateDataJobs = (form, setIsModalOpen, record) => {
    //tạo một object rỗng để lưu giá trị của form
    const defaultValue = {
        title: record.title,
        status: record.status,
        description: record.description,
        job_categorie_id: record.job_categorie_id.map((item) => item._id),
        address: record.address.location,
        employerId: record.employerId._id,
        linkVideoAboutIntroducingJob: record.linkVideoAboutIntroducingJob,
        salaryMax: record.salaryMax,
        salaryMin: record.salaryMin,
        jobType: record.jobType,
        end_date: moment(record.end_date),
        presentationLanguage: record.presentationLanguage,
        featured: record.featured ? "true" : "false",
        gender: record.gender,
        ageMin: record.ageMin,
        ageMax: record.ageMax,
        workExperience: record.workExperience,
        level: record.level,
        educationalLevel: record.educationalLevel,
        email: record.email,
        phone: record.phone,
        website: record.website,
        receiveEmail: record.receiveEmail,
        detailWorkExperience: record.detailWorkExperience,
        welfare: record.welfare,
    };

    if (record?.city) {
        defaultValue.city = `${record.city.code}&${record.city.slug}&${record.city.name}`;
    }
    //nếu form khác rỗng thì set giá trị cho form
    if (form !== "") {
        form.resetFields();
        form.setFieldsValue(defaultValue)
    }
    //Mở modal
    setIsModalOpen(true);
};


export const handleUpdateDataCategories = (form, setIsModalOpen, record) => {

    //tạo một object rỗng để lưu giá trị của form
    const defaultValue = {
        title: record.title,
        status: record.status,
        parent_id: record?.parent_id,
        description: record.description,
        position: record.position,

    }
 
    //nếu form khác rỗng thì set giá trị cho form
    if (form !== "") {
        form.resetFields();
        form.setFieldsValue(defaultValue)
    }
    //Mở modal
    setIsModalOpen(true);
};
