import React, { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { configureAuthHeader } from ".";
const AuthTokenContext = React.createContext();

function AuthTokenProvider({ children }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState();
  const value = { accessToken, setAccessToken };
  let token = "";
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        token = await getAccessTokenSilently();
        setAccessToken(token);
        configureAuthHeader(token);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);
  return (
    <AuthTokenContext.Provider value={value}>
      {children}
    </AuthTokenContext.Provider>
  );
}

const useAuthToken = () => useContext(AuthTokenContext);

export { useAuthToken, AuthTokenProvider };
