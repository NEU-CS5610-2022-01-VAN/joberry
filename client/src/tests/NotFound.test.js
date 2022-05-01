import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../pages/NotFound";
import { MemoryRouter } from "react-router-dom";

test("renders Not Found copy", () => {
  
  render(
    <MemoryRouter initialEntries={["/"]}>
    <NotFound />
    </MemoryRouter>
);

  expect(screen.getByText("Opps... 404 Not Found!")).toBeInTheDocument();
});