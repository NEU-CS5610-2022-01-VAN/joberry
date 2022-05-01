import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileDetails from "../pages/ProfileDetails";

let mockIsAuthenticated = true;

jest.mock("@auth0/auth0-react", () => ({
  ...jest.requireActual("@auth0/auth0-react"),
  Auth0Provider: ({ children }) => children,
  useAuth0: () => {
    return {
      isLoading: false,
      user: {
        name: "chenru",
        email: "chenru@gmail.com",
      },
      isAuthenticated: mockIsAuthenticated,
      loginWithRedirect: jest.fn(),
    };
  },
}));