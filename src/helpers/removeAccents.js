//Loại bỏ dấu khi tìm kiếm select
export function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}