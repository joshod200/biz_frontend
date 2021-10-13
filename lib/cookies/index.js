import cookieCutter from "cookie-cutter";

export const getCookie = (name) => cookieCutter.get(name);

export function setCookie(cname, cvalue, expiry) {
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(expiry);
  cookieCutter.set(cname, cvalue, { expires: d })
};
