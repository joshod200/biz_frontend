import React from "react";
import { CircularProgress } from '@material-ui/core';
import authFetch from "lib/auth_fetch";

export const AuthContext = React.createContext();
export const validateAuthToken = () => authFetch("http://localhost:3001/auth/validate_token.json");

export default (Component) => {
  const AuthCompoent = (props) => {
    const [currentUser, setCurrentUser] = React.useState();
    const [isValidatingToken, setIsValidatingToken] = React.useState(false);

    React.useEffect(() => {
      setIsValidatingToken(true);
      validateAuthToken()
      .then((res) => {
        if(res.status === 200) res.json().then((res) => setCurrentUser(res))
      })
      .finally(() => setIsValidatingToken(false))
    }, [])

    const authContext = {
      currentUser
    };

    if(isValidatingToken) return (
      <CircularProgress />
    )

    return(
      <AuthContext.Provider value={ authContext }>
        <Component {...props} />
      </AuthContext.Provider>
    )
  }

  return AuthCompoent;
}
