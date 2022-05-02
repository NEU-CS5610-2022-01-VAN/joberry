import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";

let mockIsAuthenticated = true;

// const mockLoginWithRedirect = jest.fn();
const mockUseNavigate = jest.fn();

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
      // loginWithRedirect: mockLoginWithRedirect,
    };
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => {
    return mockUseNavigate;
  },
}));

// jest.mock("blockquote")

// 
test("renders Home", () => {
  render(
      <MemoryRouter initialEntries={["/"]}>
      <Home />
      </MemoryRouter>
  );
  expect(screen.getByText("Jobbery")).toBeInTheDocument();
  expect(screen.getByText("HOME")).toBeInTheDocument();
  expect(screen.getByText("PROFILE")).toBeInTheDocument();
  expect(screen.getByText("New Post")).toBeInTheDocument();
  
  });
  
//   // 
// test("enter ENTER button navigates to /home", () => {
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <SignIn />
//     </MemoryRouter>
//   );

//   const enterAppButton = screen.getByText("ENTER");
//   userEvent.click(enterAppButton);
//   expect(mockUseNavigate).toHaveBeenCalledWith("/home");
// });