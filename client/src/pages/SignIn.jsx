import React from 'react';
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
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
              {!isAuthenticated ? "SIGN IN or SIGN UP" : "ENTER"}
            </Button>
            <p className="mg-t-8"> SIGN IN or SIGN UP to UNLOCK this feature ...</p>
          </div>
        </div>
      </div>
    );
}
