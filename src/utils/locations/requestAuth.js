import { DOMAIN } from "../api-domain";

const API_DOMAIN = `${DOMAIN}/api/v1/locations`;
export const AuthPost = async (path, options, token, link = API_DOMAIN) => {
  const response = await fetch(link + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`, // Thêm token vào header Authorization
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};


export const AuthDel = async (path, token, link = API_DOMAIN) => {

  const response = await fetch(link + path, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`, // Thêm token vào header Authorization
    }

  });
  const result = await response.json();
  return result;
};

export const AuthPatch = async (path, options, token, link = API_DOMAIN) => {

  const response = await fetch(link + path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`, // Thêm token vào header Authorization
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};