 export function formatSalary(salaryMin, salaryMax) {
  const min = Math.round(salaryMin / 1000000);
  const max = Math.round(salaryMax / 1000000);
 
    return `${min}tr - ${max}tr VNĐ`;
  }
  export function formatSalaryNoVND(salaryMin, salaryMax) {
    const min = Math.round(salaryMin / 1000000);
    const max = Math.round(salaryMax / 1000000);
 
    return `${min}tr - ${max}tr`;
  }
  export function formatSalaryNoVND2(salaryMin, salaryMax) {
    const min = Math.round(salaryMin / 1000000);
    const max = Math.round(salaryMax / 1000000);
 
    return `${min} - ${max}`;
  }