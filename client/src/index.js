import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "@/utils";
import { Provider as MobxProvider } from "mobx-react";
import * as stores from "@/stores";
import { Landing, Home, VerifyUser, AppBase } from "@/pages";
import "@/setup.less";
import "@/styles/index.less";

const requestedScopes = [
  "read:user",
  "edit:user",
  "delete:user",
  "write:user",
  "read:post",
  "edit:post",
  "delete:post",
  "write:post",
];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MobxProvider store={stores} {...stores}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={`${window.location.origin}/verify-user`}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        scope={requestedScopes.join(" ")}
      >
        <AuthTokenProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/verify-user" element={<VerifyUser />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <AppBase/>
                  </RequireAuth>
                }
              >
                <Route path="home" element={<Home/>}/>
                
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthTokenProvider>
      </Auth0Provider>
    </MobxProvider>
  </React.StrictMode>
);
