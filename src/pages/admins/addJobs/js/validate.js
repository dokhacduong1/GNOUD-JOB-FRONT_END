export function salaryCheck(value) {
 
    return value > 0 ? Promise.resolve() : Promise.reject(new Error("Phải lớn hơn 0!"));
}
export function phoneCheck(value) {
    if( value && value.length === 10 && /^\d+$/.test(value)){
        return Promise.resolve();
    }
    return Promise.reject(new Error("Số điện thoại phải có 10 chữ số"))
}