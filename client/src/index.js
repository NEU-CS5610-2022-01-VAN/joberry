import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Landing, Home, VerifyUser, AppBase, ProfileSettings, PostDetails } from "@/pages";
import {
  StoreAndAuthProvider,
  configureInterceptors,
} from "@/utils";
import "@/setup.less";
import "@/styles/index.less";

configureInterceptors();

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
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={`${window.location.origin}/verify-user`}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope={requestedScopes.join(" ")}
    >
      <StoreAndAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/verify-user" element={<VerifyUser />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <AppBase />
                </RequireAuth>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="discover" element={"discover"} />
              <Route path="tags" element={"tags"} />
              <Route path="profile" element={"profile"} />
              <Route path="posts/:id" element={<PostDetails />} />
              <Route path="profile/settings" element={<ProfileSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreAndAuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);
