import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import userEvent from "@testing-library/user-event";

let mockIsAuthenticated = true;

const mockLoginWithRedirect = jest.fn();
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
      loginWithRedirect: mockLoginWithRedirect,
    };
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => {
    return mockUseNavigate;
  },
}));


// test if the IsAuthenticated is true, the SignIn page should present ENTER
test("renders SignIn", () => {
render(
    <MemoryRouter initialEntries={["/"]}>
    <SignIn />
    </MemoryRouter>
);
expect(screen.getByText("ENTER")).toBeInTheDocument();
})

// enter click should navigate
test("enter ENTER button navigates to /home", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <SignIn />
    </MemoryRouter>
  );

  const enterAppButton = screen.getByText("ENTER");
  userEvent.click(enterAppButton);
  expect(mockUseNavigate).toHaveBeenCalledWith("/home");
});


// test if the IsAuthenticated is false, the SignIn page should present SIGN IN or SIGN UP
test("renders signin or signup", () =>{
mockIsAuthenticated = false;
render(
    <MemoryRouter initialEntries={["/"]}>
    <SignIn />
    </MemoryRouter>
);
expect(screen.getByText("SIGN IN or SIGN UP")).toBeInTheDocument();
});

test("Login with redirect", () =>{
  render(
    <MemoryRouter initialEntries={["/"]}>
    <SignIn />
    </MemoryRouter>
  );

  const loginButton = screen.getByText("SIGN IN or SIGN UP");
  userEvent.click(loginButton);

  expect(mockLoginWithRedirect).toHaveBeenCalled();



})