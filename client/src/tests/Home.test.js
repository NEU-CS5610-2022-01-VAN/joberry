import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// let mockIsAuthenticated = false;
// const mockLoginWithRedirect = jest.fn();
// const mockUseNavigate = jest.fn();

// jest.mock("@auth0/auth0-react", () => ({
//   ...jest.requireActual("@auth0/auth0-react"),
//   Auth0Provider: ({ children }) => children,
//   useAuth0: () => {
//     return {
//       isLoading: false,
//       user: { sub: "foobar" },
//       isAuthenticated: mockIsAuthenticated,
//       loginWithRedirect: mockLoginWithRedirect,
//     };
//   },
// }));

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => {
//     return mockUseNavigate;
//   },
// }));

// test("renders Home copy and Login Button", () => {
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <Home />
//     </MemoryRouter>
//   );

//   expect(screen.getByText("TODO App")).toBeInTheDocument();
//   expect(screen.getByText("Login")).toBeInTheDocument();
// });

// test("login button calls loginWithRedirect", () => {
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <Home />
//     </MemoryRouter>
//   );

//   const loginButton = screen.getByText("Login");
//   userEvent.click(loginButton);

//   expect(mockLoginWithRedirect).toHaveBeenCalled();
// });

// test("renders Enter App button when user is authenticated", () => {
//   mockIsAuthenticated = true;
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <Home />
//     </MemoryRouter>
//   );

//   expect(screen.getByText("Enter App")).toBeInTheDocument();
// });

// test("enter App button navigates to /app", () => {
//   mockIsAuthenticated = true;
//   render(
//     <MemoryRouter initialEntries={["/"]}>
//       <Home />
//     </MemoryRouter>
//   );

//   const enterAppButton = screen.getByText("Enter App");
//   userEvent.click(enterAppButton);

//   expect(mockUseNavigate).toHaveBeenCalledWith("/app");
// });
