import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileDetail from "../pages/ProfileDetail";
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


// test if the IsAuthenticated is true, the ProfileDetail will show profile info
test("renders ProfileDetail", () => {
render(
    <MemoryRouter initialEntries={["/"]}>
    <ProfileDetail />
    </MemoryRouter>
);
expect(screen.getByText("chenru")).toBeInTheDocument();
expect(screen.getByText("chenru@gmail.com")).toBeInTheDocument();
})

// enter click setting should navigate
test("enter ENTER button navigates to /settings", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ProfileDetail />
    </MemoryRouter>
  );

  const enterSettingsButton = screen.getByText("Settings");
  userEvent.click(enterSettingsButton);
  expect(mockUseNavigate).toHaveBeenCalledWith("/settings");
});
