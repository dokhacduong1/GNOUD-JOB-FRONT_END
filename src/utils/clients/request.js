const API_DOMAIN = "http://34.124.230.237:2709/api/v1/client";

export const Get = async (path, options ,link = API_DOMAIN) => {
  const response = await fetch(link + path, options);
  const result = await response.json();
  return result;
}

export const Post = async (path, options,link = API_DOMAIN) => {
  const response = await fetch(link + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const Del = async (path,link = API_DOMAIN) => {
  const response = await fetch(link + path, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};

export const Patch = async (path, options,link = API_DOMAIN) => {

  const response = await fetch(link + path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};


export const Auth = async (path, options,token,link = API_DOMAIN) => {
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
