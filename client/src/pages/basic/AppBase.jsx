import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { HeaderBar, Loading } from "@/components";

export default function AppBase(props) {
  const { isLoading } = useAuth0();
  if (isLoading) return <Loading />;

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <HeaderBar />
      <div className="app-base">
        <div>
          <div className="app-content">
            <Outlet />
          </div>
          <footer className="color-base-80 mg-t-12 mg-b-24" style={{ textAlign:"center"}}>
            @2022 Joberry Inc. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
