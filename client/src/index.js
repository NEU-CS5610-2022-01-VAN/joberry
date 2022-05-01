import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { StoreAndAuthProvider, configureInterceptors } from "@/utils";
import {$error} from '@/components'
import {
  SignIn,
  Home,
  VerifyUser,
  AppBase,
  ProfileSettings,
  NotFound,
  NewPost,
  ProfileDetail,
  UserDetail,
  PostDetails,
  SearchResult
} from "@/pages";
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
    $error("Sign in Required!")
    return <Navigate to="/sign-in" replace />;
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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/verify-user" element={<VerifyUser />} />
            <Route path="/" element={<AppBase />}>
              <Route index path="home" element={<Home />} />
              <Route path="discover" element={"discover"} />
              <Route path="tags" element={"tags"} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="posts/:id" element={<PostDetails />} />
              <Route path="404" element={<NotFound />} />
              <Route path="search/:search" element={<SearchResult />} />
              {/* Auth routes down here! */}
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <ProfileDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="posts/new"
                element={
                  <RequireAuth>
                    <NewPost />
                  </RequireAuth>
                }
              />

              <Route
                path="profile/settings"
                element={
                  <RequireAuth>
                    <ProfileSettings />
                  </RequireAuth>
                }
              />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreAndAuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);
