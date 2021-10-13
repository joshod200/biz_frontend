import {getCookie} from "lib/cookies";

const doFetch = (
  url,
  {
    client,
    accessToken,
    expiry,
    uid
  },
  options
) => {
  return fetch(url, {
    ...options,
    headers: {
      'client': client,
      'access-token': accessToken,
      'expiry': expiry,
      'uid': uid,
      ...options.headers
    }
  });
}

export default (url, options = {}) => {
  console.log("fetching headers : auth_fetch");
  const headers = getCookie("session");
  try{
    const parsedHeaders = JSON.parse(headers);
    return doFetch(url, parsedHeaders, options);
  }catch{
    return Promise.reject("Session not found")
  }
}
