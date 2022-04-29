import React from 'react';
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    const signUp = () => loginWithRedirect({ screen_hint: "signup" });
    return (
      <div className="landing-page">
        <div style={{ width: "20vw", textAlign: "center" }}>
          <div>
            <img src="/images/Joberry.png" alt="Joberry" srcset="" />
          </div>
          <div className="mg-t-20">
            <Button
              block
              shape="round"
              size="large"
              onClick={
                !isAuthenticated ? loginWithRedirect : () => navigate("/home")
              }
              loading={isLoading}
            >
              {!isAuthenticated ? "LOG IN" : "ENTER"}
            </Button>
            <p className="mg-t-8"> Your job hunting journey starts NOW ...</p>
          </div>
        </div>
      </div>
    );
}
