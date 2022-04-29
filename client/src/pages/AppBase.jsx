import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { HeaderBar, Loading } from "@/components";

export default function AppBase() {
  const { isLoading } = useAuth0();
  if (isLoading) return <Loading />;
  return (
    <div className="app-base">
      <HeaderBar />
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}
