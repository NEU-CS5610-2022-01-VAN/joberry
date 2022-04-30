import React, { useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { configureAuthHeader } from ".";
import * as stores from "@/stores";

const StoreAuthContext = React.createContext();

function StoreAndAuthProvider({ children }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState();
  const value = { accessToken, setAccessToken, ...stores };
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
      getAccessToken().then(()=> {
        stores.userStore.logInUser()
      });
    } 
  }, [getAccessTokenSilently, isAuthenticated]);
  return (
    <StoreAuthContext.Provider value={value}>
      {children}
    </StoreAuthContext.Provider>
  );
}

const useStoreAndAuth = () => useContext(StoreAuthContext);

export { useStoreAndAuth, StoreAndAuthProvider };
