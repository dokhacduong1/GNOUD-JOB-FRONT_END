import { dataPermission } from "../pages/admins/setPermission/options";

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
export const handleUpdateData = (form, setIsModalOpen,record) => {
    //tạo một object rỗng để lưu giá trị của form
    const dataFieldUpdate = {}
    //duyệt qua các key của record.permissions xong lấy ra các value của key đó nhét vào mảng objectConvertData
    dataPermission.forEach(item => {
        dataFieldUpdate[item.name] = record.permissions
    })
    //nếu form khác rỗng thì set giá trị cho form
    if (form !== "") {
        form.setFieldsValue(dataFieldUpdate)
    }
    //Mở modal
    setIsModalOpen(true);
};
