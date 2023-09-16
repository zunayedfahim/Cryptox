import Cookies from "js-cookie";

export const getCookie = (key) => {
  return Cookies.get(key);
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const setCookie = (key, value) => {
  return Cookies.set(key, value, { expires: 1 });
};

export const isLoggedIn = async () => {
  const token = getCookie("token");

  if (token) {
    const res = await fetch("http://localhost:5000/auth", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
  return false;
};
